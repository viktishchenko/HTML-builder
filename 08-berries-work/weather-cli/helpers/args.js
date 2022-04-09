const getArgs = (args) => {
  const res = {};
  const [executer, file, ...rest] = args;
  rest.forEach((value, idx, array) => {
    //проверяем первый элемент
    if (value.charAt(0) === "-") {
      if (idx === array.length - 1) {
        // остатку строки присваиваем true
        res[value.substring(1)] = true;
        // если следующий элемент строки не минус
      } else if (array[idx + 1].charAt(0) !== "-") {
        // остатку строки присваиваем полученный индекс
        res[value.substring(1)] = array[idx + 1];
      } else {
        // остатку присваиваем true
        res[value.substring(1)] = true;
      }
    }
  });
  return res;
};

export { getArgs };
