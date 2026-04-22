export interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Workflow {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: string;
  price: string;
  rating: number;
  reviews: number;
  steps: WorkflowStep[];
  mediaUrl?: string;
}

export const WORKFLOWS: Workflow[] = [
  {
    id: "seo-article-writer",
    title: "SEO Article Writer",
    description: "Multi-step chain that researches keywords, outlines structure, and writes a 2,000-word SEO-optimized blog post.",
    longDescription: "Our SEO Article Writer is the ultimate tool for content marketers. It doesn't just write; it researches. The workflow begins by analyzing high-ranking articles for your target keywords, extracts the semantic structure, generates a detailed outline, and then writes each section with a focus on readability and search engine optimization. Perfect for agencies and high-volume content teams.",
    category: "Marketing",
    price: "49",
    rating: 4.9,
    reviews: 128,
    steps: [
      { id: "1", title: "Keyword Analysis", description: "Analyzes top-ranking content for semantic keywords.", icon: "Search" },
      { id: "2", title: "Outline Generation", description: "Creates a detailed H1/H2/H3 structure based on findings.", icon: "Layout" },
      { id: "3", title: "Section Research", description: "Gathers facts and data points for each section.", icon: "Database" },
      { id: "4", title: "Drafting", description: "Writes the full article with a consistent tone of voice.", icon: "PenTool" },
      { id: "5", title: "SEO Optimization", description: "Injects meta-tags and internal link suggestions.", icon: "Zap" }
    ]
  },
  {
    id: "linkedin-post-generator",
    title: "LinkedIn Post Generator",
    description: "Takes a long-form article or URL, extracts key insights, and crafts 3 viral LinkedIn posts with relevant hashtags.",
    longDescription: "Boost your professional presence with the LinkedIn Post Generator. This workflow is designed to repurpose your existing content into highly engaging social snippets. By identifying 'hook' points and summarizing complex ideas into punchy bullet points, it ensures your message resonates with the LinkedIn algorithm and your target audience.",
    category: "Content",
    price: "29",
    rating: 4.8,
    reviews: 84,
    steps: [
      { id: "1", title: "Content Extraction", description: "Scrapes and summarizes the provided article or URL.", icon: "FileText" },
      { id: "2", title: "Hook Identification", description: "Finds the most controversial or interesting angles.", icon: "Anchor" },
      { id: "3", title: "Social Copywriting", description: "Generates 3 variations of the post (Story, Listicle, News).", icon: "Share2" }
    ]
  },
  {
    id: "customer-support-ai",
    title: "Customer Support AI",
    description: "Analyzes incoming tickets, searches your knowledge base, and drafts empathetic, accurate responses for human review.",
    longDescription: "Reduce your support team's workload by up to 70%. Our Customer Support AI workflow integrates with your knowledge base to provide instant, high-quality drafts for any inquiry. It analyzes customer sentiment to ensure the tone is always appropriate, whether the user is frustrated or just curious.",
    category: "HR",
    price: "99",
    rating: 5.0,
    reviews: 215,
    steps: [
      { id: "1", title: "Sentiment Analysis", description: "Determines the emotional tone of the customer ticket.", icon: "Smile" },
      { id: "2", title: "KB Retrieval", description: "Queries your documentation for relevant solutions.", icon: "BookOpen" },
      { id: "3", title: "Draft Generation", description: "Writes a personalized response with troubleshooting steps.", icon: "MessageSquare" }
    ]
  },
  {
    id: "email-marketing-generator",
    title: "Email Marketing Generator",
    description: "Builds high-converting cold email sequences based on your product description and target audience profile.",
    longDescription: "Scale your outreach without sounding like a robot. This workflow crafts personalized email sequences that feel 1-on-1. It uses behavioral psychology principles to write subject lines that get opened and calls-to-action that get clicked.",
    category: "Sales",
    price: "39",
    rating: 4.7,
    reviews: 92,
    steps: [
      { id: "1", title: "Persona Analysis", description: "Identifies pain points for your target audience.", icon: "Users" },
      { id: "2", title: "Sequence Mapping", description: "Defines the touchpoints for a 5-day outreach plan.", icon: "Map" },
      { id: "3", title: "Copywriting", description: "Writes high-conversion body copy for each email.", icon: "Mail" }
    ]
  }
];
