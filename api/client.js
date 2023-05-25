import { createClient } from "next-sanity";

export const client = createClient({
    projectId: "ewl3r917",
    dataset: "production",
    apiVersion: "2022-03-25",
    useCdn: false
});
