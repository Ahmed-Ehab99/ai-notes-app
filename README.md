# Smart Notes - AI-Powered Note-Taking Application

A modern, intelligent note-taking application that leverages AI to help you find and summarize information from your notes. Built with Next.js, Convex, and the Vercel AI SDK.

## ✨ Features

### 📝 Note Management

- **Create, Edit, and Delete Notes**: Simple and intuitive interface for managing your notes
- **Markdown Support**: Notes support Markdown formatting with secure rendering
- **User Authentication**: Secure authentication system to keep your notes private
- **Real-time Sync**: Your notes sync automatically across devices using Convex

### 🤖 AI Chatbot Assistant

- **Intelligent Search**: Ask natural language questions about your notes
- **Semantic Understanding**: Find relevant information even if you don't remember exact keywords
- **Contextual Responses**: Get summaries and answers based on your saved notes
- **Note Linking**: The chatbot provides clickable links to source notes
- **Streaming Responses**: Real-time streaming responses for a smooth chat experience

### 🔍 Vector Embeddings & Semantic Search

- **Automatic Embeddings**: Notes are automatically converted to vector embeddings using Google's `text-embedding-004` model
- **Semantic Similarity**: Uses Convex Vector Search to find notes by meaning, not just keywords
- **Chunked Processing**: Notes are intelligently chunked for optimal embedding generation
- **Privacy-First**: Embeddings are stored securely and filtered by user

## 🛠️ Technology Stack

### Frontend

- **Next.js 16**: React framework with App Router
- **React 19**: Latest React with server components
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **React Markdown**: Secure Markdown rendering
- **shadcn/ui**: Beautiful, accessible UI components

### Backend & AI

- **Convex**: Backend-as-a-Service with real-time database
- **Vercel AI SDK**: Unified API for AI integrations
- **Google Gemini 2.0 Flash Lite**: AI model for chatbot responses
- **Google Text Embedding 004**: Vector embeddings model

## 🚀 Convex Features Used

This application showcases several powerful Convex capabilities:

### 📊 Convex Database

- **Schema Definition**: Type-safe schema with `defineSchema` and `defineTable`
- **Indexed Queries**: Efficient queries using indexes (e.g., `by_userId` index)
- **Real-time Updates**: Automatic UI updates when data changes

### 🔎 Convex Vector Search

- **Vector Indexes**: High-performance vector similarity search using `vectorIndex`
- **Filtered Search**: Vector search combined with metadata filtering (user-specific results)
- **768-Dimensional Embeddings**: Supports embeddings from Google's text-embedding-004 model
- **Score Thresholding**: Results filtered by similarity score (threshold > 0.3)

### ⚡ Convex Actions

- **Node.js Actions**: Server-side processing with `"use node"` directive
- **Embedding Generation**: Generate embeddings using AI SDK before storing
- **Vector Search Execution**: Perform semantic search across user notes
- **Async Operations**: Handle long-running tasks like AI API calls

### 🌐 Convex HTTP Routes

- **REST API Endpoints**: `/api/chat` endpoint for chatbot interactions
- **Authentication Middleware**: Protected routes with user authentication
- **Streaming Responses**: Stream AI responses using UIMessageStreamResponse
- **CORS Support**: Cross-origin resource sharing for API access

### 🔐 Convex Auth

- **User Authentication**: Secure authentication system
- **Protected Routes**: Server-side authentication checks
- **User Context**: Access authenticated user in queries, mutations, and actions

### 🔄 Convex Mutations & Queries

- **Data Operations**: Create, read, update, delete operations for notes
- **Internal Functions**: Secure internal mutations for embedding storage
- **Transaction Safety**: Atomic operations for note and embedding management

## 📁 Project Structure

```
ai_notes_app/
├── convex/                 # Convex backend
│   ├── schema.ts          # Database schema definition
│   ├── notes.ts           # Notes queries and mutations
│   ├── notesActions.ts    # Actions for embeddings and vector search
│   ├── http.ts            # HTTP routes for chatbot API
│   ├── auth.ts            # Authentication configuration
│   └── _generated/        # Auto-generated Convex types
├── src/
│   ├── app/               # Next.js app directory
│   │   ├── (auth)/        # Authentication pages
│   │   ├── (main)/        # Main application pages
│   │   │   └── notes/     # Notes page with components
│   │   └── page.tsx       # Landing page
│   ├── components/        # React components
│   │   ├── markdown.tsx   # Markdown renderer with security
│   │   └── ui/            # shadcn/ui components
│   └── lib/
│       └── embeddings.ts  # Embedding generation utilities
└── README.md
```

## 🔒 Security Features

- **XSS Protection**: Uses ReactMarkdown instead of `dangerouslySetInnerHTML`
- **User Isolation**: All queries filtered by authenticated user ID
- **Authorization Checks**: Server-side verification that users can only access their own notes
- **Secure Link Handling**: Internal links rendered with Next.js Link, external links with security attributes

## 🚦 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- A Convex account ([sign up here](https://www.convex.dev))
- Google AI API key (for Gemini and embeddings)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd ai_notes_app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up Convex**

   ```bash
   npx convex dev
   ```

   This will guide you through Convex setup and create a `.env.local` file.

4. **Configure environment variables**

   Create or update `.env.local`:

   ```env
   CONVEX_DEPLOYMENT=<your-convex-deployment-url>
   GOOGLE_GENERATIVE_AI_API_KEY=<your-google-ai-api-key>
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

5. **Run the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📚 How It Works

### Note Creation Flow

1. User creates a note with title and body
2. Convex Action (`createNote`) generates embeddings using Google's embedding model
3. Note is split into chunks (by paragraphs) for better semantic search
4. Each chunk is converted to a 768-dimensional vector embedding
5. Note and embeddings are stored in Convex database
6. Embeddings are indexed using Convex Vector Search

### AI Chatbot Flow

1. User asks a question in the chatbot
2. Query is converted to a vector embedding
3. Convex Vector Search finds similar note chunks (semantic similarity)
4. Relevant notes are retrieved and passed to Gemini AI
5. AI generates a response with context from the notes
6. Response is streamed back to the user with markdown formatting

### Vector Search Architecture

- **Embedding Model**: Google `text-embedding-004` (768 dimensions)
- **Similarity Metric**: Cosine similarity
- **Score Threshold**: 0.3 (configurable)
- **Result Limit**: 16 most similar chunks
- **Filtering**: User-specific results using Convex filters

## 🎯 Key Convex Capabilities Demonstrated

1. **Real-time Database**: Automatic UI updates when notes change
2. **Vector Search**: Semantic similarity search with sub-second latency
3. **Server Actions**: Process AI operations server-side
4. **HTTP Endpoints**: Build API routes directly in Convex
5. **Authentication**: Built-in auth with user context
6. **Type Safety**: End-to-end TypeScript types from database to frontend

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is private and proprietary.

## 🙏 Acknowledgments

- Built with [Convex](https://www.convex.dev) - The backend platform
- Powered by [Vercel AI SDK](https://sdk.vercel.ai) - AI integration framework
- UI components from [shadcn/ui](https://ui.shadcn.com)
- AI models by [Google Gemini](https://ai.google.dev)
