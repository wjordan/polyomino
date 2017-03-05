# polyomino

node.js library for working with all kinds of [polyominoes](https://en.wikipedia.org/wiki/Polyomino).

```
npm install polyomino
```

## API

[Free, one-sided and fixed polyominoes](https://en.wikipedia.org/wiki/Polyomino#Free.2C_one-sided.2C_and_fixed_polyominoes) are all supported:

- `get(n)`: return a [Set](https://facebook.github.io/immutable-js/docs/#/Set) of fixed polyominoes of order `n`.
- `OneSided(n)`: return a Set of one-sided polyominoes of order `n`.
- `Free(n)`: return a Set of free polyominoes of order `n`.

## Examples

```
$ node -e 'require("polyomino").OneSidedPolyomino.get(4).forEach(item => console.log(`${item.toString2()}\n`));'
██  
████
██  

██  
██  
████

████
████

████  
  ████

████
██  
██  

██  
████
  ██

██
██
██
██
```

```
$ node -e 'require("polyomino").Polyomino.get(10).first().rotations().forEach(item => console.log(`${item.toString2()}\n`));'
  ████
  ██  ██
██████████
      ██

    ██
  ██████
██  ██
██████
    ██

  ██
██████████
  ██  ██
    ████

  ██
  ██████
  ██  ██
██████
  ██
```
