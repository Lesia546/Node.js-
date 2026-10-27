/**
 * Модуль publications — публічний інтерфейс.
 * Відповідальність: оголошення та їхній життєвий цикл.
 * Дозволені залежності: лише db (spec.md, розділ 2).
 * Інші модулі імпортують лише цей файл.
 */
export const MODULE_NAME = "publications";

/** Єдиний enum статусів публікації (spec.md, розділ 3). */
export const PUBLICATION_STATUSES = [
  "draft",
  "pending",
  "published",
  "rejected",
  "hidden",
  "completed",
] as const;

export type PublicationStatus = (typeof PUBLICATION_STATUSES)[number];
