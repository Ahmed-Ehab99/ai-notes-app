"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useMutation } from "convex/react";
import { Trash2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { api } from "../../../../convex/_generated/api";
import { Doc } from "../../../../convex/_generated/dataModel";

interface NotePreviewDialogProps {
  note: Doc<"notes">;
}

export function NotePreviewDialog({ note }: NotePreviewDialogProps) {
  // Hooks
  const searchParams = useSearchParams();
  const deleteNote = useMutation(api.notes.deleteNote);
  const [deletePending, setDeletePending] = useState(false);

  // Derived States
  const isOpen = searchParams.get("noteId") === note._id;

  // Functions
  function handleClose() {
    if (deletePending) return; // For UX
    window.history.pushState(null, "", window.location.pathname);
  }

  async function handleDelete() {
    setDeletePending(true);
    try {
      await deleteNote({ noteId: note._id });
      toast.success("Note Deleted");
      handleClose();
    } catch (error) {
      console.error("Failed to delete note", error);
      toast.error("Failed to delete note. Please try again");
    } finally {
      setDeletePending(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>{note.title}</DialogTitle>
          <DialogDescription className="sr-only">
            Fill in your note details.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 whitespace-pre-wrap">{note.body}</div>

        <DialogFooter className="mt-6">
          <Button
            variant="destructive"
            className="gap-2"
            onClick={handleDelete}
            disabled={deletePending}
          >
            <Trash2 size={16} />
            {deletePending ? " Deleteing..." : "Delete Note"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
