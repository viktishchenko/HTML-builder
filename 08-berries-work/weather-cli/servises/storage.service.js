import { homedir } from "os"; // C:\Users\Vic
import {
  //   basename,
  join,
  //   dirname,
  //   extname,
  //   relative,
  //   isAbsolute,
  //   resolve,
  //   sep,
} from "path";

import { promises } from "fs";

/* 
basename, dirname, extname, relative,
filePath, isAbsolute, resolve :>>

weather_data.json               // basename
C:\Users                        // dirname
.json                           // extname
..                              // relative
C:\Users\weather_data.json      // filePath
true                            // isAbsolute
C:\Users\...\08-berries-work    // resolve
\                               // separator
*/

// const filePath = join(homedir(), "weather_data.json"); // C:\Users\Vic\weather_data.json
const filePath = join(homedir(), "weather_data.json"); // C:\Users\weather_data.json

const TOKEN_DICTIONARY = {
  token: "token",
  city: "city",
};

// const saveKeyValue = (key, value) => {
//   console.log("basename:>>", basename(filePath));
//   console.log("dirname:>>", dirname(filePath));
//   console.log("extname:>>", extname(filePath));
//   console.log("relative:>>", relative(filePath, dirname(filePath)));
//   console.log("isAbsolute:>>", isAbsolute(filePath));
//   console.log("filePath:>>", filePath);
//   console.log("resolve:>>", resolve(".."));
//   console.log("sep:>>", sep);
// };

const saveKeyValue = async (key, value) => {
  let data = {};
  if (await isExist(filePath)) {
    const file = await promises.readFile(filePath);
    data = JSON.parse(file);
  }
  data[key] = value;
  await promises.writeFile(filePath, JSON.stringify(data));
};

const getKeyValue = async (key) => {
  if (await isExist(filePath)) {
    const file = await promises.readFile(filePath);
    const data = JSON.parse(file);
    return data[key];
  }
  return undefined;
};

const isExist = async (path) => {
  try {
    await promises.stat(path);
    return true;
  } catch (error) {
    return false;
  }
};

export { saveKeyValue, getKeyValue, TOKEN_DICTIONARY };
