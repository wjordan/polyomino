import { expect } from "chai";
import {FreePolyomino, OneSidedPolyomino, Polyomino} from "../src";

describe("Polyomino", () => {
  it("equals", () => {
    const tetromino = Polyomino.get(4).first();
    expect(tetromino.equals(tetromino)).to.be.true;
  });

  it("render", () => {
    const renderString = `
██    
██████
`.trim();
    expect(Polyomino.get(4).first().render()).to.equal(renderString);
  });

  describe("Enumerate polyominoes", () => {
    it("should enumerate the fixed polyominoes", () => {
      const fixedTetrominoes = Polyomino.get(4);
      expect(fixedTetrominoes.size).to.equal(19);
    });

    it("should enumerate the free polyominoes", () => {
      const freeTetrominoes = FreePolyomino.get(4);
      expect(freeTetrominoes.size).to.equal(5);
    });

    it("should enumerate the one-sided polyominoes", () => {
      const oneSidedTetrominoes = OneSidedPolyomino.get(4);
      expect(oneSidedTetrominoes.size).to.equal(7);
    });

    it("should apply offsets consistently", () => {
      const rotations = OneSidedPolyomino.get(4).toList().flatMap((poly) => poly.rotations());
      expect(rotations.size).to.equal(28);
    });
  });
});
