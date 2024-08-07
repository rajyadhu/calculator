// Toggle Conversion Section
document.getElementById('unit_convert_btn').addEventListener('click', function () {
    var calcBody = document.getElementById('calc_body');
    calcBody.classList.toggle('active');

    var convertSection = document.getElementById('convert_section');
    console.log('Convert Section Display:', convertSection.style.display);
    if (convertSection.style.display === "none" || convertSection.style.display === "") {
        console.log('Showing convert section');
        convertSection.style.display = "block";
    } else {
        console.log('Hiding convert section');
        convertSection.style.display = "none";
    }
});

var display = document.getElementById('display');
var currentOperation = '';
var firstOperand = '';
var secondOperand = '';
var result = '';

// Function to append value to display
function appendToDisplay(value) {
    if (currentOperation === '') {
        firstOperand += value;
        display.value = firstOperand;
    } else {
        secondOperand += value;
        display.value = secondOperand;
    }
}

// Add event listeners to number buttons
document.querySelectorAll('.calculator_buttons button').forEach(button => {
    button.addEventListener('click', function() {
        var value = this.innerText;
        if (value >= '0' && value <= '9' || value === '.') {
            appendToDisplay(value);
        } else {
            handleOperation(value);
        }
    });
});

// Function to handle operations
function handleOperation(value) {
    switch (value) {
        case 'AC':
            display.value = '';
            firstOperand = '';
            secondOperand = '';
            currentOperation = '';
            break;
        case '+/-':
            if (currentOperation === '') {
                firstOperand = (firstOperand.startsWith('-') ? firstOperand.slice(1) : '-' + firstOperand);
                display.value = firstOperand;
            } else {
                secondOperand = (secondOperand.startsWith('-') ? secondOperand.slice(1) : '-' + secondOperand);
                display.value = secondOperand;

            }
            break;
        case '%':
            if (currentOperation === '') {
                firstOperand = (parseFloat(firstOperand) / 100).toString();
                display.value = firstOperand;
            } else {
                secondOperand = (parseFloat(secondOperand) / 100).toString( );
                display.value = secondOperand;
            }
            break;
        case '/':
        case 'x':
        case '-':
        case '+':
            if (currentOperation === '' && firstOperand !== '') {
                currentOperation = value;
            } else if (currentOperation !== '' && secondOperand !== '') {
                computeResult();
                currentOperation = value;
                firstOperand = result;
                secondOperand = '';
            }
            break;
        case '=':
            if (currentOperation !== '' && secondOperand !== '') {
                computeResult();
                display.value = result;
                firstOperand = result;
                secondOperand = '';
                currentOperation = '';
            }
            break;
    }
}

// Function to compute the result of the current operation
function computeResult() {
    var num1 = parseFloat(firstOperand);
    var num2 = parseFloat(secondOperand);
    switch (currentOperation) {
        case '/':
            result = (num1 / num2).toString();
            break;
        case 'x':
            result = (num1 * num2).toString();
            break;
        case '-':
            result = (num1 - num2).toString();
            break;
        case '+':
            result = (num1 + num2).toString();
            break;
    }
}
