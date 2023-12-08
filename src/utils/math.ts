export const sum = (numbers: number[]) => numbers.reduce((a, b) => a + b, 0);

export const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);

export const lcm = (numbers: number[]): number => numbers.reduce((acc, n) => Math.abs(acc * n) / gcd(acc, n), 1);

