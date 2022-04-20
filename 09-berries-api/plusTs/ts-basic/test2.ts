/**
 * npm i reflect-metadata
 */
import "reflect-metadata";

// function Test(target: Function) {
//   Reflect.defineMetadata("a", 1, target);
//   const meta = Reflect.getMetadata("a", target);
//   console.log(meta); // 1
// }

// function Prop(target: Object, name: string) {}

// @Test
// export class C {
/**
 * Позволяет проверить тип
 * данных в рантайме т.е. тип prop(number)
 * будет указан в компилированном
 * яваскрипте явно как Number
 */
//   @Prop prop: number;
// }

// Metadata injection

function Injectable(key: string) {
  return (target: Function) => {
    Reflect.defineMetadata(key, 1, target);
    const meta = Reflect.getMetadata(key, target);
    console.log(meta); // 1
  };
}

function Prop(target: Object, name: string) {}

@Injectable("C")
export class C {
  @Prop prop: number;
}

@Injectable("D")
export class D {
  // Внедрение зависимости
  constructor(@Inject("C") c: C) {}
}
