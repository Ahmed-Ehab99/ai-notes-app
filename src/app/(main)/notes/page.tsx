import { Metadata } from "next";
import { NotesPage } from "./_components/notes-page";

export const metadata: Metadata = {
  title: "Your Notes",
};

export default function Page() {
  return <NotesPage />;
}
