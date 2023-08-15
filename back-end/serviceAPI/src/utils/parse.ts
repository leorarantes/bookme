export function parseDoctorName(name: string) {
    const words = name.split('-');
}

export function twoDigitsNumber(number: number) {
    if(number || number === 0) {
        const newNumber = number < 10 ? `0${number}` : `${number}`;
        return newNumber;
    }
    return null;
}