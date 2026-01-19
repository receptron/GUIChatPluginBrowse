export const TOOL_NAME = "browse";

export const TOOL_DEFINITION = {
  type: "function" as const,
  name: TOOL_NAME,
  description:
    "Browse and extract content from a web page using the provided URL.",
  parameters: {
    type: "object" as const,
    properties: {
      url: {
        type: "string",
        description:
          "The URL of the webpage to browse and extract content from",
      },
    },
    required: ["url"],
  },
};
