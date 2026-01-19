# @gui-chat-plugin/browse

[![npm version](https://badge.fury.io/js/%40gui-chat-plugin%2Fbrowse.svg)](https://www.npmjs.com/package/@gui-chat-plugin/browse)

Web browsing plugin for GUI Chat applications. Browse and extract content from web pages.

## Features

- Extract content from any web page URL
- Twitter/X post embedding support
- Article content parsing (title, byline, excerpt, body)
- Clean, readable content display

## Installation

```bash
yarn add @gui-chat-plugin/browse
```

## Usage

### Vue Integration

```typescript
// In src/tools/index.ts
import BrowsePlugin from "@gui-chat-plugin/browse/vue";

const pluginList = [
  // ... other plugins
  BrowsePlugin,
];

// In src/main.ts
import "@gui-chat-plugin/browse/style.css";
```

### Core-only Usage

```typescript
import { executeBrowse, TOOL_DEFINITION } from "@gui-chat-plugin/browse";

// Browse a webpage
const result = await executeBrowse(context, {
  url: "https://example.com/article",
});
```

## API

### BrowseArgs

```typescript
interface BrowseArgs {
  url: string; // The URL of the webpage to browse
}
```

### BrowseToolData

```typescript
interface BrowseToolData {
  url: string;
  twitterEmbedHtml?: string | null;
}
```

### BrowseJsonData

```typescript
interface BrowseJsonData {
  data: {
    title?: string;
    description?: string;
    content?: string;
    textContent?: string;
    text?: string;
    byline?: string;
    excerpt?: string;
  };
}
```

## Development

```bash
# Install dependencies
yarn install

# Run demo
yarn dev

# Build
yarn build

# Lint
yarn lint
```

## Test Prompts

Try these prompts to test the plugin:

1. "Browse the Wikipedia page about artificial intelligence and tell me the key points"
2. "Show me what's on the Hacker News homepage"
3. "Read this article and summarize it: https://example.com/article"

## License

MIT
