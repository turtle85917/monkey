import { Token } from "../token";

interface Program {
  statements: Statement[];
}

export class Identifier {
  token!: Token;
  value: string | number | null = null;

  constructor(token: Token, value: string) {
    this.token = token;
    this.value = this.modifyValue(value);
  }

  modifyValue(value: string): string | number {
    if (this.token.type === "INT") return Number(value);
    else return value;
  }

  tokenLiteral(): string {
    return this.token.literal;
  }
}

export class Statement {
  name: Identifier | null = null;
  value: Identifier | null = null;
  children: Statement[] = [];
}

export default class Ast implements Program {
  statements: Statement[] = [];
}
