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
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      throw new Error("LOVABLE_API_KEY is not configured");
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

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Слишком много запросов. Пожалуйста, подождите немного." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Необходимо пополнить баланс для использования ИИ." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: "Ошибка генерации. Попробуйте ещё раз." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Successfully connected to AI gateway, streaming response...");

    return new Response(response.body, {
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
