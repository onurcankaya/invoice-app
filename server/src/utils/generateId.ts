export function generateId(): string {
  const letters = Array.from({ length: 2 }, () => {
    return String.fromCharCode(65 + Math.floor(Math.random() * 26));
  }).join('');

  const numbers = Array.from({ length: 4 }, () => {
    return Math.floor(Math.random() * 10);
  }).join();

  return `${letters}${numbers}`;
}
