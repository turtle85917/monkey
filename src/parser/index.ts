import Ast, { Identifier, Statement } from "../ast";
import Lexer from "../lexer";
import { Token, TokenType } from "../token/token";

export default class Parser {
  lexer: Lexer;
  curToken: Token = {type:'', literal:''};
  peekToken: Token = {type:'', literal:''};

  constructor(l: Lexer) {
    this.lexer = l;
    this.nextToken();
    this.nextToken();
  }

  nextToken() {
    this.curToken = this.peekToken;
    this.peekToken = this.lexer.nextToken();
  }

  parseProgram() {
    const program = new Ast();
    program.statements = [];
    
    while (this.curToken.type !== "EOF") {
      const stmt = this.parseStatement();
      if (stmt !== null) program.statements.push(stmt);
      this.nextToken();
    }

    return program;
  }

  parseStatement() {
    switch (this.curToken.type) {
      case "LET":
        return this.parseLetStatement();
      case "SEMICOLON":
        return this.processSemicolon();
      default:
        return null;
    }
  }

  parseLetStatement() {
    const statement = new Statement();
    if (!this.expectPeek("IDENT")) return null;

    statement.name = new Identifier(this.curToken, this.curToken.literal);
    if (!this.expectPeek("ASSIGN")) return null;

    // TODO: 세미콜론을 만날 때까지 표현식을 건너뛴다.

    statement.value = new Identifier(this.peekToken, this.peekToken.literal);
    while (this.peekTokenIs("SEMICOLON")) this.nextToken();
    return statement;
  }

  processSemicolon() {
    const statement = new Statement();
    if (!["INT", "STRING"].some(type => this.peekTokenIs(type))) return null;

    statement.value = new Identifier(this.peekToken, this.peekToken.literal);
    return statement;
  }

  curTokenIs(token: TokenType): boolean {
    return this.curToken.type === token;
  }

  peekTokenIs(token: TokenType): boolean {
    return this.peekToken.type === token;
  }

  expectPeek(token: TokenType): boolean {
    if (this.peekTokenIs(token)) {
      this.nextToken();
      return true;
    } else return false;
  }
}
