export const ITEMS_PER_PAGE = 25;

export function getTotalPages(total: number) {
  return Math.ceil(total / ITEMS_PER_PAGE);
}

export function getCurrentPage(from: number) {
  return Math.ceil(from / ITEMS_PER_PAGE) + 1;
}