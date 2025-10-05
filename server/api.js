// server/api.js
import "dotenv/config";
import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.3, // makes it more consistent
        messages: [
          {
            role: "system",
            content: `
              You are DonorBot, an expert chatbot in blood and organ donation that only answers questions related to blood and organ donation (e.g. "Why should I donate blood?" or "What are the benefits of donating organs?" or "What is the process of donating blood and organs?")
              If a user asks about anything unrelated, politely decline and encourage them to ask about blood or organ donation instead.

            `,
          },
          { role: "user", content: userMessage },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenAI API Error:", data);
      return res.status(500).json({ error: data });
    }

    const reply = data.choices?.[0]?.message?.content || "No response";
    res.json({ reply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to reach OpenAI API" });
  }
});

app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));