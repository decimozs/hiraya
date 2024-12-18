import type { Token } from "../lib/types";
import { Lexer } from "../lexer/tokenizer";
import { expect, test } from "bun:test";

// Test: Lexing a simple string
test("should tokenize a string literal", () => {
  const lexer = new Lexer('"Hello, World!"');
  const tokens: Token[] = lexer.tokenize();
  expect(tokens).toEqual([{ type: "STRING", value: "Hello, World!" }]);
});

// Test: Lexing a number
test("should tokenize a number", () => {
  const lexer = new Lexer("12345");
  const tokens: Token[] = lexer.tokenize();
  expect(tokens).toEqual([{ type: "NUMBER", value: "12345" }]);
});

// Test: Lexing multiple tokens (string, number, operator)
test("should tokenize multiple tokens", () => {
  const lexer = new Lexer('"Hello" 42 =');
  const tokens: Token[] = lexer.tokenize();
  expect(tokens).toEqual([
    { type: "STRING", value: "Hello" },
    { type: "NUMBER", value: "42" },
    { type: "OPERATOR", value: "=" },
  ]);
});

// Test: Lexing a keyword
test("should tokenize a keyword", () => {
  const lexer = new Lexer("bagay");
  const tokens: Token[] = lexer.tokenize();
  expect(tokens).toEqual([{ type: "KEYWORD", value: "bagay" }]);
});

// Test: Lexing an identifier
test("should tokenize an identifier", () => {
  const lexer = new Lexer("myVariable");
  const tokens: Token[] = lexer.tokenize();
  expect(tokens).toEqual([{ type: "IDENTIFIER", value: "myVariable" }]);
});

// Test: Lexing a complex input
test("should tokenize a complex input", () => {
  const lexer = new Lexer('"Hello" 123 ->');
  const tokens: Token[] = lexer.tokenize();
  expect(tokens).toEqual([
    { type: "STRING", value: "Hello" },
    { type: "NUMBER", value: "123" },
    { type: "OPERATOR", value: "->" },
  ]);
});

// Test: Handling whitespace
test("should skip whitespace", () => {
  const lexer = new Lexer("  \n\tbagay  \t teksto");
  const tokens: Token[] = lexer.tokenize();
  expect(tokens).toEqual([
    { type: "KEYWORD", value: "bagay" },
    { type: "KEYWORD", value: "teksto" },
  ]);
});

// Test: Lexing an unknown character
test("should tokenize unknown character", () => {
  const lexer = new Lexer("@");
  const tokens: Token[] = lexer.tokenize();
  expect(tokens).toEqual([{ type: "UNKNOWN", value: "@" }]);
});

// Test: Lexing with empty input
test("should handle empty input", () => {
  const lexer = new Lexer("");
  const tokens: Token[] = lexer.tokenize();
  expect(tokens).toEqual([]);
});
