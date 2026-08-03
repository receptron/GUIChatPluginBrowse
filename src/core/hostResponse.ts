import type { BrowseJsonData } from "./types";

type BrowsedPage = BrowseJsonData["data"];

export interface BrowseUrlResponse {
  success: boolean;
  data?: BrowsedPage;
  error?: string;
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const isOptionalString = (value: unknown): value is string | undefined =>
  value === undefined || typeof value === "string";

// The page body carries host-specific extras beyond the named fields, so only
// the ones this plugin reads back are checked.
const isBrowsedPage = (value: unknown): value is BrowsedPage =>
  isRecord(value) &&
  isOptionalString(value.title) &&
  isOptionalString(value.description) &&
  isOptionalString(value.content) &&
  isOptionalString(value.textContent) &&
  isOptionalString(value.text) &&
  isOptionalString(value.byline) &&
  isOptionalString(value.excerpt);

export const isBrowseUrlResponse = (
  value: unknown,
): value is BrowseUrlResponse =>
  isRecord(value) &&
  typeof value.success === "boolean" &&
  isOptionalString(value.error) &&
  (value.data === undefined || isBrowsedPage(value.data));
