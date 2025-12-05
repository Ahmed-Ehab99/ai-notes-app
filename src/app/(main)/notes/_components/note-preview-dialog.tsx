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
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction, useMutation } from "convex/react";
import { Edit, Trash2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { api } from "../../../../../convex/_generated/api";
import { Doc } from "../../../../../convex/_generated/dataModel";
import EditNoteForm from "./edit-note-form";
import { noteFormSchema, NoteFormValues } from "./schema";

interface NotePreviewDialogProps {
  note: Doc<"notes">;
}

export function NotePreviewDialog({ note }: NotePreviewDialogProps) {
  // Hooks
  const searchParams = useSearchParams();
  const deleteNote = useMutation(api.notes.deleteNote);
  const updateNote = useAction(api.notesActions.updateNote);
  const [deletePending, setDeletePending] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const form = useForm<NoteFormValues>({
    resolver: zodResolver(noteFormSchema),
    defaultValues: {
      title: note.title,
      body: note.body,
    },
  });

  // Derived States
  const isOpen = searchParams.get("noteId") === note._id;
  const isSubmitting = form.formState.isSubmitting;

  // Reset form when note changes or dialog opens/closes
  useEffect(() => {
    if (isOpen && !isEditing) {
      form.reset({
        title: note.title,
        body: note.body,
      });
    }
  }, [note, isOpen, isEditing, form]);

  // Functions
  function handleClose() {
    if (deletePending || isSubmitting) return; // For UX
    setIsEditing(false);
    form.reset({
      title: note.title,
      body: note.body,
    });
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

  function handleEdit() {
    setIsEditing(true);
  }

  function handleCancelEdit() {
    setIsEditing(false);
    form.reset({
      title: note.title,
      body: note.body,
    });
  }

  async function onSubmit(values: NoteFormValues) {
    try {
      await updateNote({
        noteId: note._id,
        title: values.title,
        body: values.body,
      });
      toast.success("Note updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update note", error);
      toast.error("Failed to update note. Please try again.");
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Note" : note.title}</DialogTitle>
          <DialogDescription className="sr-only">
            {isEditing
              ? "Edit your note details. Click save when you're done."
              : "Fill in your note details."}
          </DialogDescription>
        </DialogHeader>

        {isEditing ? (
          <EditNoteForm
            form={form}
            onSubmit={onSubmit}
            handleCancelEdit={handleCancelEdit}
            isSubmitting={isSubmitting}
          />
        ) : (
          <>
            <div className="mt-4 whitespace-pre-wrap">{note.body}</div>

            <DialogFooter className="mt-6">
              <Button
                variant="outline"
                className="gap-2"
                onClick={handleEdit}
                disabled={deletePending}
              >
                <Edit size={16} />
                Edit
              </Button>
              <Button
                variant="destructive"
                className="gap-2"
                onClick={handleDelete}
                disabled={deletePending}
              >
                <Trash2 size={16} />
                {deletePending ? "Deleting..." : "Delete Note"}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
