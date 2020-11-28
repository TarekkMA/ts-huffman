export class PriorityQueue<T> {
  private data: T[] = [];

  constructor(private readonly compareFn: (a: T, b: T) => number) {}

  public get size(): number {
    return this.data.length;
  }

  public insert(item: T): void {
    this.data.push(item);
    this.data.sort(this.compareFn);
  }

  public pop(): T {
    return this.data.pop()!!;
  }
}
