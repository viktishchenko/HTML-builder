type direction = "left" | "right"; // юнион стринг литералы

enum Direction {
  // Числовые Енамы
  Left, // Direction.Left = 0;
  Right, // Direction.Right = 1;

  // Строковые Енамы
  /*
  Left = "left",
  Right = "right",
  */

  // Рассчитываемые Енамы
  /*
Left = "324sdf".length,
  Right = 2,
  */
}

Direction.Left;
Direction.Right;

function move(direction: Direction) {
  switch (direction) {
    case Direction.Left:
      return -1;
      break;
    case Direction.Right:
      return 1;
      break;
    default:
      return 0;
      break;
  }
}

// Енамы в рантайме как объеты:
function objMod({ Left: number }) {}
objMod(Direction);

// Быстрый Енам (константный)
const enum Direction2 {
  Up,
  Down,
}

let myDirection = Direction2.Up;
