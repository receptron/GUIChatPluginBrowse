<template>
  <div class="text-center p-4 bg-blue-50 rounded">
    <div class="text-blue-600 font-medium">Web Page</div>
    <div class="text-xs text-gray-600 mt-1 truncate">
      {{ result.title || result.data?.url }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ToolResult } from "gui-chat-protocol";
import type { BrowseToolData } from "../core/types";

defineProps<{
  result: ToolResult<BrowseToolData>;
}>();
</script>
