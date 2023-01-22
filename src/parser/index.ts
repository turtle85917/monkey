import Ast, { Identifier, Statement } from "../ast";
import Lexer from "../lexer";
import { Token, TokenType } from "../token";

export default class Parser {
  lexer: Lexer;
  position: number = 0;
  curToken!: Statement;
  peekToken!: Statement;

  constructor(l: Lexer) {
    this.lexer = l;
    this.lexer.lexing();
    this.curToken = this.lexer.statements[0];
    this.peekToken = this.lexer.statements[1];
    this.position++;
  }

  nextToken() {
    this.curToken = this.lexer.statements[this.position];
    this.peekToken = this.lexer.statements[this.position+1];
    this.position++;
  }

  parseProgram() {
    const program = new Ast();
    program.statements = [];
    
    while (this.curToken !== undefined && this.peekToken !== undefined) {
      const stmt = this.parseStatement();
      if (stmt !== null) program.statements.push(stmt);
      this.nextToken();
    }

    return program;
  }

  private parseStatement() {
    switch (this.curToken.value?.token.type) {
      case "LET":
        return this.parseLetStatement();
      case "PLUS" || "MINUS" || "ASTERISK":
        return this.parseCalcStatement();
      case "SEMICOLON":
        return this.processSemicolon();
      default:
        return null;
    }
  }

  private parseLetStatement() {
    const statement = new Statement();
    if (!this.expectPeek("IDENT")) return null;

    statement.name = new Identifier(this.curToken.value!.token, this.curToken.value!.token.literal);
    if (!this.expectPeek("ASSIGN")) return null;

    // TODO: 세미콜론을 만날 때까지 표현식을 건너뛴다.

    statement.value = new Identifier(this.peekToken.value!.token, this.peekToken.value!.token.literal);
    while (this.peekTokenIs("SEMICOLON")) this.nextToken();
    return statement;
  }

  private returnIntStatement() {
    if (this.curTokenIs("INT")) {
      return this.newStatement(null, this.curToken.value!.token);
    }

    return null;
  }

  // TODO: 재귀로 활용
  private parseCalcStatement() {
    const left = this.prevToken();
    if (left === null) return null;
    if (left.value?.token.type !== this.peekToken.value?.token.type) return null;

    const leftStatement = left.value?.token.type === "LPAREN" ? this.parseParenStatement() : this.returnIntStatement(); // 타입이 INT일 경우 // 아니라면 괄호식
    const rightStatement = this.returnIntStatement();

    console.log(leftStatement)

    // leftStatement.value = new Identifier(left.value!.token, left.value!.token.literal);
    // rightStatement.value = new Identifier(this.peekToken.value!.token, this.peekToken.value!.token.literal);
    // statement.value = new Identifier(this.curToken.value!.token, this.curToken.value!.token.literal);
    // statement.children = [leftStatement, rightStatement];

    this.nextToken();
    this.nextToken();

    return this.newStatement(this.curToken.value!.token);
  }

  // TODO: if문 식의 컨디션 및 함수의 인자 목록으로 인식하게 하기
  private parseParenStatement(): Statement | null {
    let statement: Statement | null = null;
    while (!this.curTokenIs("BPAREN")) {
      this.nextToken();
      switch (this.curToken.value?.token.type) {
        case "LPAREN":
          statement = this.parseParenStatement();
        case "PLUS" || "MINUS" || "ASTERISK":
          statement = this.parseCalcStatement();
        case "INT":
          statement = this.returnIntStatement();
      }
    }
    
    return statement;
  }

  private processSemicolon() {
    const statement = new Statement();
    if (!["INT", "STRING"].some(type => this.peekTokenIs(type))) return null;

    statement.value = new Identifier(this.peekToken.value!.token, this.peekToken.value!.token.literal);
    return statement;
  }

  private prevToken() {
    if (this.position > 1) return this.lexer.statements[this.position-2];
    return null;
  }

  private curTokenIs(token: TokenType): boolean {
    return this.curToken.value?.token.type === token;
  }

  private peekTokenIs(token: TokenType): boolean {
    return this.peekToken?.value?.token.type === token;
  }

  private expectPeek(token: TokenType): boolean {
    if (this.peekTokenIs(token)) {
      this.nextToken();
      return true;
    } else return false;
  }

  private newStatement(ntoken: Token | null, ...vtokens: Token[]) {
    const statement = new Statement();
    statement.name = ntoken === null ? null : new Identifier(ntoken, ntoken.literal);
    vtokens.length === 1
      ? statement.value = new Identifier(vtokens[0], vtokens[0].literal)
      : vtokens.forEach(vtoken => statement.children.push(this.newStatement(null, vtoken)));

    return statement;
  }
}
