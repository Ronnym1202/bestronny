/**
 * Netlify Serverless Function: ai-solve
 * File location: netlify/functions/ai-solve.js
 */
exports.handler = async function (event) {
  /* Only allow POST */
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  /* Parse request body */
  let question = "";
  try {
    const body = JSON.parse(event.body || "{}");
    question = (body.question || "").trim();
  } catch {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid request body" }),
    };
  }

  if (!question) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "No question provided" }),
    };
  }

  /* API key from environment variable (set in Netlify dashboard) */
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error:
          "AI service is not configured. Please set ANTHROPIC_API_KEY in Netlify environment variables.",
      }),
    };
  }

  /* Call Anthropic API */
  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1500,
        system: `You are Mwalimu Ronny, a highly respected and warm mathematics teacher for Kenyan secondary school and university students. When given a mathematics question, provide a complete, clear, step-by-step solution.
Guidelines:
- Start with one brief encouraging sentence directed at the student
- Number each step clearly: "Step 1:", "Step 2:", etc.
- Use LaTeX for ALL mathematical expressions:
  · Inline math: \\( expression \\)
  · Display equations: \\[ expression \\]
- Explain the reasoning behind each step, not just the calculation
- Name any key formula or theorem you use
- End with a short "Key Takeaway" or summary line
- Be warm, encouraging, and pedagogically clear
- Write as if speaking directly to the student
- Keep the response focused and well-structured`,
        messages: [
          {
            role: "user",
            content: `Please solve this mathematics question step by step:\n\n${question}`,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errBody = await response.text();
      throw new Error(`Anthropic API error ${response.status}: ${errBody}`);
    }

    const data = await response.json();
    const answer = (data.content || [])
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("\n")
      .trim();

    if (!answer) throw new Error("Empty response from AI");

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answer }),
    };
  } catch (err) {
    console.error("ai-solve error:", err.message);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: err.message || "AI service temporarily unavailable",
      }),
    };
  }
};