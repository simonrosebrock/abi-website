

function weekDayToString(day: number) {
    switch (day) {
        case 1: return "Mon"; break;
        case 2: return "Die"; break;
        case 3: return "Mit"; break;
        case 4: return "Don"; break;
        case 5: return "Fre"; break;
        case 6: return "Sam"; break;
        case 7: return "Son"; break;
    }
    return;
}

export function getDateString(date: Date) {
    if (typeof(date) == "string") {
        date = new Date(date)
    }

    if (date) {
        return `${weekDayToString(date.getDay())}, ${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`;
    }
    
}

export function getPrettyStudent(student: string) {
    return student.replaceAll("_", " ").split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}