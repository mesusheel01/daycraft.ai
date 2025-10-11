import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";

const token = process.env["OPENAI_API_KEY"] || "";
const endpoint = "https://models.github.ai/inference";
const model = "gpt-4o-mini";

// ---------- 1️⃣ Generate Daily Schedule ----------
export async function aiGenerate(prompt: string) {
  const client = ModelClient(endpoint, new AzureKeyCredential(token));

  const response = await client.path("/chat/completions").post({
    body: {
      model,
      messages: [
        {
          role: "system",
          content: `
You are an AI day planner. Your goal is to create an efficient,
realistic, and balanced daily schedule based on the user's input tasks.

Guidelines:
- Include between **10 to 12 total todos**.
- Spread tasks across the day with realistic time slots (e.g., "7:00 AM - 8:00 AM", "2:30 PM - 3:00 PM").
- Prioritize focus sessions, breaks, meals, and short relaxation time.
- Optimize for productivity and well-being.
- Use natural times and avoid overlapping schedules.
          `,
        },
        {
          role: "user",
          content: `User’s request: "${prompt}". Generate a productive daily plan.`,
        },
      ],
    },
  });

  if (isUnexpected(response)) throw response.body.error;
  console.log("Raw AI Response:", response.body.choices[0].message.content);
  return response.body.choices[0].message.content;
}

// ---------- 2️⃣ Revamp Response to Structured JSON ----------
export const revampTheResponse = async (response: string) => {
  const client = ModelClient(endpoint, new AzureKeyCredential(token));

  const revampResponse = await client.path("/chat/completions").post({
    body: {
      model,
      messages: [
        {
          role: "system",
          content: `
You are a JSON formatter that converts a day plan text into a clean JSON array.

Requirements:
- Return ONLY valid JSON.
- The structure must be an array of objects like:
[
  {
    "time": "7:00 AM - 8:00 AM",
    "task": "Morning jog and meditation",
    "tips": "Stay hydrated before starting the jog."
  },
  ...
]
- Include a maximum of 12 items with efficient tips for each task.
- Do not include extra text, explanations, or markdown formatting.
          `,
        },
        {
          role: "user",
          content: `Convert this response into the required JSON format:\n${response}`,
        },
      ],
    },
  });

  if (isUnexpected(revampResponse)) throw revampResponse.body.error;
  console.log("Revamped AI Response:", revampResponse.body.choices[0].message.content);
  return revampResponse.body.choices[0].message.content;
};
