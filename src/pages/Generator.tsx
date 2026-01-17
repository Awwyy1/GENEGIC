import { useState, useRef, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Send, Copy, Download, Check, Loader2, ExternalLink, Code, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { toast } from "sonner";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const Generator = () => {
  const location = useLocation();
  const initialPrompt = (location.state as { initialPrompt?: string })?.initialPrompt || "";
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [copied, setCopied] = useState(false);
  const [hasAutoSent, setHasAutoSent] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Extract HTML code from message
  const extractCode = (text: string): string | null => {
    const codeMatch = text.match(/```html\s*([\s\S]*?)```/);
    return codeMatch ? codeMatch[1].trim() : null;
  };

  // Update preview when code changes
  useEffect(() => {
    if (generatedCode && iframeRef.current) {
      const iframe = iframeRef.current;
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (doc) {
        doc.open();
        doc.write(generatedCode);
        doc.close();
      }
    }
  }, [generatedCode, showPreview]);

  const sendMessage = useCallback(async (messageText?: string) => {
    const textToSend = messageText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: textToSend };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    let assistantContent = "";

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-site`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ messages: newMessages }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Ошибка генерации");
      }

      if (!response.body) {
        throw new Error("Нет ответа от сервера");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, newlineIndex);
          buffer = buffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantContent += content;
              setMessages([...newMessages, { role: "assistant", content: assistantContent }]);
              
              // Check for code and update preview
              const code = extractCode(assistantContent);
              if (code) {
                setGeneratedCode(code);
              }
            }
          } catch {
            // Incomplete JSON, put back
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }

      // Final flush
      if (buffer.trim()) {
        for (let raw of buffer.split("\n")) {
          if (!raw) continue;
          if (raw.endsWith("\r")) raw = raw.slice(0, -1);
          if (raw.startsWith(":") || raw.trim() === "") continue;
          if (!raw.startsWith("data: ")) continue;
          const jsonStr = raw.slice(6).trim();
          if (jsonStr === "[DONE]") continue;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantContent += content;
            }
          } catch { /* ignore */ }
        }
      }

      if (assistantContent) {
        setMessages([...newMessages, { role: "assistant", content: assistantContent }]);
        const code = extractCode(assistantContent);
        if (code) {
          setGeneratedCode(code);
          setShowPreview(true);
        }
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error instanceof Error ? error.message : "Произошла ошибка");
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, messages]);

  // Auto-send initial prompt if provided
  useEffect(() => {
    if (initialPrompt && !hasAutoSent && messages.length === 0) {
      setHasAutoSent(true);
      sendMessage(initialPrompt);
    }
  }, [initialPrompt, hasAutoSent, messages.length, sendMessage]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const copyCode = () => {
    if (generatedCode) {
      navigator.clipboard.writeText(generatedCode);
      setCopied(true);
      toast.success("Код скопирован!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const downloadCode = () => {
    if (generatedCode) {
      const blob = new Blob([generatedCode], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "site.html";
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Файл скачан!");
    }
  };

  const openInNewTab = () => {
    if (generatedCode) {
      const blob = new Blob([generatedCode], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Назад
              </Button>
            </Link>
            <div className="h-6 w-px bg-border" />
            <span className="font-heading font-bold text-lg gradient-text">Генератор</span>
          </div>
          
          {generatedCode && (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPreview(!showPreview)}
                className="gap-2"
              >
                {showPreview ? <Code className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {showPreview ? "Показать чат" : "Показать превью"}
              </Button>
              <Button variant="ghost" size="sm" onClick={copyCode} className="gap-2">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                Копировать
              </Button>
              <Button variant="ghost" size="sm" onClick={downloadCode} className="gap-2">
                <Download className="w-4 h-4" />
                Скачать
              </Button>
              <Button variant="ghost" size="sm" onClick={openInNewTab} className="gap-2">
                <ExternalLink className="w-4 h-4" />
                Открыть
              </Button>
            </div>
          )}
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Chat section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`flex flex-col ${showPreview ? "w-1/2 border-r border-border" : "w-full"} transition-all duration-300`}
        >
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="h-full flex items-center justify-center">
                <div className="text-center max-w-md">
                  <h2 className="text-2xl font-heading font-bold mb-4">
                    Опишите ваш сайт
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Напишите, какой сайт вы хотите создать, и ИИ сгенерирует его за вас.
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {[
                      "Создай лендинг для кофейни с тёмным дизайном",
                      "Сделай портфолио фотографа в минималистичном стиле",
                      "Интернет-магазин одежды с каталогом товаров",
                    ].map((example, i) => (
                      <button
                        key={i}
                        onClick={() => setInput(example)}
                        className="text-sm px-3 py-2 rounded-lg glass text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all text-left"
                      >
                        {example}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "glass"
                  }`}
                >
                  <div className="whitespace-pre-wrap text-sm">
                    {message.role === "assistant" 
                      ? message.content.replace(/```html[\s\S]*?```/g, "[Код сайта сгенерирован - смотрите превью справа]")
                      : message.content
                    }
                  </div>
                </div>
              </motion.div>
            ))}

            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="glass rounded-2xl px-4 py-3 flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-primary" />
                  <span className="text-sm text-muted-foreground">Генерирую сайт...</span>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="relative flex items-center gap-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Опишите, какой сайт вы хотите создать..."
                className="flex-1 bg-muted/50 border border-border rounded-xl px-4 py-3 pr-12 resize-none outline-none focus:border-primary/50 transition-colors min-h-[52px] max-h-32"
                rows={1}
              />
              <Button
                onClick={() => sendMessage()}
                disabled={!input.trim() || isLoading}
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Preview section */}
        {showPreview && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-1/2 flex flex-col bg-white"
          >
            <div className="bg-muted/30 border-b border-border px-4 py-2 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="text-xs text-muted-foreground ml-2">Превью сайта</span>
            </div>
            <iframe
              ref={iframeRef}
              className="flex-1 w-full"
              title="Site Preview"
              sandbox="allow-scripts"
            />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Generator;
