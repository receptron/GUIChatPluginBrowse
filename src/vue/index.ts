import "../style.css";

import type { ToolPlugin } from "gui-chat-protocol/vue";
import type { BrowseToolData, BrowseJsonData, BrowseArgs } from "../core/types";
import { pluginCore } from "../core/plugin";
import { samples } from "../core/samples";
import View from "./View.vue";
import Preview from "./Preview.vue";

export const plugin: ToolPlugin<BrowseToolData, BrowseJsonData, BrowseArgs> = {
  ...pluginCore,
  viewComponent: View,
  previewComponent: Preview,
  samples,
};

export type { BrowseToolData, BrowseJsonData, BrowseArgs } from "../core/types";

export {
  TOOL_NAME,
  TOOL_DEFINITION,
  executeBrowse,
  pluginCore,
  isTwitterUrl,
} from "../core/plugin";

export { samples } from "../core/samples";

export { View, Preview };

export default { plugin };
