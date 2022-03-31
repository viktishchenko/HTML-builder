# читаем файл синхронно с помощью CLI nodejs

// переходим в папку с `demo`, смотрим содержимое командой `ls`

```
PS C:\Users\07-berry-starter\demo> ls


    Каталог: C:\Users\HTML-builder\07-berry
    -starter\demo


Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
-a----        31.03.2022      6:37            181 app.js
-a----        31.03.2022      6:36             27 data.txt


PS C:\Users\07-berry-starter\demo>
```

выполняем код командой: `node app.js`

```
fs = require("fs");

// синхронный блокирует поток!!!
const data = fs.readFileSync("./data.txt");
// бинарный код
console.log("data :>> ", data);
// переводим в читаемый функцией toString()
console.log("data.toString() :>> ", data.toString());

// результат
data.toString() :>>  Мама мыла раму.
```
