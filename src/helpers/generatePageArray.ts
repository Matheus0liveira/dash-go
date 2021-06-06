export function generatePageArray(from: number, to: number) {
  return [...new Array(to - from)].map((_, index) => {
    return from + index + 1;
  });
}
