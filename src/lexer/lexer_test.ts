import { Token } from "../token/token";
import Lexer from ".";

export function testNextToken() {
  const input = `let five = 5;
let ten = 10;

let add = function(x, y) {
  x + y;
};`;
  const tests: Token[] = [
    { type: "LET", literal: "let" },
    { type: "IDENT", literal: "five" },
    { type: "ASSIGN", literal: "=" },
    { type: "INT", literal: "5" },
    { type: "SEMICOLON", literal: ";" },
    { type: "LET", literal: "let" },
    { type: "IDENT", literal: "ten" },
    { type: "ASSIGN", literal: "=" },
    { type: "INT", literal: "10" },
    { type: "SEMICOLON", literal: ";" },
    { type: "LET", literal: "let" },
    { type: "IDENT", literal: "add" },
    { type: "ASSIGN", literal: "=" },
    { type: "FUNCTION", literal: "function" },
    { type: "LPAREN", literal: "(" },
    { type: "IDENT", literal: "x" },
    { type: "COMMA", literal: "," },
    { type: "IDENT", literal: "y" },
    { type: "RPAREN", literal: ")" },
    { type: "LBRACE", literal: "{" },
    { type: "IDENT", literal: "x" },
    { type: "PLUS", literal: "+" },
    { type: "IDENT", literal: "y" },
    { type: "SEMICOLON", literal: ";" },
    { type: "RBRACE", literal: "}" },
    { type: "SEMICOLON", literal: ";" },
  ];

  const lexer = new Lexer(input);
  for (const index in Object.entries(tests)) {
    const tt  = tests[index];
    const tok = lexer.nextToken();
    if (tok.type != tt.type) console.log(`tests[${index}] - tokentype wrong. expected='${tt.type}', got='${tok.type}'`);
    if (tok.literal != tt.literal) console.log(`tests[${index}] - literal wrong. expected='${tt.literal}', got='${tok.literal}'`);
  }
}
