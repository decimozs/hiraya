import type { Token, ASTNode } from "../lib/types";

export class Parser {
  private tokens: Token[];
  private currentIndex = 0;

  constructor(tokens: Token[]) {
    this.tokens = tokens;
  }

  private currentToken(): Token {
    return this.tokens[this.currentIndex];
  }

  private advance(): void {
    this.currentIndex++;
  }

  private isAtEnd(): boolean {
    return this.currentIndex >= this.tokens.length;
  }

  // Parse the program, handle print statements and other statements
  public parse(): ASTNode[] {
    const statements: ASTNode[] = [];
    while (!this.isAtEnd()) {
      statements.push(this.parseStatement());
    }
    return statements;
  }

  // Updated parseStatement method to handle semicolons and variable declarations
  private parseStatement(): ASTNode {
    const token = this.currentToken();

    // Handle variable declarations
    if (token.type === "KEYWORD" && token.value === "bagay") {
      this.advance(); // Move past 'bagay'

      // Variable name
      const nameToken = this.currentToken();
      if (nameToken.type !== "IDENTIFIER") {
        throw new Error(`Expected variable name, found: ${nameToken.value}`);
      }
      const name = nameToken.value;
      this.advance();

      // Expect '->'
      const arrowToken = this.currentToken();
      if (arrowToken.type !== "OPERATOR" || arrowToken.value !== "->") {
        throw new Error(`Expected '->', found: ${arrowToken.value}`);
      }
      this.advance();

      // Type (should be 'teksto' or 'bilang')
      const typeToken = this.currentToken();
      const validTypes = ["teksto", "bilang"];
      if (
        typeToken.type !== "DATATYPE" ||
        !validTypes.includes(typeToken.value)
      ) {
        throw new Error(
          `Expected valid data type (teksto or bilang), found: ${typeToken.value}`,
        );
      }
      const varType = typeToken.value;
      this.advance();

      // Expect '='
      const equalsToken = this.currentToken();
      if (equalsToken.type !== "OPERATOR" || equalsToken.value !== "=") {
        throw new Error(`Expected '=', found: ${equalsToken.value}`);
      }
      this.advance();

      // Value
      const value = this.parseExpression();

      // Check for semicolon at the end
      const semicolonToken = this.currentToken();
      if (
        semicolonToken &&
        semicolonToken.type === "OPERATOR" &&
        semicolonToken.value === ";"
      ) {
        this.advance(); // Consume semicolon
      } else {
        console.warn("Semicolon not found at the end of the statement.");
      }
      return {
        type: "VariableDeclaration",
        name,
        varType,
        value,
      };
    }

    // Fallback to other statement parsing
    throw new Error(`Unexpected token: ${token.value}`);
  }

  // Parse expressions, including binary operations
  private parseExpression(): ASTNode {
    let left = this.parsePrimary(); // Start with primary expressions (numbers, strings)

    while (!this.isAtEnd() && this.currentToken().type === "OPERATOR") {
      const operator = this.currentToken().value;
      if (operator === "+" || operator === "-") {
        this.advance(); // Move past the operator
        const right = this.parsePrimary(); // Parse the right-hand side expression
        left = { type: "BinaryExpression", operator, left, right };
      } else {
        break;
      }
    }

    return left;
  }

  // Parse primary expressions like numbers or strings
  private parsePrimary(): ASTNode {
    const token = this.currentToken();

    if (token.type === "NUMBER") {
      this.advance();
      return { type: "NumberLiteral", value: parseFloat(token.value) };
    } else if (token.type === "STRING") {
      this.advance();
      return { type: "StringLiteral", value: token.value };
    }

    throw new Error(`Unexpected token: ${token.value}`);
  }
}
