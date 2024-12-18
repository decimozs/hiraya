import type { Token } from "../lib/types";

/**
 * A simple lexical analyzer (lexer) that tokenizes a string input.
 * The lexer processes the input source string character by character
 * and generates tokens representing various language constructs such as
 * strings, numbers, keywords, operators, and unknown characters.
 */
export class Lexer {
  private source: string = "";
  private currentPosition = 0;

  /**
   * Constructs a new Lexer instance with the provided source string.
   * @param {string} source - The input string to be tokenized.
   */
  constructor(source: string) {
    this.source = source;
    this.currentPosition = 0;
  }

  /**
   * Returns the current character being processed by the lexer.
   * @returns {string} - The current character at the lexer position or an empty string if at the end of the input.
   */
  public currentCharacter(): string {
    return this.currentPosition < this.source.length
      ? this.source[this.currentPosition]
      : "";
  }

  /**
   * Advances the lexer by one character, moving the current position forward.
   */
  public advance(): void {
    this.currentPosition++;
  }

  /**
   * Skips any whitespace characters (spaces, newlines, tabs) in the input string.
   */
  public skipWhitespace(): void {
    while (
      this.currentCharacter() === " " ||
      this.currentCharacter() === "\n" ||
      this.currentCharacter() === "\t"
    ) {
      this.currentCharacter(), this.advance();
    }
  }

  /**
   * Reads a string literal, starting with a quote character and ending with a closing quote.
   * @returns {string} - The string literal without the surrounding quotes.
   */
  public readString(): string {
    this.advance(); // Skip the opening quote
    let result: string = "";

    // Read until the closing quote is encountered
    while (
      this.currentCharacter() !== '"' &&
      this.currentCharacter !== undefined
    ) {
      result += this.currentCharacter();
      this.advance();
    }

    this.advance(); // Skip the closing quote
    return result;
  }

  /**
   * Reads a number literal from the input string.
   * @returns {string} - The number as a string.
   */
  public readNumber(): string {
    let result: string = "";

    // Continue reading while the current character is a digit
    while (/\d/.test(this.currentCharacter())) {
      result += this.currentCharacter();
      this.advance();
    }

    return result;
  }

  /**
   * Checks whether a given identifier is a keyword.
   * @param {string} identifier - The identifier to check.
   * @returns {boolean} - True if the identifier is a keyword, false otherwise.
   */
  public isKeyword(identifier: string): boolean {
    const keywords = ["bagay", "teksto", "bilang", "ipakita"];
    return keywords.includes(identifier);
  }

  /**
   * Tokenizes the entire input string and returns an array of tokens.
   * The lexer processes the string and generates tokens for strings, numbers,
   * keywords, operators, and unknown characters.
   * @returns {Token[]} - An array of tokens representing the lexeme components of the input string.
   */
  public tokenize(): Token[] {
    const tokens: Token[] = [];

    // Continue tokenizing until the end of the input string
    while (this.currentPosition < this.source.length) {
      this.skipWhitespace();

      const char = this.currentCharacter();

      if (char === '"') {
        // String literal
        tokens.push({
          type: "STRING",
          value: this.readString(),
        });
      } else if (/\d/.test(char)) {
        // Number (Integer)
        tokens.push({
          type: "NUMBER",
          value: this.readNumber(),
        });
      } else if (/[a-zA-Z_]/.test(char)) {
        // Identifier or keyword
        let identifier = "";
        while (/[a-zA-Z_0-9]/.test(this.currentCharacter())) {
          identifier += this.currentCharacter();
          this.advance();
        }
        tokens.push({
          type: this.isKeyword(identifier) ? "KEYWORD" : "IDENTIFIER",
          value: identifier,
        });
      } else if (char === "=") {
        // Single character operator
        tokens.push({
          type: "OPERATOR",
          value: "=",
        });
        this.advance();
      } else if (
        char === "-" &&
        this.source[this.currentPosition + 1] === ">"
      ) {
        // Multi-character operator (->)
        tokens.push({
          type: "OPERATOR",
          value: "->",
        });
        this.advance(); // Skip over the '-'
        this.advance(); // Skip over the '>'
      } else {
        // Unknown character
        tokens.push({
          type: "UNKNOWN",
          value: char,
        });
        this.advance();
      }
    }

    return tokens;
  }
}
