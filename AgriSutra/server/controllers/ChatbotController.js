const axios = require("axios");

const chatWithGroq = async (req, res) => {
  const { userMessage } = req.body;

  if (!userMessage) {
    return res.status(400).json({ error: "Missing user message" });
  }

  try {
    const groqRes = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama3-70b-8192", // ✅ Updated model
        messages: [
          {
            role: "system",
            content:
              "You are Agrisutra Assistant, an expert farming advisor that speaks in friendly Hinglish. Answer farmer queries about crops, weather, schemes, etc. Be helpful, short, and conversational.",
          },
          {
            role: "user",
            content: userMessage,
          },
        ],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const botReply = groqRes.data.choices[0].message.content;
    res.json({ response: botReply });
  } catch (err) {
    if (err.response && err.response.data) {
      console.error("Groq error response:", err.response.data);
    } else if (err.message) {
      console.error("Groq error message:", err.message);
    } else {
      console.error("Groq error:", err);
    }

    res.status(500).json({ error: "Failed to connect to Groq API" });
  }
};

module.exports = { chatWithGroq };
