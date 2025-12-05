import { google } from "@ai-sdk/google";
import { getAuthUserId } from "@convex-dev/auth/server";
import {
  convertToModelMessages,
  stepCountIs,
  streamText,
  tool,
  UIMessage,
} from "ai";
import { httpRouter } from "convex/server";
import { z } from "zod";
import { internal } from "./_generated/api";
import { httpAction } from "./_generated/server";
import { auth } from "./auth";

const http = httpRouter();

auth.addHttpRoutes(http);

http.route({
  path: "/api/chat",
  method: "POST",
  handler: httpAction(async (ctx, req) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { messages }: { messages: UIMessage[] } = await req.json();

    const lastMessages = messages.slice(-10);

    const result = streamText({
      model: google("gemini-2.0-flash-lite"),
      system: `
      You are a helpful assistant that can search through the user's notes.
      
      FORMATTING RULES:
      - Use markdown formatting in all your responses
      - **Bold important information** like passwords, keys, or specific answers using **text**
      - Create clickable links using markdown syntax: [link text](/notes?noteId=<note-id>)
      - NEVER display raw URLs like '/notes?noteId=xxx' - always wrap them in markdown links
      - Use "here", "view note", "see full note", or the note title as link text
      
      RESPONSE FORMAT:
      When answering questions:
      1. Provide the answer in **bold** if it's specific information (password, number, etc.)
      2. Add a markdown link to the source note like: [View note](/notes?noteId=xxx) or [here](/notes?noteId=xxx)
      
      EXAMPLES:
      - "Your WiFi password is **MyPassword123**. [View note](/notes?noteId=abc123)"
      - "The answer is **42**. You can find more details [here](/notes?noteId=abc123)"
      - "Here's the information from your [Passwords note](/notes?noteId=abc123): **MyPassword123**"
      
      If the requested information is not available, respond with "Sorry, I can't find that information in your notes".
      Keep your responses concise and to the point.
      `,
      messages: convertToModelMessages(lastMessages),
      tools: {
        findRelevantNotes: tool({
          description:
            "Retrieve relevant notes from the database based on the user's query",
          inputSchema: z.object({
            query: z.string().describe("The user's query"),
          }),
          execute: async ({ query }) => {
            console.log("findRelevantNotes query:", query);

            const relevantNotes = await ctx.runAction(
              internal.notesActions.findRelevantNotes,
              {
                query,
                userId,
              },
            );

            return relevantNotes.map((note) => ({
              id: note._id,
              title: note.title,
              body: note.body,
              creationTime: note._creationTime,
            }));
          },
        }),
      },
      stopWhen: stepCountIs(5),
      onError(error) {
        console.error("streamText error:", error);
      },
    });

    return result.toUIMessageStreamResponse({
      headers: new Headers({
        "Access-Control-Allow-Origin": "*",
        Vary: "origin",
      }),
    });
  }),
});

http.route({
  path: "/api/chat",
  method: "OPTIONS",
  handler: httpAction(async (_, request) => {
    const headers = request.headers;
    if (
      headers.get("Origin") !== null &&
      headers.get("Access-Control-Request-Method") !== null &&
      headers.get("Access-Control-Request-Headers") !== null
    ) {
      return new Response(null, {
        headers: new Headers({
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers": "Content-Type, Digest, Authorization",
          "Access-Control-Max-Age": "86400",
        }),
      });
    } else {
      return new Response();
    }
  }),
});

export default http;
