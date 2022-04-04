# nodejs

_NodeJs vs Deno_

| NodeJs                                             | Deno                                              |
| :------------------------------------------------- | :------------------------------------------------ |
| язык JavaScript                                    | язык TypeScript, JavaScript                       |
| NPM                                                | .ts и .js модули                                  |
| Нет ограничений безопасности                       | Контроль безопасности CLI                         |
| Отдельное API                                      | Совместим с браузерным API                        |
| Большое community и стабильная работа в production | Небольшое community и непредсказуемые баги в prod |

## [запускаем код через REPL и CLI →](./repl-cli/README.md)

<details>
<summary>
REPL & CLI
</summary>
REPL - read, eval, print, loop
CLI - command-line interface

По сути дает возможность тестировать ноду:

```javascript
PS C:\Users\HTML-builder> node
Welcome to Node.js v16.13.2.
Type ".help" for more information.
> 1+1
2
> const name = "Vasya"
undefined
> name
'Vasya'
>
(To exit, press Ctrl+C again or Ctrl+D or type .exit)
>
PS C:\Users\HTML-builder>
```

</details>

## [модули в JavaScript →](./demo-es-modules/)

- повторное использование
- возможность компоновки
- удобство разработки (в том числе совместной)
- изоляция (инкапсуляция кода)
- организация проекта

### история

| IIFE →  | CommonJS →                  | ES Modules       |
| :------ | :-------------------------- | :--------------- |
| Brouser | Brouser \*только при сборке | Brouser          |
| brouser | brouser & nodejs            | brouser & nodejs |

<details>
<summary>
IIFE
</summary>
Immediately Invoked Function Expression - IIFE

```javascript
(function () {
  const users = ["Антон", "Вася"];

  function greet(name) {
    console.log(`Привет ${name}`);
  }
<!-- важно присваивание -->
  APP.greet = greet;
  APP.users = users;
})();
```

file `index.html`

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
</head>
<body>
<!-- важен порядок скриптов и присваивание в app.js -->
    <script src="./app.js"></script>
    <script src="./user.js"></script>
    <script src="./other.js"></script>
</body>
</html>
```

</details>

<details>
<summary>
Common JS
</summary>

file `users.js`

```javascript
const users = ["Антон", "Вася"];

function greet(name) {
  console.log(`Привет ${name}`);
}

// что экспортирует модуль
module.exports = { users, greet };
```

file `app.js`

```javascript
// ключевое слово подключения - `require`

const {greet, users} = require(./users.js);

for (const user of users) {
    greet(user);
}

```

</details>

<details>
<summary>
ES Modules
</summary>

file `users.mjs`

```javascript
// что экспортирует модуль

export const users = ["Антон", "Вася"];

export function greet(name) {
  console.log(`Привет ${name}`);
}
```

file `app.mjs`

```javascript
// ключевое слово подключения - `import`

import { greet, users } from "./users.mjs";

for (const user of users) {
  greet(user);
}
```

</details>

### ключевые отличия

| CommonJS                     | ES Modules                    |
| :--------------------------- | :---------------------------- |
| Require в любом месте        | Импорт на верхнем уровне      |
| Можно использовать в условии | Нельзя использовать в условии |
| Загрузка всего модуля        | Выборочная загрузка           |
| Нет асинхронности            | Асинхронные подключения       |
| Поддержка                    | TypeScript                    |

## [Как использовать ES Modules в NodeJS →](./demo-common-js/)

- Использовать js файлы расширения .mjs
- Указывать в package.json `"type": "module"`
- Передать node аргумент `--input-type=module*`

## Common JS синтаксис

` app.js`

```javascript
const a = 0;
if (a > 0) {
  const log = require("./characters");
  log();
  /**
   * Загружено characters.js
   * log
   */
} else {
  console.log("Меньше 0"); // Меньше 0 !!!
}
```

` characters.js`

```javascript
console.log("Загружено characters.js");

// module.exports = { characters, stealRings };
module.exports = function log() {
  console.log("log");
};
```

## ES Modules синтаксис

` app.mjs`

```javascript
// import { characters, greet } from "./characters.mjs";
// import char, { characters, greet as hello } from "./characters.mjs";

// import { characters } from "./characters.mjs";

// for (const c of characters) {
//   hello(c);
// }
// for (const c of char.characters) {
//   char.greet(c);
// }
// char(); // log

/**
 * Поздравляю: Фродо
 * Поздравляю: Бильбо
 */

// асинхронный динамический импорт модулей
async function main() {
  try {
    const { characters, greet } = await import("./charactersХУЭКС.mjs");
    for (const c of characters) {
      greet(c);
    }
  } catch (error) {
    console.log("Ошибка"); // Ошибка
  }
}
// async function main() {
//   const { characters, greet } = await import("./characters.mjs");
//   for (const c of characters) {
//     greet(c);
//   }
// }

main();
```

` characters.mjs`

```javascript
export const characters = ["Фродо", "Бильбо"];

export function greet(character) {
  console.log("Поздравляю: " + character);
}

// default export
export default function log() {
  console.log("log");
}
```

## [Глобальные и модульные переменные →](./global-module/)

| Глобальные      |                 |                | Модульные    |
| --------------- | --------------- | -------------- | ------------ |
| global          | setTimeout      | MessageChannel |              |
| console         | setInterval     | MessageEvent   | \_\_dirname  |
| perfomance      | setImmediate    | MessagePort    | \_\_filename |
| Buffer          | clearTimeout    |                | exports      |
| AbortController | clearInterval   | Event          | module       |
| queueMicrotask  | clearImmediate  | EventTarget    | require()    |
| WebAssembly     |                 |                |              |
|                 | URL             | TextDecor      |              |
|                 | URLSearchParams | TextEncoder    |              |

## [Events →](./events/)

| Events Emitter                           | Event Target                                   |
| ---------------------------------------- | ---------------------------------------------- |
| Берется из модуля events                 | Глобальная переменная                          |
| Несколько listener на 1 событие          | Только 1 listener для события                  |
| Эмулирует почти всю EE API               | Частичная эмуляция                             |
| Обработка ошибок через error             | Нет обработки через error                      |
| Встроенные события add / remove listener | Нет событий добавления и удаления обработчиков |

<details>
<summary>
Events
</summary>

```javascript
/**
 * EventEmitter
 */

const EventEmitter = require("events");

const myEmitter = new EventEmitter();

const logDbConnection = () => {
console.log("DB connected");
};

// добавляем слушателя (подписчик события)
myEmitter.addListener("connected", logDbConnection);
// добавляем событе
myEmitter.emit("connected");

// для предотвращения утечки памяти через слушателей удаляем их
// конкретного
myEmitter.removeListener("connected", logDbConnection);
// или
// myEmitter.off("connected", logDbConnection);
// удаляем всех слушателей (принимает только ивенты)
// myEmitter.removeAllListeners("connected");

/\*\*

- добавляем событие, видим в консоле только лог первого события,
- если залочить удаление слушателя, то их будет два
  \*/
  myEmitter.emit("connected");

// другой вариант подключения слушателя
myEmitter.on("msg", (data) => {
console.log("Ответ: " + data);
});

myEmitter.on("msg", (data) => {
console.log("А ВОТ ЕЩЁ! Получи сообщение!");
});

/\*\*

- Возможность поставить слушателя выше других:
- prependListener
  \*/

myEmitter.prependListener("msg", () => {
console.log("Prepend →");
});

myEmitter.emit("msg", "Привет! Получи сообщение!");

// слушатель, который подключается однажды и удаляется сам

myEmitter.once("check", () => {
console.log("call ones");
});

myEmitter.emit("check"); // call ones
myEmitter.emit("check"); // absolutley nothing

/\*\*

- Можем добавить ограничение по колличеству слушателей
- (по умолчанию их 10)
- и по его достижению получить ворнинг
  \*/

console.log(myEmitter.getMaxListeners()); // 10
myEmitter.setMaxListeners(3);
console.log(myEmitter.getMaxListeners()); // 3

/\*\*

- Можем посчитаем колличество слушателей
  \*/
  console.log(myEmitter.listenerCount("msg")); // 3 (продолжает существовать)
  console.log(myEmitter.listenerCount("check")); // 0 (удалили запустив однажды - once)

/\*\*

- Можем получить массив слушателей по мере появления в коде
  \*/

console.log(myEmitter.listeners("msg")); // [[Function(anonymous)], [Function(anonymous)]];

/\*\*

- Можем получить массив имен слушателей на ивент эмиттере (myEmitter)
  \*/

console.log(myEmitter.eventNames()); // ['msg']

/\*\*

- Можем добавить обработчик ошибок
  \*/

myEmitter.on("error", (err) => {
console.log(`Произошла ошибка: ${err.message}`);
});

myEmitter.emit("error", new Error("Это сообщени об ошибке!")); //error fatal vs // Произошла ошибка: Это сообщени об ошибке!

/\*\*

- EventTarget
  \*/

const target = new EventTarget();

const logTarget = () => {
console.log("Connected to target");
};

// Добавляем слушатель и обработчик
target.addEventListener("connected", logTarget);
// Вызываем ивент-таргет
target.dispatchEvent(new Event("connected"));

```

</details>
