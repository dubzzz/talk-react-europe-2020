import { isSubstring } from "./isSubstring";
// isSubstring(text: string, word: string): boolean

test("should check if word is a substring of text", () => {
  expect(isSubstring("", "")).toBe(true);
  expect(isSubstring("ab", "ab")).toBe(true);
  expect(isSubstring("abcdef", "cd")).toBe(true);
  expect(isSubstring("abcdef", "ab")).toBe(true);
  expect(isSubstring("abcdef", "ef")).toBe(true);
  expect(isSubstring("abcdef", "abd")).toBe(false);
  expect(isSubstring("abcdef", "cef")).toBe(false);
});
