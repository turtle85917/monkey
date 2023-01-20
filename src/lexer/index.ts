import { Identifier, Statement } from "../ast";
import { ETokens, keywords, Token, TokenType } from "../token";

export default class Lexer {
  ch: string = '';
  input: string = '';
  position: number = 0;
  readPosition: number = 0;
  statements: Statement[] = [];

  constructor(input: string) {
    this.input = input;
    this.readChar();
  }

  lexing() {
    while (this.readPosition <= this.input.length) {
      const tok = this.nextToken();
      const statement = new Statement();
      statement.value = new Identifier(tok, tok.literal);
      this.statements.push(statement);
    }
  }

  readChar() {
    if (this.readPosition >= this.input.length) {
      this.ch = '0';
    } else  {
      this.ch = this.input[this.readPosition];
    }
    this.position = this.readPosition;
    this.readPosition++;
  }

  nextToken() {
    let tok!: Token;
    this.skipWhitespace();
    switch (this.ch) {
      case '=':
        if (this.peekChar() === '=') { // ==
          const ch = this.ch;
          this.readChar();
          const literal = `${ch}${this.ch}`;
          tok = this.newToken("EQ", literal);
        } else tok = this.newToken("ASSIGN", this.ch);
        break;
      case '+':
        tok = this.newToken("PLUS", this.ch);
        break;
      case '-':
        tok = this.newToken("MINUS", this.ch);
        break;
      case '!':
        if (this.peekChar() === '=') { // !=
          const ch = this.ch;
          this.readChar();
          const literal = `${ch}${this.ch}`;
          tok = this.newToken("NOT_EQ", literal);
        } else tok = this.newToken("BANG", this.ch);
        break;
      case '/':
        tok = this.newToken("SLASH", this.ch);
        break;
      case '*':
        tok = this.newToken("ASTERISK", this.ch);
        break;
      case '<':
        tok = this.newToken("LT", this.ch);
        break;
      case '>':
        tok = this.newToken("GT", this.ch);
        break;
      case ';':
        tok = this.newToken("SEMICOLON", this.ch);
        break;
      case ',':
        tok = this.newToken("COMMA", this.ch);
        break;
      case '.':
        tok = this.newToken("DOT", this.ch);
        break;
      case '"':
      case '\'':
        const token = this.ch;
        this.readChar();
        const position = this.position;
        while (this.ch !== token) this.readChar();
        tok = this.newToken("STRING", this.input.slice(position, this.position));
        break;
      case '(':
        tok = this.newToken("LPAREN", this.ch);
        break;
      case ')':
        tok = this.newToken("RPAREN", this.ch);
        break;
      case '{':
        tok = this.newToken("LBRACE", this.ch);
        break;
      case '}':
        tok = this.newToken("RBRACE", this.ch);
        break;
      case '0':
        tok = this.newToken("EOF", '');
        break;
      default:
        if (this.isLetter(this.ch)) {
          const literal = this.readIdentifier();
          tok = this.newToken(this.lookupIdent(literal), literal);
          return tok;
        } else if (this.isDigit(this.ch)) {
          tok = this.newToken("INT", this.readNumber());
          return tok;
        } else {
          tok = this.newToken(ETokens.ILLEGAL, this.ch);
        }
        break;
    }
    this.readChar();

    return tok;
  }

  isLetter(ch: string): boolean {
    return 'a' <= ch && ch <= 'z' || 'A' <= ch && ch <= 'Z' || ch === '_';
  }

  isDigit(ch: string): boolean {
    return '0' <= ch && ch <= '9';
  }

  private peekChar(): any {
    if (this.readPosition >= this.input.length) return 0;
    else return this.input[this.readPosition];
  }

  private skipWhitespace() {
    while (this.ch === ' ' || this.ch === "\t" || this.ch === "\n" || this.ch === "\r") this.readChar();
  }

  private readIdentifier(): string {
    const position = this.position;
    while (this.isLetter(this.ch)) this.readChar();
    return this.input.slice(position, this.position);
  }

  private readNumber(): string {
    const position = this.position;
    while (this.isDigit(this.ch)) this.readChar();
    console.log()
    return this.input.slice(position, this.position);
  }

  private lookupIdent(ident: string) {
    const tok = keywords[ident];
    if (tok !== undefined) return tok;
    return ETokens.IDENT;
  }

  newToken(tokenType: TokenType, ch: string): Token {
    return { type: tokenType, literal: ch };
  }
}
