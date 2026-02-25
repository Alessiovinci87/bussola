/**
 * Genera un ID unico basato su timestamp + random.
 * Non richiede dipendenze esterne.
 */
export function generateId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).slice(2, 8);
  return `${timestamp}-${random}`;
}
