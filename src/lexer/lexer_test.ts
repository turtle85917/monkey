import { Token } from "../token/token";
import Lexer from ".";

export function LexerTestcase() {
  const input = `"Hello(), World!";
let fn = function(x, y) {
  return x + y;
};
let one = 1;
one + one;`;
  const tests: Token[] = [
    { type: "LET", literal: "let" },
    { type: "IDENT", literal: "five" },
    { type: "ASSIGN", literal: "=" },
    { type: "INT", literal: "5" },
    { type: "SEMICOLON", literal: ";" }
  ];

  const lexer = new Lexer(input);
  lexer.lexing();
  console.log(lexer.statements)
  // for (let i = 0; i < testcaseCount; i++) {
  //   const tok = lexer.nextToken();
  //   console.log(`input[${i}] - ${tok.literal} '${tok.type}'`);
  // }
  // for (const index in Object.entries(tests)) {
  //   const tt  = tests[index];
  //   const tok = lexer.nextToken();
  //   if (tok.type != tt.type) console.log(`tests[${index}] - tokentype wrong. expected='${tt.type}', got='${tok.type}'`);
  //   if (tok.literal != tt.literal) console.log(`tests[${index}] - literal wrong. expected='${tt.literal}', got='${tok.literal}'`);
  // }
}
