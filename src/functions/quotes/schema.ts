export default {
  type: "object",
  properties: {
    id: { type: "string" },
    author: { type: "string" },
    text: { type: "string" },
    likeCount: { type: "int" },
  },
  required: ["id", "author", "text", "likeCount"],
} as const;
