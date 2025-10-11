import { aiGenerate, revampTheResponse } from "@/utils/talktome"; 
import { NextRequest } from "next/server"


export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const { prompt } = body;

    if (!prompt) {
      return new Response(JSON.stringify({ error: "No prompt provided" }), { status: 400, headers: { "Content-Type": "application/json" } });
    }

    const aiResponse = await aiGenerate(prompt);
    if (!aiResponse) {
      return new Response(JSON.stringify({ error: "AI generation failed" }), { status: 500, headers: { "Content-Type": "application/json" } });
    }

    const resu = await revampTheResponse(aiResponse) || "[]";
    
    // Parse to object to ensure vali d JSON
    const parsedData = JSON.parse(resu);
    console.log("Parsed AI Response:", parsedData);
    return new Response(JSON.stringify(parsedData), { status: 200, headers: { "Content-Type": "application/json" } });

  } catch (err) {
    console.error("POST /api/ai error:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
};
