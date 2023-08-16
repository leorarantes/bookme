export function parseAvailability(strDate) {
    const dayOfTheWeekHash = {
        "Sunday": 0,
        "Monday": 1,
        "Tuesday": 2,
        "Wednesday": 3,
        "Thursday": 4,
        "Friday": 5,
        "Saturday": 6
    };

    const arrDate = strDate.split(' ')
    const dayOfTheWeek = dayOfTheWeekHash[arrDate[0]];
    const arrHours = arrDate[1].split('-').map((element) => element.replace('h', ''));

    const greater = parseInt(arrHours[0]) > parseInt(arrHours[1]) ? parseInt(arrHours[0]) : parseInt(arrHours[1]);
    const minor = parseInt(arrHours[0]) < parseInt(arrHours[1]) ? parseInt(arrHours[0]) : parseInt(arrHours[1]);
    
    const startHour = minor;
    const duration = (greater - minor) * 60;

    return { dayOfTheWeek, startHour, duration };
}

export function unparseAvailability(dayOfTheWeek: number, startHour: number, duration: number) {
    const dayOfTheWeekNameHash = {
        0: "Sunday",
        1: "Monday",
        2: "Tuesday",
        3: "Wednesday",
        4: "Thursday",
        5: "Friday",
        6: "Saturday"
    };

    return dayOfTheWeekNameHash[dayOfTheWeek] + ' ' + startHour + '-' + (startHour + (duration / 60));
}

export function parseDuration(strDuration) {
    return parseInt(strDuration.replace(" minutos", ''));
}

export function unparseDuration(duration: number) {
    return duration + " minutos";
}

export function parsePrice(strPrice) {
    return parseFloat(strPrice.replace("R$ ", ''));
}

export function unparsePrice(price: number) {
    return "R$ " + price.toFixed(2);
}

export function twoDigitsNumber(number: number) {
    if(number || number === 0) {
        const newNumber = number < 10 ? `0${number}` : `${number}`;
        return newNumber;
    }
    return null;
}