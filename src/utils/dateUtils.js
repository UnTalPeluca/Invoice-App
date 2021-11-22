const months = ["","Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function getMonthName(month) {
    return months[month]
}
function getFullDate(day, month, year){
    return `${day} ${getMonthName(month)} ${year}`;
}
function splitDocDate(date){
    const arr = date.split('-').reverse()
    return getFullDate(arr[0], parseInt(arr[1]), arr[2])
}
function onlySplitDocDate(date){
    return date.split('-')
}
function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}
function formatDate(day, month, year) {
    return `${year}-${month}-${day}`
}
export default {
    getMonthName,
    getFullDate,
    splitDocDate,
    addDays,
    formatDate,
    onlySplitDocDate
}