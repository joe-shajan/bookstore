import { Client } from "@elastic/elasticsearch";
import { ELASTIC_CLOUD_ID } from "./config";

export const elasticClient = new Client({
  cloud: {
    id: ELASTIC_CLOUD_ID,
  },
  auth: {
    username: process.env.ELASTIC_USERNAME as string,
    password: process.env.ELASTIC_PASSWORD as string,
  },
});

// Create an Elasticsearch index for books
const createBookIndex = async () => {
  try {
    await elasticClient.indices.create({
      index: "books",
      body: {
        mappings: {
          properties: {
            title: { type: "text" },
            author: { type: "text" },
            description: { type: "text" },
            publicationYear: { type: "text" },
            isbn: { type: "text" },
          },
        },
      },
    });
    console.log('Elasticsearch index "books" created.');
  } catch (error) {
    console.error("Error creating Elasticsearch index:", error);
  }
};

const deleteIndex = async (indexName: string) => {
  try {
    const indexExists = await elasticClient.indices.exists({
      index: indexName,
    });

    if (indexExists) {
      // Delete the index
      await elasticClient.indices.delete({ index: indexName });
      console.log(`Index '${indexName}' has been deleted.`);
    } else {
      console.log(`Index '${indexName}' does not exist.`);
    }
  } catch (error) {
    console.error(`Error deleting index: ${error}`);
  }
};

// Call the createBookIndex function to create the index when your application starts.
// createBookIndex();
// deleteIndex("books");
