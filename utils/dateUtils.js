

export const DateToString = (date) => {

        
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const stringDate = year + '-' + month + '-' + day + 'T00:00:00';

    return stringDate;
}