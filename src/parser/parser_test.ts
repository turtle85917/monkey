import Parser from ".";
import Lexer from "../lexer";

export function ParserTestcase() {
  // TODO: print 예약어 추가 // print는 console.log와 같은 동작.
  const input = `(1-5);`;
  const lexer = new Lexer(input);
  const parser = new Parser(lexer);
  const program = parser.parseProgram();

  // for (const statement of program.statements) {
  //   if (statement.children !== undefined) {
  //     console.log(`Infix exression '${statement.value?.value}' (${statement.value?.token.type})\n└ left expression='${statement.children?.[0].value?.value}' (${statement.children?.[0].value?.token.type})\n└ right expression='${statement.children?.[1].value?.value}' (${statement.children?.[1].value?.token.type})`);
  //   } else {
  //     console.log(`Variable '${statement.name?.value}' (${statement.name?.token.type}) value is '${statement.value?.value}' (${statement.value?.token.type})`);
  //   }
  //   console.log("\n\n");
  // }

  console.log(program.statements);
  // console.log("-- Children:");
  // console.log(program.statements[0].children);

  // for (const idx in program.statements) {
  //   const stmt = program.statements[+idx];
  //   console.log(stmt)
  //   // console.log(`${stmt.name ? `Variable '${stmt.name?.value}'(${stmt.name?.token.type}) v` : 'V'}alue is '${stmt.value?.value}'(${stmt.value?.token.type})`);
  // }
}
