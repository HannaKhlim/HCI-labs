import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    ru: { translation: {
      brand: 'Redux Lab', subtitle: 'Управление данными без хаоса',
      overview: 'Обзор', products: 'Каталог', tasks: 'Задачи',
      heading: 'Лабораторная работа № 4', intro: 'Архитектурный паттерн Redux',
      overviewText: 'Два независимых слайса, полный CRUD, валидация, фильтрация и сортировка.',
      productsTitle: 'Каталог товаров', tasksTitle: 'Список задач',
      addProduct: 'Добавить товар', addTask: 'Добавить задачу', name: 'Название',
      category: 'Категория', price: 'Цена, ₽', stock: 'Количество',
      description: 'Описание', save: 'Сохранить', cancel: 'Отмена', edit: 'Изменить',
      delete: 'Удалить', search: 'Поиск…', sort: 'Сортировка', nameAsc: 'По названию А–Я',
      priceAsc: 'Сначала дешевле', priceDesc: 'Сначала дороже', all: 'Все',
      done: 'Выполнена', markDone: 'Отметить выполненной', empty: 'Ничего не найдено.',
      validation: 'Заполните название; цена и количество должны быть неотрицательными числами.',
      deleteConfirm: 'Удалить этот элемент?', stats: 'Сводка', productCount: 'Товаров',
      taskCount: 'Задач', completed: 'Выполнено', language: 'Язык', ru: 'Русский', en: 'English',
      editTitle: 'Редактирование', createTitle: 'Создание', status: 'Статус', open: 'В работе',
    }},
    en: { translation: {
      brand: 'Redux Lab', subtitle: 'Data management without chaos',
      overview: 'Overview', products: 'Products', tasks: 'Tasks',
      heading: 'Laboratory work No. 4', intro: 'Redux architectural pattern',
      overviewText: 'Two independent slices, full CRUD, validation, filtering and sorting.',
      productsTitle: 'Product catalog', tasksTitle: 'Task list',
      addProduct: 'Add product', addTask: 'Add task', name: 'Name',
      category: 'Category', price: 'Price', stock: 'Quantity', description: 'Description',
      save: 'Save', cancel: 'Cancel', edit: 'Edit', delete: 'Delete', search: 'Search…',
      sort: 'Sort', nameAsc: 'Name A–Z', priceAsc: 'Price: low to high',
      priceDesc: 'Price: high to low', all: 'All', done: 'Completed',
      markDone: 'Mark completed', empty: 'No matching items.',
      validation: 'Enter a name; price and quantity must be non-negative numbers.',
      deleteConfirm: 'Delete this item?', stats: 'Summary', productCount: 'Products',
      taskCount: 'Tasks', completed: 'Completed', language: 'Language', ru: 'Русский',
      en: 'English', editTitle: 'Edit item', createTitle: 'Create item', status: 'Status', open: 'In progress',
    }},
  },
  lng: 'ru',
  fallbackLng: 'ru',
  interpolation: { escapeValue: false },
});

export default i18n;