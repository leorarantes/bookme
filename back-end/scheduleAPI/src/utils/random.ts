export function generateRandomNumber(digitsNumber: number) {
    const min = 10 ** (digitsNumber - 1);
    const max = (10 ** digitsNumber) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}