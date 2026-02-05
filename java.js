class Calculator {
    constructor(previousOperandElement, currentOperandElement) {
        this.previousOperandElement = previousOperandElement;
        this.currentOperandElement = currentOperandElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
        this.updateDisplay();
    }

    delete() {
        if (this.currentOperand === '0') return;
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        if (this.currentOperand === '') this.currentOperand = '0';
        this.updateDisplay();
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number.toString();
        } else {
            this.currentOperand = this.currentOperand.toString() + number.toString();
        }
        this.updateDisplay();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '0' && this.previousOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand + ' ' + operation;
        this.currentOperand = '0';
        this.updateDisplay();
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);

        if (isNaN(prev) || isNaN(current)) return;

        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '−':
            case '-':
                computation = prev - current;
                break;
            case '×':
            case '*':
                computation = prev * current;
                break;
            case '÷':
            case '/':
                if (current === 0) {
                    alert('Não é possível dividir por zero!');
                    this.clear();
                    return;
                }
                computation = prev / current;
                break;
            default:
                return;
        }

        this.currentOperand = Math.round(computation * 1000000) / 1000000;
        this.operation = undefined;
        this.previousOperand = '';
        this.updateDisplay();
    }

    updateDisplay() {
        this.currentOperandElement.innerText = this.currentOperand;
        if (this.operation != null) {
            this.previousOperandElement.innerText = `${this.previousOperand}`;
        } else {
            this.previousOperandElement.innerText = '';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const previousOperandElement = document.querySelector('[data-previous-operand]');
    const currentOperandElement = document.querySelector('[data-current-operand]');
    const calculator = new Calculator(previousOperandElement, currentOperandElement);

    document.querySelectorAll('[data-number]').forEach(button => {
        button.addEventListener('click', () => {
            calculator.appendNumber(button.innerText);
        });
    });

    document.querySelectorAll('[data-operation]').forEach(button => {
        button.addEventListener('click', () => {
            calculator.chooseOperation(button.innerText);
        });
    });

    document.querySelector('[data-equals]').addEventListener('click', () => {
        calculator.compute();
    });

    document.querySelector('[data-clear]').addEventListener('click', () => {
        calculator.clear();
    });

   document.querySelector('[data-delete]').addEventListener('click', () => {
        calculator.delete();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key >= 0 && e.key <= 9) calculator.appendNumber(e.key);
        if (e.key === '.') calculator.appendNumber('.');
        if (e.key === '+') calculator.chooseOperation('+');
        if (e.key === '-') calculator.chooseOperation('−');
        if (e.key === '*') calculator.chooseOperation('×');
        if (e.key === '/') {
            e.preventDefault();
            calculator.chooseOperation('÷');
        }
        if (e.key === 'Enter' || e.key === '=') calculator.compute();
        if (e.key === 'Escape') calculator.clear();
        if (e.key === 'Backspace') calculator.delete();
    });
});
