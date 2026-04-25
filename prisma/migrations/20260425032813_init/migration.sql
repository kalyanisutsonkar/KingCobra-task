-- CreateTable
CREATE TABLE "Workflow" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "longDescription" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "rating" REAL NOT NULL,
    "reviews" INTEGER NOT NULL,
    "mediaUrl" TEXT
);

-- CreateTable
CREATE TABLE "Step" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "workflowId" TEXT NOT NULL,
    CONSTRAINT "Step_workflowId_fkey" FOREIGN KEY ("workflowId") REFERENCES "Workflow" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Execution" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "workflowId" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "audience" TEXT NOT NULL,
    "result" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Execution_workflowId_fkey" FOREIGN KEY ("workflowId") REFERENCES "Workflow" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
