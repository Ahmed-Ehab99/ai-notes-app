import { google } from "@ai-sdk/google";
import { embed, embedMany } from "ai";

const embeddingModel = google.textEmbeddingModel("text-embedding-004");

function generateChunks(input: string) {
  return input
    .split("\n\n")
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .slice(0, 100); // Google recommends max ~100 chunks per request;
}

export async function generateEmbeddings(
  value: string,
): Promise<Array<{ content: string; embedding: number[] }>> {
  const chunks = generateChunks(value);

  // Handle empty input
  if (chunks.length === 0) {
    return [];
  }

  const { embeddings } = await embedMany({
    model: embeddingModel,
    values: chunks,
  });

  return embeddings.map((embedding, index) => ({
    content: chunks[index],
    embedding,
  }));
}

export async function generateEmbedding(value: string): Promise<number[]> {
  const { embedding } = await embed({
    model: embeddingModel,
    value,
  });

  return embedding;
}
