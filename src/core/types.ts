import type { ToolResult } from "gui-chat-protocol";

export interface BrowseToolData {
  url: string;
  twitterEmbedHtml?: string | null;
}

export interface BrowseJsonData {
  data: {
    title?: string;
    description?: string;
    content?: string;
    textContent?: string;
    text?: string;
    byline?: string;
    excerpt?: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

export interface BrowseArgs {
  url: string;
}

export type BrowseResult = ToolResult<BrowseToolData, BrowseJsonData>;
