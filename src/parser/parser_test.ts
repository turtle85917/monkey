import Parser from ".";
import Lexer from "../lexer";

export default function testLetStatement() {
  const input = `let x = 5;
let a1 = 10;
let foo = "Hello, World!";
let bar = 'A';

"Test message.";
5;`;
  const lexer = new Lexer(input);
  const parser = new Parser(lexer);
  const program = parser.parseProgram();

  for (const idx in program.statements) {
    const stmt = program.statements[+idx];
    console.log(`${stmt.name ? `Variable '${stmt.name?.value}'(${stmt.name?.token.type}) v` : 'V'}alue is '${stmt.value?.value}'(${stmt.value?.token.type})`);
  }
}
