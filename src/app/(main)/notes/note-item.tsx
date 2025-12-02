import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Doc } from "../../../../convex/_generated/dataModel";

interface NoteItemProps {
  note: Doc<"notes">;
}

export function NoteItem({ note }: NoteItemProps) {
  return (
    <>
      <Card className="cursor-pointer transition-shadow hover:shadow-md">
        <CardHeader>
          <CardTitle>{note.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground line-clamp-3 text-sm whitespace-pre-line">
            {note.body}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
