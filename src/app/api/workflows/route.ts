import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { WORKFLOWS } from "@/lib/data";

export async function GET() {
  try {
    const workflows = await prisma.workflow.findMany({
      include: {
        steps: true,
      },
    });

    // Fallback to static data if DB is empty (common on Vercel with SQLite)
    if (workflows.length === 0) {
      return NextResponse.json(WORKFLOWS);
    }

    return NextResponse.json(workflows);
  } catch (error) {
    console.error("Error fetching workflows:", error);
    // Fallback to static data if DB connection fails
    return NextResponse.json(WORKFLOWS);
  }
}
