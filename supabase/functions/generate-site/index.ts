import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const GOOGLE_AI_KEY = Deno.env.get("GOOGLE_AI_KEY");

    if (!GOOGLE_AI_KEY) {
      console.error("GOOGLE_AI_KEY is not configured");
      throw new Error("GOOGLE_AI_KEY is not configured");
    }

    console.log("Generating site with messages:", JSON.stringify(messages));

    const systemPrompt = `Ты — эксперт по созданию веб-сайтов. Твоя задача — генерировать полный HTML/CSS/JavaScript код сайта на основе описания пользователя.

ПРАВИЛА:
1. Генерируй только полный, рабочий HTML-код с встроенными стилями CSS и JavaScript
2. Используй современный, красивый дизайн с градиентами, анимациями и responsive-вёрсткой
3. Весь контент должен быть на русском языке
4. Код должен быть готов к использованию — просто открой в браузере
5. Используй Google Fonts для красивых шрифтов
6. Добавляй hover-эффекты и плавные анимации
7. Делай мобильную адаптацию

ФОРМАТ ОТВЕТА:
Сначала кратко опиши, что ты создаёшь (1-2 предложения).
Затем выведи полный HTML-код внутри блока \`\`\`html ... \`\`\`

ВАЖНО: Код должен быть полностью готовым к использованию, с DOCTYPE, всеми мета-тегами и т.д.`;

    // Формируем контент для Gemini API
    let conversationText = systemPrompt + "\n\n";

    // Добавляем историю сообщений
    for (const msg of messages) {
      if (msg.role === "user") {
        conversationText += `Пользователь: ${msg.content}\n\n`;
      } else if (msg.role === "assistant") {
        conversationText += `Ассистент: ${msg.content}\n\n`;
      }
    }

    // API Google Gemini
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:streamGenerateContent?key=${GOOGLE_AI_KEY}&alt=sse`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: conversationText
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 8192,
          }
        })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Google AI error:", response.status, errorText);

      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Слишком много запросов. Пожалуйста, подождите немного." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 403) {
        return new Response(
          JSON.stringify({ error: "Ошибка API ключа. Проверьте конфигурацию." }),
          { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ error: "Ошибка генерации. Попробуйте ещё раз." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Successfully connected to Google AI, streaming response...");

    // Преобразуем SSE от Gemini в формат OpenAI для совместимости с фронтендом
    const reader = response.body?.getReader();
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    const stream = new ReadableStream({
      async start(controller) {
        try {
          if (!reader) {
            throw new Error("No response body");
          }

          let buffer = "";

          while (true) {
            const { done, value } = await reader.read();

            if (done) {
              controller.close();
              break;
            }

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");

            // Оставляем последнюю неполную строку в буфере
            buffer = lines.pop() || "";

            for (const line of lines) {
              if (line.startsWith("data: ")) {
                const jsonStr = line.slice(6);

                if (jsonStr.trim() === "[DONE]") {
                  continue;
                }

                try {
                  const data = JSON.parse(jsonStr);

                  // Извлекаем текст из Gemini формата
                  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

                  if (text) {
                    // Преобразуем в OpenAI формат для совместимости
                    const openaiFormat = {
                      choices: [
                        {
                          delta: {
                            content: text
                          }
                        }
                      ]
                    };

                    controller.enqueue(
                      encoder.encode(`data: ${JSON.stringify(openaiFormat)}\n\n`)
                    );
                  }
                } catch (e) {
                  console.error("Error parsing SSE line:", e);
                }
              }
            }
          }
        } catch (error) {
          console.error("Stream error:", error);
          controller.error(error);
        }
      }
    });

    return new Response(stream, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Error in generate-site function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Неизвестная ошибка" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
