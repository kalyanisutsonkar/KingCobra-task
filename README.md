# PromptsGo! - AI Workflow Marketplace MVP

Welcome to the new PromptsGo! We've pivoted from a prompt library to the "Shopify for AI Workflows." This prototype demonstrates the discovery, deployment, and execution of multi-step AI automation chains.

## 🚀 Features

- **Marketplace Discovery**: Browse and filter pre-built workflows for Marketing, Sales, HR, and Content.
- **Workflow Blueprints**: Visual representation of multi-step AI chains.
- **Mock Checkout**: Secure-looking Stripe integration for workflow deployment.
- **Functional Runner**: Real AI execution (LinkedIn Post Generator) using your OpenAI API Key.
- **Creator Dashboard**: Analytics tracking and new workflow publishing interface.

## 🛠️ Technical Choices

- **Next.js 15 (App Router)**: Chosen for speed, SEO, and robust dynamic routing.
- **Tailwind CSS 4**: Leveraged the latest theme variable system for a premium dark-mode aesthetic.
- **Framer Motion**: Used for high-end micro-animations to enhance the premium feel.
- **Client-Side AI**: Execution happens on the client to ensure user API keys remain private and secure.

## 📦 Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation
1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Testing the Workflow Runner
To test the functional **LinkedIn Post Generator**:
1. Navigate to the "LinkedIn Post Generator" in the marketplace.
2. Click "View Details" -> "Deploy Workflow".
3. Complete the mock checkout.
4. Input your **OpenAI API Key** (sk-...) and a topic.
5. Watch the multi-step execution in real-time!

## 🔮 Future Improvements
If I had more time, I would:
1. **Supabase Integration**: Persist the newly uploaded workflows from the Creator Dashboard to a database.
2. **Visual Builder**: Implement a drag-and-drop interface for creators to build workflows visually instead of JSON.
3. **Template Versioning**: Add support for workflow forking and version control (staying true to the "GitHub for AI" roots).
4. **Stripe Webhooks**: Implement actual payment processing for real-world deployments.

---
Built with ❤️ by Antigravity
