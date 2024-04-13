var slider = document.getElementById("myRange");
var lengthSlider = document.getElementById("sliderValue");
var passwordGenerated = document.getElementById("bar");
var numberBox = document.getElementById("number-range")

document.getElementById('uppercase').addEventListener("click", checkCheckBoxes);
document.getElementById('lowercase').addEventListener("click", checkCheckBoxes);
document.getElementById('numbers').addEventListener("click", checkCheckBoxes);
document.getElementById('symbols').addEventListener("click", checkCheckBoxes);

var charsetS = '!@#$%^&*()-_';
var charsetN = '0123456789';
var charsetL = 'abcdefghijklmnopqrstuvwxyz';
var charsetU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

var uCheck = true;
var lCheck = true;
var nCheck = true;
var sCheck = true;



var DEFAULT_LENGTH = 12;
const MAX_VALUE = 50;
passwordGenerated.value = generateRandomPassword(DEFAULT_LENGTH)

lengthSlider.innerHTML = slider.value;

slider.addEventListener("input", (event) => {
    let length = lengthSlider.innerHTML = event.target.value;
    passwordGenerated.value = generateRandomPassword(length);
    numberBox.value = length;
})

passwordGenerated.addEventListener("input", (event) => {
    let length = event.target.value.length;
    lengthSlider.innerHTML = length;
    slider.value = length;
    numberBox.value = length;
});

numberBox.addEventListener("input", (event) => {
    let length = event.target.value;

    if (length <= 0) {
        numberBox.value = NaN;
        lengthSlider.innerHTML = 0;
        passwordGenerated.value = "";
        slider.value = 0;
    }

    if (length <= MAX_VALUE && length > 0) {
        passwordGenerated.value = generateRandomPassword(length);
        slider.value = length;
        lengthSlider.innerHTML = length;
    }

    if (length > MAX_VALUE) {
        passwordGenerated.value = generateRandomPassword(MAX_VALUE);
        slider.value = MAX_VALUE;
        lengthSlider.innerHTML = MAX_VALUE;
        numberBox.value = MAX_VALUE;
    }

})


/**
 * Generate random numbers.
 * @param {number} length The length of the password.
 * @returns {string} The password.
*/
function generateRandomPassword(length) {
    checkCheckBoxes()
    const charset = verifyChecksCharset()
    const charsetLength = charset.length;

    const randomPassword = Array.from({ length: length }, () => {
        const randomArray = new Uint32Array(1);
        window.crypto.getRandomValues(randomArray);
        const randomIndex = randomArray[0] % charsetLength;
        return charset[randomIndex];
    }).join('');

    return randomPassword;
}

/**
 * Define the charset.
 * @returns {void}
 */
function verifyChecksCharset() {
    let char = "";

    if (sCheck) char += charsetS
    if (lCheck) char += charsetL
    if (nCheck) char += charsetN
    if (uCheck) char += charsetU

    return char
}

/**
 * Verify that at least one checkbox is active.
 * @returns {void}
 */
function verifyLastCheck() {
    var checkBoxes = document.querySelectorAll('.checkbox-div input[type="checkbox"]:checked');
    if (checkBoxes.length === 0) {
        var firstCheckBox = document.querySelector('.checkbox-div input[type="checkbox"]');
        firstCheckBox.checked = true;
    }
}


/** 
 * Copy to the clipboard.
 * 
 * @returns {void}
*/
function copy(event) {
    event.preventDefault();
    var copyText = passwordGenerated;
    
    copyText.select();
    copyText.setSelectionRange(0, 50);
    
    navigator.clipboard.writeText(copyText.value);
}

/** 
 * Regenerate the password.
 * 
 * @returns {void}
*/
function regenerate(event) {
    event.preventDefault();
    passwordGenerated.value = generateRandomPassword(slider.value)
}

document.getElementById("copy").addEventListener("click", copy);
document.getElementById("regenerate").addEventListener("click", regenerate)

/** 
 * 
 * @returns {void}
*/
function checkCheckBoxes() {
    verifyLastCheck()
    var checkBoxes = document.querySelectorAll('.checkbox-div input[type="checkbox"]');
    checkBoxes.forEach(function (cb) {
        if (cb.checked) {
            if (cb.className === 'uppercase') {
                uCheck = true;
            }
            if (cb.className === 'lowercase') {
                lCheck = true;
            }
            if (cb.className === 'symbols') {
                sCheck = true;
            }
            if (cb.className === 'numbers') {
                nCheck = true;
            }
        } else {
            if (cb.className === 'uppercase') {
                uCheck = false;
            }
            if (cb.className === 'lowercase') {
                lCheck = false;
            }
            if (cb.className === 'symbols') {
                sCheck = false;
            }
            if (cb.className === 'numbers') {
                nCheck = false;
            }
        }
    })
}


