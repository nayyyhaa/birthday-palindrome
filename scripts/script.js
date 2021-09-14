let dateOfBirth = document.querySelector('.dob-input');
let submitBtn = document.querySelector('.submit-btn');
let output = document.querySelector('.output');
let privacyAlert = document.querySelector('#privacyAlert');
let privacyText = document.querySelector('#privacyPolicyText');
let closeIcon = document.querySelector('.fas.fa-times');
let dateFormatArray = ['DD-MM-YYYY', 'MM-DD-YYYY', 'DD-MM-YY', 'MM-DD-YY']
//Functions

function validateInputFields() {
    if(dateOfBirth.value) return true;
    return false;
}

function getDateObject(date) {
    let dateArray = date.split('-');
    return {day: Number(dateArray[2]), month: Number(dateArray[1]), year: Number(dateArray[0])};
}

function reverseDateString(dateString) {
    return dateString.split('').reverse().join('');
}

function isPalindrome(date) {
    let reversedString = reverseDateString(date);
    return date === reversedString
}

function getAllDateFormat(dateObj) {
    let day,month,year;

    if(dateObj.day  < 10) day = '0' + dateObj.day;
    else day = dateObj.day.toString();

    if(dateObj.month < 10) month = '0' + dateObj.month;
    else month = dateObj.month.toString();

    year = dateObj.year.toString();

    let ddmmyyyy = day + month + year;
    let mmddyyyy = month + day + year;
    let ddmmyy = day + month + year.slice(-2);
    let mmddyy = month + day + year.slice(-2);
    return [ddmmyyyy, mmddyyyy, ddmmyy, mmddyy];
}

function isPalindromeForAllDateFormat(dateObj) {
    let isPalindromeFlag = false;
    let index;
    getAllDateFormat(dateObj).forEach((el,i) => {
        if(isPalindrome(el)) {
            index = i;
            isPalindromeFlag = true;
        }
    })
    return [isPalindromeFlag,index];
}

function checkLeapYear(year) {
    if(year % 400 === 0) return true;
    if(year % 100 === 0) return false;
    if(year % 4 === 0) return true;
    return false;
}

function getNextDate(dateObj) {
    let daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
    dateObj.day++;

    if(checkLeapYear(dateObj.year)) daysInMonth[1] = 29;
    if(dateObj.day > daysInMonth[dateObj.month-1]){
        dateObj.day = 1;
        dateObj.month++;
    }

    if(dateObj.month > 12) {
        dateObj.month = 1;
        dateObj.year++;
    }
    return dateObj;
}

function getNextPalindromeDate(dateObj) {
    let count = 0;
    let formatIndex;
    let nextDate = getNextDate(dateObj);
    while(1) {
        count++;
        let [isPalindromeFlag, fIndex] = isPalindromeForAllDateFormat(nextDate);
        formatIndex = fIndex;
        if(isPalindromeFlag) break;
        nextDate = getNextDate(nextDate);
    }
    return [count, nextDate, formatIndex]
}

function validateBirthdayPalindrome() {
    if(validateInputFields()) {
        let dateObj = getDateObject(dateOfBirth.value);
        let [isPalindromeFlag, formatIndex] = isPalindromeForAllDateFormat(dateObj);
        if(isPalindromeFlag) output.innerText = `Yay! Your Birthday is a Palindrome in format ${dateFormatArray[formatIndex]}`;
        else {
            let [count, nextDate, formatIndex] = getNextPalindromeDate(dateObj);
            output.innerText = `Oopsie! Your birthday is not a Palindrome. it's ${count} days away from ${nextDate.day}-${nextDate.month}-${nextDate.year} in format ${dateFormatArray[formatIndex]}`;
        }
    }
    else output.innerText = 'Please enter valid Inputs!';
}

function showPrivacyPolicy() {
    privacyAlert.classList.add('-active');
}

function closePrivacyPolicy() {
    privacyAlert.classList.remove('-active');
}

//Event listeners

submitBtn.addEventListener('click',validateBirthdayPalindrome);
privacyText.addEventListener('click', showPrivacyPolicy);
closeIcon.addEventListener('click', closePrivacyPolicy);