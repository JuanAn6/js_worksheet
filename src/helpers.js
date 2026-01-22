/**
 * File with diferent util functions
 */


/**
 * This function returns the letter of the column
 * @param {*} n 
 * @returns 
 */
export function columnNumberToLetter(n) {
    let result = "";
    while (n > 0) {
        n--;
        result = String.fromCharCode(65 + (n % 26)) + result;
        n = Math.floor(n / 26);
    }
    return result;
}