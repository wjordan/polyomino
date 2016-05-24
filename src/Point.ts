import * as Immutable from "immutable";
import Iterable = Immutable.Iterable;
import List = Immutable.List;
import Set = Immutable.Set;

export class Point {
  static XY:Set<number> = Set.of(0, 1);
  static fromArray(xy:number[]):Point { return new Point(xy[0], xy[1]); }
  static fromList(p:List<number>):Point { return Point.fromArray(p.toArray()); }

  constructor(public x:number, public y:number) {}
  create(x:number, y:number):this { return new (<any>this).constructor(x, y); }

  toString():string { return `[${this.x}, ${this.y}]`; }
  equals(other:this):boolean { return this.x === other.x && this.y === other.y; }
  hashCode():number { return this.x * 31 + this.y; }

  toArray():[number, number] { return [this.x, this.y]; }
  toList():List<number> { return List(this.toArray()); }
  fromArray(xy:number[]):this { return this.create(xy[0], xy[1]); }
  update(index:number, updater:(value:number) => number):this {
    return this.fromList(this.toList().update(index, undefined, val => updater(val)));
  }
  fromList(p:Iterable<number, number>):this { return this.fromArray(p.toArray()); }

  // Apply a unary operation to both x and y, returning a new Point.
  applyBoth(f:(i:number) => number):this {
    return Set.of(0, 1).reduce((val:this, index) => val.update(index, f), this.create(this.x, this.y));
  }

  // Apply a unary operation to x and y separately, returning a List of the resulting objects.
  xy(f:(i:number) => number):List<this> {
    return Point.XY.map(i => this.update(i, f)).toList();
  }

  // Apply a binary operation with another Point.
  apply(other:this, f:(a:number, b:number) => number):this {
    return this.create(f(this.x, other.x), f(this.y, other.y));
  }

  add(p:this):this { return this.apply(p, (a, b) => a + b); }
  subtract(p:this):this { return this.apply(p, (a, b) => a - b); }
  scale(p:this):this { return this.apply(p, (a, b) => a * b); }
}
