import {Set} from "immutable";
import {Polyomino} from "./Polyomino";

export class FreePolyomino extends Polyomino {
  public symmetries(): Set<Polyomino> {
    return this.reflections().flatMap((poly) => poly.rotations()).toSet();
  }
}
