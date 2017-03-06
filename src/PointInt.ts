import {Iterable, Range, Set} from "immutable";
import {Point} from "./Point";

export class PointInt extends Point {
  public static ZERO: PointInt = new PointInt(0, 0);

  constructor(x: number, y: number) {
    //noinspection JSSuspiciousNameCombination
    super(Math.trunc(x), Math.trunc(y));
  }

  public range(): Iterable<number, Iterable<number, PointInt>> {
    return Range(0, this.y + 1).map((y) =>
        Range(0, this.x + 1).map((x) =>
          new PointInt(x, y),
    ));
  }

  public map<M>(f: (point: PointInt) => M): Iterable<number, Iterable<number, M>> {
    return this.range().
      map((y) => y.map((cell) => f(cell)));
  }

  public steps(): Set<PointInt> {
    return Set.of(1, -1).flatMap((z) =>
      this.xy((x) => x + z),
    ).toSet();
  }
}
