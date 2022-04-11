#!/ust/bin/env node

import { getArgs } from "./helpers/args.js";
import { getWeather, getIcon } from "./servises/api.service.js";
import {
  printHelp,
  printError,
  printSuccess,
  printWeather,
} from "./servises/log.service.js";
import {
  saveKeyValue,
  TOKEN_DICTIONARY,
  getKeyValue,
} from "./servises/storage.service.js";

const saveCity = async (city) => {
  if (!city.length) {
    printError("Не передан город");
    return;
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.city, city);
    printSuccess("Город сохранен");
  } catch (error) {
    printError(error.message);
  }
};

const saveToken = async (token) => {
  if (!token.length) {
    printError("Не передан токен");
    return;
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token);
    printSuccess("Токен сохранен");
  } catch (error) {
    printError(error.message);
  }
};

const getForcast = async () => {
  try {
    const city = await getKeyValue(TOKEN_DICTIONARY.city);
    const weather = await getWeather(city);
    printWeather(weather, getIcon(weather.weather[0].icon));
  } catch (error) {
    if (error?.response?.status === 404) {
      printError("Неверно указан город");
    } else if (error?.response?.status === 401) {
      printError("Неверно указан токен");
    } else {
      printError(error.message);
    }
  }
};

const initCli = () => {
  //   console.log(process.env);
  const args = getArgs(process.argv);
  if (args.h) {
    // Вывод help
    return printHelp();
  }
  if (args.s) {
    // Сохранить город
    return saveCity(args.s);
  }
  if (args.t) {
    // Сохранить токен
    return saveToken(args.t);
  }
  // Вывести погоду
  return getForcast();
};

initCli();
