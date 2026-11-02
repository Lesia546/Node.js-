export const APP_NAME = "DobroHub";

export function getGreeting(): string {
  return `${APP_NAME}: проєкт готовий до розробки.`;
}

// Виводимо привітання лише при прямому запуску (node dist/app.js),
// а не коли файл імпортується з тестів чи інших модулів.
if (require.main === module) {
  console.log(getGreeting());
}
