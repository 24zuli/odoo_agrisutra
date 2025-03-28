// const axios = require("axios");

// const chatWithGroq = async (req, res) => {
//   const { userMessage } = req.body;

//   if (!userMessage) {
//     return res.status(400).json({ error: "Missing user message" });
//   }

//   try {
//     const groqRes = await axios.post(
//       "https://api.groq.com/openai/v1/chat/completions",
//       {
//         model: "llama3-70b-8192", // ✅ Updated model
//         messages: [
//           {
//             role: "system",
//             content:
//               "You are Agrisutra Assistant, an expert farming advisor that speaks in friendly Hinglish. Answer farmer queries about crops, weather, schemes, etc. Be helpful, short, and conversational.",
//           },
//           {
//             role: "user",
//             content: userMessage,
//           },
//         ],
//         temperature: 0.7,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     const botReply = groqRes.data.choices[0].message.content;
//     res.json({ response: botReply });
//   } catch (err) {
//     if (err.response && err.response.data) {
//       console.error("Groq error response:", err.response.data);
//     } else if (err.message) {
//       console.error("Groq error message:", err.message);
//     } else {
//       console.error("Groq error:", err);
//     }

//     res.status(500).json({ error: "Failed to connect to Groq API" });
//   }
// };

// module.exports = { chatWithGroq };const axios = require("axios");
const axios = require("axios");

const chatWithGroq = async (req, res) => {
  const { userMessage } = req.body;
  const language = req.query.lang || "english";
  const isFirstMessage = req.query.first === "true";

  if (!userMessage) {
    return res.status(400).json({ error: "Missing user message" });
  }

  const greetingInstruction = isFirstMessage
    ? language === "gujarati"
      ? "પ્રથમ જવાબમાં 'નમસ્તે' થી શરૂ કરો અને યૂઝરને ફ્રેન્ડલી રીતે આવકારો."
      : "Start your first response with 'Namaste' and a friendly welcome."
    : language === "gujarati"
    ? " greeting નો ઉપયોગ ના કરો. સીધો જવાબ આપો."
    : "Do not greet. Just answer directly.";

  const systemPrompt = `
You are Agrisutra Assistant — a knowledgeable and friendly advisor who helps users with both farming-related queries and information stored in the database.

You are trusted by farmers and rural users. You can answer questions related to:
- Farming techniques
- Crops, seasons, soil, irrigation
- Government schemes
- Local equipment and market trends
- Data stored in the Agrisutra platform's database

Your tone must be:
- Friendly, respectful, and clear
- Conversational and to-the-point
- Appropriate for rural or semi-urban audiences

${greetingInstruction}

Your response rules:
- Use plain text only (no markdown or bold)
- Structure answers with plain bullet points or numbers when listing
- Never refer to yourself as an AI or model
- Reply only in ${language} (not both)

Speak naturally and informatively like a real agricultural advisor.
`;

  try {
    const groqRes = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama3-70b-8192",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage },
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
      console.error("Groq error:", err.response.data);
    } else if (err.message) {
      console.error("Groq error:", err.message);
    } else {
      console.error("Groq error:", err);
    }

    res.status(500).json({ error: "Failed to connect to Groq API" });
  }
};

module.exports = { chatWithGroq };
