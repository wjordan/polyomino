// noinspection TsLint,ES6UnusedImports
import {List, Range, Set} from "immutable";
import {PointInt} from "./PointInt";

export class Polyomino {
  public static get(order: number): Set<Polyomino> {
    return order === 1 ? this.MONO : this.grow(this.get(order - 1));
  }

  private static MONO: Set<Polyomino> = Set.of(new Polyomino(Set.of(PointInt.ZERO)));

  // Grow a new higher-order polyomino set by adding an extra cell.
  private static grow(polyominoes: Set<Polyomino>): Set<Polyomino> {
    return Set<Polyomino>(polyominoes.flatMap((poly) =>
      poly.points.flatMap((point) =>
        point.steps().filterNot((p) =>
          poly.points.includes(p),
        ).map((p) =>
          new this(poly.points.add(p)),
        ))));
  }

  constructor(public points: Set<PointInt>) {
    // Canonical form is the sorted-first element.
    this.points = this.symmetries().sort().first().points;
  }

  public toString(): string {
    return `{${this.points.sort().map((p) => p.toString()).join(", ")}}`;
  }

  // Visual 2d representation of the polyomino.
  public toString2(): string {
    return new PointInt(
      this.points.maxBy((p) => p.x).x + 1,
      this.points.maxBy((p) => p.y).y + 1,
    ).rangeXY().map((row) => row.map((col) => this.points.includes(col) ? "██" : "  ").join("")).join("\n");
  }

  public equals(other: this): boolean {
    return this.points.equals(other.points);
  }

  public hashCode(): number {
    return this.points.hashCode();
  }

  public transform(f: (point: PointInt) => PointInt): Polyomino {
    return new Polyomino(this.points.map(f).toSet());
  }

  // Reduce a polyomino into canonical form by enumerating all symmetries.
  // Fixed polyominoes are distinct when none is a translation of another.
  public symmetries(): Set<Polyomino> {
    const min: PointInt = new PointInt(this.points.minBy((p) => p.x).x, this.points.minBy((p) => p.y).y);
    const translatedPoints: Set<PointInt> = this.points.map((p) => p.subtract(min)).toSet();
    return Set.of(this.points.equals(translatedPoints) ?
      this : new Polyomino(translatedPoints),
    );
  }

  public rotateLeft(): Polyomino {
    return this.transform((p) => new PointInt(p.y, -p.x));
  }

  public rotations(): Set<Polyomino> {
    return Range(0, 3).reduce(
      (r) => r.add(r.last().rotateLeft()),
      Set.of(new Polyomino(this.points)),
    );
  }

  public rotationsWithDuplicates(): List<Polyomino> {
    return Range(0, 3).reduce(
      (r) => r.push(r.last().rotateLeft()),
      List.of(new Polyomino(this.points)),
    );
  }

  public reflections(): Set<Polyomino> {
    return List.of(1, -1).flatMap((i) => List.of(1, -1).map((j) =>
      this.transform((point) => point.scale(new PointInt(i, j))),
    )).toSet();
  }
}
