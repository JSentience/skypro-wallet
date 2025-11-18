# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

1. Создать и оформить по шаблону таблицу расходов. Сделать верстку, пока без функционала, чтобы соответсвовало шаблону.

Выполнено: Верстка страницы по шаблону, создание файла с моковыми данными, где внесены данные из шаблона (в дальнейшем будем заменять данными из API). Фильтры реализованы, с помощью модулей, работает с помощью изменения состояния. Функционал фильтрации данных будет реализован на следующем этапе. Реализован вертикальный скролл, согласно макету.

2. Создать и оформить форму добавления и редактирования трат. Сделать верстку, пока без функционала, чтобы соответствовало шаблону.

Выполнено: Верстка формы по шаблону, соблюдена структура формы. Реализовал функционал редактирования траты в форме. При нажатии на значок редактирования траты, форма меняет состояние на редактирование. (реализовано через useState). Функционал добавления и редактирования трат, будет реализован на следующем этапе.
