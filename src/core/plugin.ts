import type { ToolContext, ToolPluginCore } from "gui-chat-protocol";
import type { BrowseToolData, BrowseJsonData, BrowseArgs, BrowseResult } from "./types";
import { TOOL_NAME, TOOL_DEFINITION } from "./definition";

const twitterEmbedData: { [key: string]: string } = {};

function isTwitterUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return (
      urlObj.hostname === "twitter.com" ||
      urlObj.hostname === "www.twitter.com" ||
      urlObj.hostname === "x.com" ||
      urlObj.hostname === "www.x.com"
    );
  } catch {
    return false;
  }
}

async function handleTwitterEmbed(
  url: string,
  context: ToolContext,
): Promise<void> {
  if (!isTwitterUrl(url) || url in twitterEmbedData) {
    return;
  }

  const embedHtml = await context.app?.getTwitterEmbed?.(url);
  if (embedHtml) {
    twitterEmbedData[url] = embedHtml;
  }
}

export const browse = async (
  context: ToolContext,
  args: BrowseArgs,
): Promise<BrowseResult> => {
  const { url } = args;

  // Handle Twitter embeds
  if (isTwitterUrl(url)) {
    await handleTwitterEmbed(url, context);
  }

  if (!context.app?.browseUrl) {
    return {
      message: "browseUrl function not available",
      instructions: "Acknowledge that the webpage browsing failed.",
    };
  }

  try {
    const data = await context.app.browseUrl(url);

    if (data.success && data.data) {
      const browseData: BrowseToolData = {
        url,
        twitterEmbedHtml: isTwitterUrl(url)
          ? twitterEmbedData[url] || null
          : undefined,
      };

      return {
        message: "Successfully browsed the webpage",
        title: data.data.title || "Untitled",
        jsonData: { data: data.data },
        instructions:
          "Acknowledge that the webpage was successfully browsed and give a ONE-SENTENCE summary of the content if it is available.",
        data: browseData,
      };
    } else {
      return {
        message: data.error || "Failed to browse webpage",
        instructions: "Acknowledge that the webpage browsing failed.",
      };
    }
  } catch (error) {
    return {
      message: `Failed to browse webpage: ${error instanceof Error ? error.message : "Unknown error"}`,
      instructions: "Acknowledge that the webpage browsing failed.",
    };
  }
};

export { isTwitterUrl };

export const pluginCore: ToolPluginCore<BrowseToolData, BrowseJsonData, BrowseArgs> = {
  toolDefinition: TOOL_DEFINITION,
  execute: browse,
  generatingMessage: "Browsing webpage...",
  waitingMessage: "Tell the user to that you are accessing the specified web page.",
  isEnabled: () => true,
  delayAfterExecution: 3000,
  backends: ["browse"],
};

export { TOOL_NAME, TOOL_DEFINITION };
export const executeBrowse = browse;
