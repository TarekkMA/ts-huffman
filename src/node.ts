export class Node {
  constructor(
    readonly freq: number,
    readonly text: string,
    readonly left?: Node,
    readonly right?: Node
  ) {}
}
