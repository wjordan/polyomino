import {Iterable, Range, Set} from "immutable";
import {Point} from "./Point";

export class PointInt extends Point {
  public static ZERO: PointInt = new PointInt(0, 0);

  constructor(x: number, y: number) {
    //noinspection JSSuspiciousNameCombination
    super(Math.trunc(x), Math.trunc(y));
  }

  public range(): Set<PointInt> {
    return Set<PointInt>(Range(0, this.x).flatMap((x) =>
      Range(0, this.y).map((y) =>
        new PointInt(x, y),
      ),
    ));
  }

  public rangeXY(): Iterable<number, Iterable<number, PointInt>> {
    return Range(0, this.y).map((y) =>
        Range(0, this.x).map((x) =>
          new PointInt(x, y),
    ));
  }

  public steps(): Set<PointInt> {
    return Set.of(1, -1).flatMap((z) =>
      this.xy((x) => x + z),
    ).toSet();
  }
}
