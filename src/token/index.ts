export type TokenType = string;
export interface Token {
  type: TokenType;
  literal: string;
};

export enum ETokens {
  "ILLEGAL" = "ILLEGAL",
  "EOF" = "EOF",

  // 식별자 + 리터럴
  "IDENT" = "IDENT",
  "INT" = "INT",
  "STRING" = "STRING",
  
  // 연산자
  "ASSIGN" = '=',
  "PLUS" = '+',
  "MINUS" = '-',
  "BANG" = '!',
  "ASTERISK" = '*',
  "SLASH" = '/',

  "LT" = '<',
  "GT" = '>',

  // 구분자
  "COMMA" = ',',
  "DOT" = '.',
  "SEMICOLON" = ';',
  "QUOTATION" = '"',
  "APOSTROPHE" = '\'',

  "LPAREN" = '(',
  "RPAREN" = ')',
  "LBRACKET" = '{',
  "RBRACKET" = '}',
  "LBRACE" = '[',
  "RBRACE" = ']',

  // 불 연산
  "EQ" = "==",
  "NOT_EQ" = "!=",

  // 예약어
  "FUNCTION" = "FUNCTION",
  "LET" = "LET",
  "TRUE" = "TRUE",
  "FALSE" = "FALSE",
  "IF" = "IF",
  "ELSE" = "ELSE",
  "RETURN" = "RETURN",
};

export const keywords = {
  "function": ETokens.FUNCTION,
  "let": ETokens.LET,
  "true": ETokens.TRUE,
  "false": ETokens.FALSE,
  "if": ETokens.IF,
  "else": ETokens.ELSE,
  "return": ETokens.RETURN
} as { [keyword: string]: string; };
