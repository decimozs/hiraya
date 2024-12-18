type TokenType =
  | "KEYWORD"
  | "IDENTIFIER"
  | "OPERATOR"
  | "STRING"
  | "NUMBER"
  | "WHITESPACE"
  | "UNKNOWN";

export interface Token {
  type: TokenType;
  value: string;
}
