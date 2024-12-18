import * as fs from "fs";
import { Lexer } from "./lexer/tokenizer";
import { Parser } from "./parser/parser";
import { Interpreter } from "./interpreter/interpreter";

try {
  // Step 1: Read the input file
  const filePath = "./samples/main.hry";
  const sourceCode = fs.readFileSync(filePath, "utf-8");

  // Step 2: Tokenize
  const lexer = new Lexer(sourceCode);
  const tokens = lexer.tokenize();

  console.log(tokens);

  // Step 3: Parse
  const parser = new Parser(tokens);
  const ast = parser.parse();

  // Step 4: Interpret
  const interpreter = new Interpreter();
  interpreter.interpret(ast);
} catch (error) {
  console.error("Error:", error);
}
