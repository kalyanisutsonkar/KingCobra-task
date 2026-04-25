import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import OpenAI from "openai";

export async function POST(req: Request) {
  try {
    const { workflowId, topic, audience, mock } = await req.json();

    if (mock) {
      // Simulate delay for mock execution
      await new Promise((r) => setTimeout(r, 2000));
      const result = `[MOCK RESULT] Here is your viral LinkedIn post about ${topic} for ${audience}!\n\n🚀 The future is here.\n\n#AI #Innovation #SaaS`;
      
      // Save execution to DB
      await prisma.execution.create({
        data: {
          workflowId,
          topic,
          audience,
          result,
        },
      });

      return NextResponse.json({ result });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey || apiKey === "your_api_key_here") {
      return NextResponse.json({ error: "OpenAI API Key not configured on server." }, { status: 500 });
    }

    const openai = new OpenAI({ apiKey });

    // Step 1: Summarize/Analyze
    const completion1 = await openai.chat.completions.create({
      messages: [{ role: "user", content: `Summarize this topic into 3 key insights: ${topic}` }],
      model: "gpt-3.5-turbo",
    });
    const summary = completion1.choices[0].message.content;

    // Step 2: Extract Hooks
    const completion2 = await openai.chat.completions.create({
      messages: [{ role: "user", content: `Based on this summary, write a viral "hook" sentence for a LinkedIn post: ${summary}` }],
      model: "gpt-3.5-turbo",
    });
    const hook = completion2.choices[0].message.content;

    // Step 3: Generate Posts
    const completion3 = await openai.chat.completions.create({
      messages: [{ role: "user", content: `Write a full LinkedIn post using this hook: "${hook}". Target audience: ${audience}. Include 3 relevant hashtags.` }],
      model: "gpt-3.5-turbo",
    });
    const finalPost = completion3.choices[0].message.content || "";

    // Save execution to DB
    await prisma.execution.create({
      data: {
        workflowId,
        topic,
        audience,
        result: finalPost,
      },
    });

    return NextResponse.json({ result: finalPost });
  } catch (error: any) {
    console.error("Execution error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
