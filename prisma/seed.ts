import { PrismaClient } from "@prisma/client";
import { WORKFLOWS } from "../src/lib/data";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Clear existing data
  await prisma.step.deleteMany();
  await prisma.workflow.deleteMany();
  await prisma.execution.deleteMany();

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

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
