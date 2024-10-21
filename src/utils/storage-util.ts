// Функция для записи данных в localStorage
export const setItem = (key: string, value: string) => {
  try {
    const stringValue = JSON.stringify(value);

    localStorage.setItem(key, stringValue);
    console.log(`Данные успешно сохранены для ключа ${key}`);
  } catch (error) {
    console.error(`Ошибка при сохранении данных для ключа ${key}:`, error);
  }
};

export const getItem = (key: string) => {
  try {
    // Получаем данные из localStorage
    const item = localStorage.getItem(key);

    // Проверяем, есть ли данные
    if (item === null) {
      return null;
    }

    const parsedValue = JSON.parse(item);

    return parsedValue;
  } catch (error) {
    console.error(`Ошибка при получении данных для ключа ${key}:`, error);
    return null;
  }
};

export const removeItem = (key: string) => {
  try {
    return localStorage.removeItem(key);
  } catch (error) {
    console.error(`Ошибка при получении данных для ключа ${key}:`, error);
    return null;
  }
};

export const hasItem = (key: string) => Boolean(localStorage.getItem(key));
