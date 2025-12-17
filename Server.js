import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();

app.use(express.json());
app.use(cors());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/evaluate", async (req, res) => {
  const idea = req.body.idea;

  if (!idea) {
    return res.status(400).json({ error: "Business idea is required" });
  }

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `
You are an expert sustainability and business analysis AI.

Evaluate this business idea in detail:

Business Idea: ${idea}

Return your answer in this structured format:

### Eco-Friendliness Score (1-10)
- Score:
- Why this score?
- Environmental factors:
  - Carbon footprint
  - Energy consumption
  - Waste generation
  - Materials used
  - Pollution impact
  - Long-term sustainability

### Business Viability (1-10)
- Score:
- Market demand:
- Competition:
- Cost to start:
- Scalability:

### Profitability (1-10)

### Resource Usage (1-10)

### Overall Rating (1-10)

### Final Recommendation
`
        }
      ]
    });

    res.json({
      result: completion.choices[0].message.content
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "AI request failed" });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
