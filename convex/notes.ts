import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";
import {
  internalMutation,
  internalQuery,
  mutation,
  query,
} from "./_generated/server";

export const createNoteWithEmbeddings = internalMutation({
  args: {
    title: v.string(),
    body: v.string(),
    userId: v.id("users"),
    embeddings: v.array(
      v.object({
        embedding: v.array(v.float64()),
        content: v.string(),
      }),
    ),
  },
  returns: v.id("notes"),
  handler: async (ctx, args) => {
    const noteId = await ctx.db.insert("notes", {
      title: args.title,
      body: args.body,
      userId: args.userId,
    });

    for (const embeddingData of args.embeddings) {
      await ctx.db.insert("noteEmbeddings", {
        content: embeddingData.content,
        embedding: embeddingData.embedding,
        noteId,
        userId: args.userId,
      });
    }

    return noteId;
  },
});

export const getUserNotes = query({
  args: {},
  handler: async (ctx) => {
    // Get user ID from authentication
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return [];
    }

    // Get notes from database and order them from newest to oldest
    return await ctx.db
      .query("notes")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();
  },
});

export const updateNoteWithEmbeddings = internalMutation({
  args: {
    noteId: v.id("notes"),
    title: v.string(),
    body: v.string(),
    userId: v.id("users"),
    embeddings: v.array(
      v.object({
        embedding: v.array(v.float64()),
        content: v.string(),
      }),
    ),
  },
  handler: async (ctx, args) => {
    // Get specific note
    const note = await ctx.db.get(args.noteId);

    if (!note) {
      throw new Error("Note not found");
    }

    // Check that note belongs to that user (Security)
    if (note.userId !== args.userId) {
      throw new Error("User is not authorized to update this note");
    }

    // Delete old embeddings
    const oldEmbeddings = await ctx.db
      .query("noteEmbeddings")
      .withIndex("by_noteId", (q) => q.eq("noteId", args.noteId))
      .collect();

    for (const embedding of oldEmbeddings) {
      await ctx.db.delete(embedding._id);
    }

    // Update the note
    await ctx.db.patch(args.noteId, {
      title: args.title,
      body: args.body,
    });

    // Insert new embeddings
    for (const embeddingData of args.embeddings) {
      await ctx.db.insert("noteEmbeddings", {
        content: embeddingData.content,
        embedding: embeddingData.embedding,
        noteId: args.noteId,
        userId: args.userId,
      });
    }
  },
});

export const deleteNote = mutation({
  args: {
    noteId: v.id("notes"),
  },
  handler: async (ctx, args) => {
    // Get user ID from authentication
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("User must be authenticated to delete a note");
    }

    // Get specific note
    const note = await ctx.db.get(args.noteId);

    if (!note) {
      throw new Error("Note not found");
    }

    // Check that note that want to delete is belong to that user (Security)
    if (note.userId !== userId) {
      throw new Error("User is not authorized to delete this note");
    }

    const embeddings = await ctx.db
      .query("noteEmbeddings")
      .withIndex("by_noteId", (q) => q.eq("noteId", args.noteId))
      .collect();

    for (const embedding of embeddings) {
      await ctx.db.delete(embedding._id);
    }

    // Delete the note
    await ctx.db.delete(args.noteId);
  },
});

export const fetchNotesByEmbeddingIds = internalQuery({
  args: {
    embeddingIds: v.array(v.id("noteEmbeddings")),
  },
  handler: async (ctx, args) => {
    const embeddings = [];
    for (const id of args.embeddingIds) {
      const embedding = await ctx.db.get(id);
      if (embedding !== null) {
        embeddings.push(embedding);
      }
    }

    const uniqueNoteIds = [
      ...new Set(embeddings.map((embedding) => embedding.noteId)),
    ];

    const results = [];
    for (const id of uniqueNoteIds) {
      const note = await ctx.db.get(id);
      if (note !== null) {
        results.push(note);
      }
    }

    return results;
  },
});
