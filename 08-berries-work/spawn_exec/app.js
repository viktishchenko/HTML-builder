// Запуск параллельных процессов

const { exec } = require("child_process");

const childProcess = exec("dir", (err, stdout, stderr) => {
  if (err) {
    console.log(err.message);
  }
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});

childProcess.on("exit", (code) => {
  console.log(`Код выхода: ${code}`);
});

/* 
Кодировка в консоли: chcp
Варианты: 866 (русский в DOS) | 1251 (Windows-1251) | 65001 (UTF-8)
Например: chcp 65001

Код выхода: 0
stdout:  Volume in drive C has no label.
 Volume Serial Number is ...

 Directory of C:\Users\...\spawn_exec

07.04.2022  10:45    <DIR>          .
07.04.2022  10:45    <DIR>          ..
07.04.2022  10:33               429 app.js
07.04.2022  10:45                30 example1.js
07.04.2022  10:45                31 example2.js
               3 File(s)            490 bytes
               2 Dir(s)  526 686 638 080 bytes free

stderr:

*/
