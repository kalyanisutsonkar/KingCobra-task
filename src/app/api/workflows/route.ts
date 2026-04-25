import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { WORKFLOWS } from "@/lib/data";

export async function GET() {
  try {
    let workflows = await prisma.workflow.findMany({
      include: {
        steps: true,
      },
    });

    // Auto-seed if database is empty
    if (workflows.length === 0) {
      console.log("Database empty, auto-seeding...");
      for (const workflow of WORKFLOWS) {
        await prisma.workflow.upsert({
          where: { id: workflow.id },
          update: {},
          create: {
            id: workflow.id,
            title: workflow.title,
            description: workflow.description,
            longDescription: workflow.longDescription,
            category: workflow.category,
            price: workflow.price,
            rating: workflow.rating,
            reviews: workflow.reviews,
            mediaUrl: workflow.mediaUrl,
            steps: {
              create: workflow.steps.map((step) => ({
                title: step.title,
                description: step.description,
                icon: step.icon,
              })),
            },
          },
        });
      }
      
      // Fetch again after seeding
      workflows = await prisma.workflow.findMany({
        include: { steps: true },
      });
    }

    return NextResponse.json(workflows);
  } catch (error) {
    console.error("Error fetching workflows:", error);
    // Fallback to static data if DB connection fails
    return NextResponse.json(WORKFLOWS);
  }
}
