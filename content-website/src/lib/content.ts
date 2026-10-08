import { sanityClient } from "./sanity";

const query = `
  *[
    _type == "content" &&
    published == true
  ]
  | order(_createdAt desc)[0]
`;

export async function getContent() {
  const start = performance.now();

  const content = await sanityClient.fetch(
    query,
    {},
    {
      cache: "no-store"
    }
  );

  const end = performance.now();

  console.log(
    `Content fetch latency: ${(end - start).toFixed(2)}ms`
  );

  return content;
}