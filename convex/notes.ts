import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createNote = mutation({
  args: {
    title: v.string(),
    body: v.string(),
  },
  returns: v.id("notes"),
  handler: async (ctx, args) => {
    // Get user ID from authentication
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("User must be authenticated to create a note");
    }

    // Insert note into database
    return await ctx.db.insert("notes", {
      title: args.title,
      body: args.body,
      userId,
    });
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
