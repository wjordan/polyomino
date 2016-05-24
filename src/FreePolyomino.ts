import {Polyomino} from "./Polyomino";
export class FreePolyomino extends Polyomino {
  symmetries() {
    return this.reflections().flatMap(poly => poly.rotations()).toSet();
  }
}
