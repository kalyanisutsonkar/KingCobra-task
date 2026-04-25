import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const workflows = await prisma.workflow.findMany({
      include: {
        steps: true,
      },
    });
    return NextResponse.json(workflows);
  } catch (error) {
    console.error("Error fetching workflows:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
