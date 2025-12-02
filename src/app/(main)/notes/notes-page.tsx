"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { AIChatButton } from "./ai-chat-button";
import { CreateNoteButton } from "./create-note-button";
import { NoteItem } from "./note-item";

export function NotesPage() {
  const notes = useQuery(api.notes.getUserNotes);

  return (
    <div className="container mx-auto xl:max-w-6xl">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Notes</h1>
        <div className="flex gap-2">
          <AIChatButton />
          <CreateNoteButton />
        </div>
      </div>

      {notes === undefined ? (
        <LoadingSkeleton />
      ) : notes.length === 0 ? (
        <EmptyView />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {notes.map((note) => (
            <NoteItem key={note._id} note={note} />
          ))}
        </div>
      )}
    </div>
  );
}

function EmptyView() {
  return (
    <div className="py-10 text-center">
      <p className="text-muted-foreground">
        No notes yet. Create your first note!
      </p>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="flex flex-col space-y-3">
          <Skeleton className="h-40 w-full rounded-xl" />
        </div>
      ))}
    </div>
  );
}
