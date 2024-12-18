type TokenType =
  | "KEYWORD"
  | "IDENTIFIER"
  | "OPERATOR"
  | "STRING"
  | "NUMBER"
  | "WHITESPACE"
  | "UNKNOWN"
  | "DATATYPE";

export interface Token {
  type: TokenType;
  value: string;
}

export type ASTNode =
  | { type: "PrintStatement"; value: ASTNode }
  | { type: "NumberLiteral"; value: number }
  | { type: "StringLiteral"; value: string }
  | {
      type: "BinaryExpression";
      operator: string;
      left: ASTNode;
      right: ASTNode;
    }
  | {
      type: "VariableDeclaration"; // New type for variable declarations
      name: string; // Variable name
      varType: string; // Declared type of the variable (e.g., "teksto")
      value: ASTNode; // The initial value of the variable
    };
