import {Iterable, List, Range, Set} from "immutable";

export class Point {
  constructor(public x: number, public y: number) {}

  public create(this: any, x: number, y: number): this {
    return new this.constructor(x, y);
  }

  public toString(): string { return `[${this.x}, ${this.y}]`; }

  public equals(other: this): boolean {
    return this.x === other.x &&
      this.y === other.y;
  }

  public hashCode(): number {
    return this.x * 31 + this.y;
  }

  // Apply a unary operation to both x and y, returning a new Point.
  public applyXY(f: (i: number) => number): this {
    return this.create(
      f(this.x),
      f(this.y),
    );
  }

  // Apply a binary operation with another Point to both x and y.
  public apply(other: this, f: (a: number, b: number) => number): this {
    return this.create(
      f(this.x, other.x),
      f(this.y, other.y),
    );
  }

  public add(p: this): this { return this.apply(p, (a, b) => a + b); }
  public subtract(p: this): this { return this.apply(p, (a, b) => a - b); }
  public scale(p: this): this { return this.apply(p, (a, b) => a * b); }

  public range(): Iterable<number, Iterable<number, this>> {
    return Range(0, this.y + 1).map((y) =>
      Range(0, this.x + 1).map((x) =>
        this.create(x, y),
      ));
  }

  public mapRange<M>(f: (point: this) => M): Iterable<number, Iterable<number, M>> {
    return this.range().
      map((y) => y.map((cell) => f(cell)));
  }

  // Apply a unary operation to x and y separately, returning a List of the resulting Points.
  public xy(f: (i: number) => number): List<this> {
    return List.of(
      this.create(f(this.x), this.y),
      this.create(this.x, f(this.y)),
    );
  }

  public steps(): Set<this> {
    return Set.of(1, -1).flatMap((z) =>
      this.xy((i) => i + z),
    ).toSet();
  }
}
