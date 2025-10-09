
import { aiGenerate, revampTheResponse } from "@/utils/talktome";
import { NextRequest } from "next/server"



// landing 1 ai request
export const POST = async (request: NextRequest) => {
    const body = await request.json();
    const {prompt} = body;
    
    if (!prompt) {
        return new Response("No prompt provided", { status: 400 });
    }
    const text = prompt;
    // Simulate AI text generation
    const aiResponse = await aiGenerate(text) || "";
    if(!aiResponse){
        return new Response("AI generation failed", { status: 500 });
    }
    const res = await revampTheResponse(aiResponse);
    console.log("AI Generated Response:", res);  
    return new Response(res, { status: 200 });
  } 