# ADR-0004: Модульна система — CommonJS із `module: NodeNext`

- Статус: accepted
- Дата: 2026-10-25
- Рішення прийняла: Плахтій Олеся (єдиний автор проекту)

## Context and Problem Statement

Node.js підтримує дві системи модулів: CommonJS (`require`, `module.exports`) та ESM (`import`/`export` з `"type": "module"`). Від вибору залежать запис імпортів у TypeScript (розширення `.js` у ESM), спосіб запуску тестів і сумісність бібліотек. Яку систему використовує DobroHub?

## Decision Drivers

- мінімум налаштувань на старті проєкту;
- уже працюючий конвеєр: `tsc` → `dist/` → `node --test` (ADR-0002);
- сумісність із Fastify, `mssql` та інструментами аудиту;
- зрозумілі імпорти між модулями без службових розширень;
- можливість пізнішого переходу.

## Considered Options

- CommonJS: `"type": "commonjs"` у `package.json`, `module: NodeNext` у `tsconfig.json`
- ESM: `"type": "module"`, імпорти з розширенням `.js`

## Decision Outcome

Обрано: «CommonJS», тому що конвеєр вже працює без змін, імпорти між модулями записуються без розширень, а потреби в top-level `await` або ESM-only бібліотеках зараз немає.

`module: NodeNext` лишається, щоб TypeScript відповідав правилам Node.js: тип модуля визначає `"type"` у `package.json`. Тести в `tests/*.test.mjs` є ESM і імпортують скомпільований CommonJS-код із `dist/`; Node.js це підтримує.

### Consequences

- Good: імпорти без розширень (`import { x } from "./y"`), простіша міграція поточного коду.
- Good: нуль змін у `build`, `test`, `smoke`.
- Bad: частина нових бібліотек поширюється лише як ESM, тоді знадобиться динамічний `import()` або перехід на ESM.
- Bad: `require.main === module` та інші CommonJS-конструкції не працюватимуть після переходу на ESM.

### Confirmation

- У `package.json` `"type": "commonjs"`, у `tsconfig.json` `"module": "NodeNext"`.
- `npm test` імпортує `dist/app.js` з ESM-тесту й проходить (`make check`).
- Додавання ESM-only залежності вимагає нового ADR.

## Pros and Cons of the Options

### CommonJS

- Good: працює зараз, найменше конфігурації, імпорти без розширень.
- Bad: «застарілий» напрям; не всі нові бібліотеки його підтримують.

### ESM

- Good: сучасний стандарт, top-level `await`, `import.meta`.
- Bad: у TypeScript імпорти мають розширення `.js`, треба змінити `package.json`, `app.ts` і частину інструментів; для поточних потреб надлишково.

## More Information

Переглянути, якщо залежність поширюється лише як ESM або з'являється потреба в top-level `await`. Повʼязане: [ADR-0002](0002-test-runner-node-test.md).
