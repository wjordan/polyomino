"use strict";
var Polyomino_1 = require("./Polyomino");
var OneSidedPolyomino_1 = require("./OneSidedPolyomino");
var FreePolyomino_1 = require("./FreePolyomino");
module.exports = {
  get: function (order) {
    return Polyomino_1.Polyomino.get(order);
  },
  OneSided: function (order) {
    return OneSidedPolyomino_1.OneSidedPolyomino.get(order);
  },
  Free: function (order) {
    return FreePolyomino_1.FreePolyomino.get(order);
  }
};
