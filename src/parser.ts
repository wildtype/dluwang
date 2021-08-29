import creole from 'npm-creole';

interface ParserOption {}

export default class Parser {
  creoleParser: creole;

  constructor(options: ParserOption) {
    this.creoleParser = new creole(options);
  }

  parse(resultElement: HTMLElement, source: string) {
    this.creoleParser.parse(resultElement, source);
  }
}
