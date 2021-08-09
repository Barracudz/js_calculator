class Calculator{
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    // Function to clear out input variables
    clear(){
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    // Delete the last digit in number typed
    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number){
        // If we already have a '.' in our number, return from the
        // appendNumber function so that more of them cant be added
        if (number === '.' && this.currentOperand.includes('.')) return

        // If the first letter to be typed is '.', then add a 0 in front of it
        if (number === '.' && this.currentOperand === ''){
            this.currentOperand = '0' + number.toString()
            return
        }

        // If there is only one number already typed and it is 0,
        // then make it impossible to add another 0
        if (number == '0' && this.currentOperand == '0' && this.currentOperand.length === 1){
            return
        }

        // If 0 is the first and only number typed, replace it with
        // new number typed as long as number is not 0 og '.'
        if (number != '0' && number != '.' && this.currentOperand == '0') {
            this.currentOperand = number.toString()
            return
        }

        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation){
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    // Computing for each operation
    compute(){
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)

        // If the user has not typed in two numbers, abort
        if (isNaN(prev) || isNaN(current)) return
        
        // Switch depending on operation chosen
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    formatNumber(number){   
        var splitNumber = number.toString().split('.')  
        splitNumber[0] = splitNumber[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ')   
        return splitNumber.join('.')
    }

    // Updating numbers displayed
    updateDisplay(){
        this.currentOperandTextElement.innerText = this.formatNumber(this.currentOperand)
        // Only show the operation if it is not undefined
        if (this.operation === undefined){
            this.previousOperandTextElement.innerText = formatNumber(this.previousOperand)
        }
        else{
            this.previousOperandTextElement.innerText = `${formatNumber(this.previousOperand)} ${this.operation}`
        }
    }
}


// Select all 'data-number' data-attributes
const numberButtons = document.querySelectorAll('[data-number]')
// Select all 'data-operands' data-attributes
const operationButtons = document.querySelectorAll('[data-operation]')
// Select the 'data-equals' data-attribute
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, 
    currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})