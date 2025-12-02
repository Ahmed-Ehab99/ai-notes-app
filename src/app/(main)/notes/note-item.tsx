import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Doc } from "../../../../convex/_generated/dataModel";
import { NotePreviewDialog } from "./note-preview-dialog";

interface NoteItemProps {
  note: Doc<"notes">;
}

export function NoteItem({ note }: NoteItemProps) {
  function handleOpenNode() {
    // Update URL without navigating, without refreshing, and without causing React to remount.
    // Useful because refreshing or sharing still opens that note
    // Just to open a modal
    // Also it is faster than router.push()
    window.history.pushState(null, "", `?noteId=${note._id}`);
  }

  return (
    <>
      <Card
        className="cursor-pointer transition-shadow hover:shadow-md"
        onClick={handleOpenNode}
      >
        <CardHeader>
          <CardTitle>{note.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground line-clamp-3 text-sm whitespace-pre-line">
            {note.body}
          </div>
        </CardContent>
      </Card>
      <NotePreviewDialog note={note} />
    </>
  );
}
