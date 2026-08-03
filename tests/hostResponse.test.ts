/**
 * `context.app.browseUrl` returns `unknown` since gui-chat-protocol 2.0.0, so
 * the plugin narrows it here instead of trusting the host's shape.
 *
 * Run with: yarn test
 */

import { test, describe } from "node:test";
import assert from "node:assert";
import { isBrowseUrlResponse } from "../src/core/hostResponse.js";

describe("isBrowseUrlResponse", () => {
  test("accepts a successful response carrying a page", () => {
    assert.equal(
      isBrowseUrlResponse({
        success: true,
        data: { title: "Example", extra: 1 },
      }),
      true,
    );
  });

  test("accepts a failure response carrying an error string", () => {
    assert.equal(isBrowseUrlResponse({ success: false, error: "boom" }), true);
  });

  test("rejects a response without a boolean success flag", () => {
    assert.equal(isBrowseUrlResponse({ data: { title: "Example" } }), false);
  });

  test("rejects a page whose named fields are not strings", () => {
    assert.equal(isBrowseUrlResponse({ success: true, data: { title: 42 } }), false);
  });

  test("rejects values that are not a response object", () => {
    [null, undefined, "ok", 7, []].forEach((value) => {
      assert.equal(isBrowseUrlResponse(value), false, `should reject ${JSON.stringify(value)}`);
    });
  });
});
