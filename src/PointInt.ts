import {Point} from "./Point";
// noinspection ES6UnusedImports,TsLint
import * as Immutable from "immutable";
import Iterable = Immutable.Iterable;
import Range = Immutable.Range;
import Set = Immutable.Set;
import List = Immutable.List;
import Seq = Immutable.Seq;

export class PointInt extends Point {
  static ZERO:PointInt = new PointInt(0, 0);
  constructor(x:number, y:number) {
    // noinspection TsLint
    super(x|0,y|0);
  }
  range():Set<PointInt> {
    return Set<PointInt>(Range(0, this.x).flatMap(x =>
      Range(0, this.y).map(y =>
        new PointInt(x, y)
      )
    ));
  }
  rangeXY():Iterable<number, Iterable<number, PointInt>> {
    return Range(0, this.y).map(y =>
        Range(0, this.x).map(x => new PointInt(x, y))
    );
  }
  steps():Set<PointInt> {
    return Set.of(1, -1).flatMap(z => this.xy(x => x + z)).toSet();
  }
}
