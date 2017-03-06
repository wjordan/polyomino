import {Iterable, List, Repeat, Set} from "immutable";
import {PointInt} from "./PointInt";

export class Polyomino {
  public static get(order: number): Set<Polyomino> {
    return order === 1 ? this.MONO : this.grow(this.get(order - 1));
  }

  private static MONO: Set<Polyomino> = Set.of(new Polyomino(Set.of(new PointInt(0, 0))));

  // Grow a new higher-order polyomino set by adding an extra cell to every point in every direction.
  private static grow(polyominoes: Set<Polyomino>): Set<Polyomino> {
    return polyominoes.
      flatMap((poly) =>
        poly.points.flatMap((point) =>
          point.steps().
          filterNot((newPoint) => poly.points.includes(newPoint)).
          map((newPoint) => new this(poly.points.add(newPoint))),
      )).toSet();
  }

  constructor(public points: Set<PointInt>) {
    // Canonical form is the sorted-first element.
    this.points = this.symmetries().sort().first().points;
  }

  public toString(): string {
    return `{${this.points.sort().map((p) => p.toString()).join(", ")}}`;
  }

  // Two-dimensional visual representation of the polyomino.
  public render(): string {
    return this.xy((i) => i.max()).
      mapRange((point) => this.points.includes(point) ? "██" : "  ").
      map((row) => row.join("")).
      join("\n");
  }

  public equals(other: this): boolean {
    return this.points.equals(other.points);
  }

  public hashCode(): number {
    return this.points.hashCode();
  }

  public map(f: (point: PointInt) => PointInt): Polyomino {
    return new Polyomino(this.points.map(f).toSet());
  }

  // Apply a function to all points in x and y dimensions separately.
  public xy(f: (i: Iterable<PointInt, number>) => number): PointInt {
    return new PointInt(
      f(this.points.map((p) => p.x)),
      f(this.points.map((p) => p.y)),
    );
  }

  // Reduce a polyomino into canonical form by enumerating all symmetries.
  // Fixed polyominoes are distinct when none is a translation of another.
  public symmetries(): Set<Polyomino> {
    const min = this.xy((i) => i.min());
    const translatedPoints = this.points.map((p) => p.subtract(min)).toSet();
    return Set.of(this.points.equals(translatedPoints) ?
      this : new Polyomino(translatedPoints),
    );
  }

  public rotateLeft(): Polyomino {
    return this.map((p) => new PointInt(p.y, -p.x));
  }

  public rotations(): List<Polyomino> {
    return Repeat(null, 3).reduce(
      (r) => r.push(r.last().rotateLeft()),
      List.of(new Polyomino(this.points)),
    );
  }

  public reflections(): Set<Polyomino> {
    const reflect = Set.of(1, -1);
    return reflect.flatMap((i) => reflect.map((j) =>
      this.map((point) => point.scale(new PointInt(i, j))),
    )).toSet();
  }
}
