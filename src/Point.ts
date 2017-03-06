import {Iterable, List, Set} from "immutable";

export class Point {
  public static ZERO: Point = new Point(0, 0);
  public static XY: Set<number> = Set.of(0, 1);

  constructor(public x: number, public y: number) {}
  public create(x: number, y: number): this {
    //noinspection JSPotentiallyInvalidConstructorUsage
    return new (this as any).constructor(x, y);
  }

  public toString(): string { return `[${this.x}, ${this.y}]`; }
  public equals(other: this): boolean { return this.x === other.x && this.y === other.y; }
  public hashCode(): number { return this.x * 31 + this.y; }

  public toArray(): [number, number] { return [this.x, this.y]; }
  public toList(): List<number> { return List(this.toArray()); }
  public fromArray(xy: number[]): this { return this.create(xy[0], xy[1]); }
  public update(index: number, updater: (value: number) => number): this {
    return this.fromList(this.toList().update(index, undefined, (val) => updater(val)));
  }
  public fromList(p: Iterable<number, number>): this { return this.fromArray(p.toArray()); }

  // Apply a unary operation to both x and y, returning a new Point.
  public applyBoth(f: (i: number) => number): this {
    return Point.XY.reduce((val: this, index) => val.update(index, f), this.create(this.x, this.y));
  }

  // Apply a unary operation to x and y separately, returning a List of the resulting objects.
  public xy(f: (i: number) => number): List<this> {
    return Point.XY.map((i) => this.update(i, f)).toList();
  }

  // Apply a binary operation with another Point.
  public apply(other: this, f: (a: number, b: number) => number): this {
    return this.create(f(this.x, other.x), f(this.y, other.y));
  }

  public add(p: this): this { return this.apply(p, (a, b) => a + b); }
  public subtract(p: this): this { return this.apply(p, (a, b) => a - b); }
  public scale(p: this): this { return this.apply(p, (a, b) => a * b); }
}
