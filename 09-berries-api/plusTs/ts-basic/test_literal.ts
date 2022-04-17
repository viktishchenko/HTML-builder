let a = "simple"; // a: string (type: string)
const ab = "simple"; // ab: simple (type: literal string (т.е. simple))

// варинт использования строковых литералов
type direction = "left" | "right";
function moveDog(direction: direction) {
  // :>> -1 | 0 | 1
  // кроме строковых можно задать числовые литералы
  switch (direction) {
    case "left":
      return -1;
      break;
    case "right":
      return 1;
      break;
    default:
      return 0;
      break;
  }
}

moveDog("left");
moveDog("right");

/**
 * комбинирование строковых литералов с объектами и интерфейсами
 */
interface IConnection {
  host: string;
  port: number;
}

function connect(connection: IConnection | "default") {}
connect({ host: "http://google.com", port: 80 });
connect("default");

const connection = {
  host: "localhost",
  protocol: "https" as "https", // строку приводим(кастуем) конкретному литералу
};

function connects(host: string, protocal: "http" | "https") {}

connects(connection.host, connection.protocol);
