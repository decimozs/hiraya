import type { ASTNode } from "../lib/types";

export class Interpreter {
  interpret(ast: ASTNode[]): void {
    for (const node of ast) {
      this.evaluate(node);
    }
  }

  private symbolTable: Record<string, any> = {};

  private evaluate(node: ASTNode): any {
    switch (node.type) {
      case "VariableDeclaration":
        const value = this.evaluate(node.value);
        this.symbolTable[node.name] = value;
        return;
      case "PrintStatement":
        console.log(this.evaluate(node.value));
        break;
      case "BinaryExpression":
        const left = this.evaluate(node.left);
        const right = this.evaluate(node.right);
        if (node.operator === "+") {
          return left + right;
        }
        // Add more operators as needed
        break;
      case "StringLiteral":
        return node.value;
      case "NumberLiteral":
        return node.value;
    }
  }
}
