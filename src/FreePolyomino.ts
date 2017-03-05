import {Polyomino} from "./Polyomino";
//noinspection TsLint
import {Set} from "immutable";

export class FreePolyomino extends Polyomino {
  symmetries() {
    return this.reflections().flatMap(poly => poly.rotations()).toSet();
  }
}
