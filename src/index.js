import "@babel/polyfill";
import "./index.html"
import "./index.scss"
import {Memory} from './Memory.js';

let out = document.querySelector('.calc-screen p');

let a = '';
let b = '';
let sign = '';
let finish = false;
let showOperator = '';
let memory = new Memory();

function clearAll() {
    a = '';
    b = '';
    sign = '';
    finish = false;
    out.textContent = '0';
}

document.getElementById("x2").addEventListener("click", () => {
    let res = out.textContent * out.textContent;
    out.textContent = res;
    a = res;
    finish = true;
});

document.getElementById("x3").addEventListener("click", () => {
    let res = out.textContent * out.textContent * out.textContent;
    out.textContent = res;
    a = res;
    finish = true;
});

document.getElementById("tenX").addEventListener("click", () => {
    let res = 1;
    for (let i = 0; i < out.textContent; i++) {
        res = res + "0";
    }
    out.textContent = res;
    a = res;
    finish = true;
});

document.getElementById("oneDivideX").addEventListener("click", () => {
    if (out.textContent === '0') {
        clearAll();
        out.textContent = '/ by zero!';
        return;
    }
    let res = 1 / out.textContent;
    out.textContent = res;
    a = res;
    finish = true;
});

function factorial(x) {
    if (x === 0 || x === 1) {
        return 1;
    }
    return x * factorial(x - 1);
}

document.getElementById("factorial").addEventListener("click", () => {
    const res = factorial(out.textContent);
    out.textContent = res;
    a = res;
    finish = true;
});

document.getElementById("signChange").addEventListener("click", () => {
    const res = out.textContent > 0 ? "-" + out.textContent
        : out.textContent < 0 ? out.textContent.substring(1) : out.textContent;
    out.textContent = res;
    a = res;
    finish = true;
});

document.getElementById("percent").addEventListener("click", () => {
    if (sign === "+" || sign === "-") {
        b = a * b / 100;
    } else {
        b = b / 100;
    }

    fireEqual();
});

function fireEqual() {
    const equal = document.querySelector('.equal');
    const event = new Event("click", {bubbles: true});
    equal.dispatchEvent(event);
}

document.getElementById("sqrt").addEventListener("click", () => {
    const num = out.textContent;
    let root = num / 2;
    const eps = 0.01;
    while (root - num / root > eps) {
        root = 0.5 * (root + num / root);
    }
    out.textContent = root;
    a = root;
    finish = true;

});

function mabs(x) {
    return (x < 0) ? -x : x;
}

function rootNDegree(num, rootDegree) {
    const eps = 0.00001;
    let root = num / rootDegree;
    let rn = num;
    while (mabs(root - rn) >= eps) {
        rn = num;
        for (let i = 1; i < rootDegree; i++) {
            rn = rn / root;
        }
        root = 0.5 * (rn + root);
    }
    return root;
}

document.getElementById("cbrt").addEventListener("click", () => {
    const num = out.textContent;
    let root = rootNDegree(num, 3);
    out.textContent = root;
    a = root;
    finish = true;
});

document.getElementById("mc").addEventListener("click", () => memory.clearMemory());

document.getElementById("mr").addEventListener("click", () => {
    const memoryValue = memory.recoverMemory();
    out.textContent = memoryValue;
    a = memoryValue;
    finish = true;
});

document.getElementById("mPlus").addEventListener("click", () => memory.addToMemory(out.textContent));

document.getElementById("mMinus").addEventListener("click", () => memory.removeFromMemory(out.textContent));

document.querySelector(".buttons").addEventListener("click", (event) => {
    if (event.target.id === 'ac') return clearAll();
    const isDigit = event.target.classList.contains('digit');
    const isOperator = event.target.classList.contains('operator');
    const isEqual = event.target.classList.contains('equal');
    if (!isDigit && !isOperator && !isEqual) return;

    // out.textContent = '';

    const key = event.target.textContent;

    if (isDigit) {
        if (key === '.' && out.textContent.includes('.') && !finish) return;

        // if (finish && b === '') {
        //     finish = false;
        //     // clearAll();
        //     // a = key;
        // }

        if (b === '' && sign === '') {
            a += key;
            out.textContent = a;
        } else if (a !== '' && sign !== '' && finish) {
            b = key;
            out.textContent = b;
        } else {
            b += key;
            out.textContent = b;
        }
        return;
    }

    if (isOperator) {

        if (b !== '') {
            showOperator = key;
            out.textContent = key;
            fireEqual();
        }
        else {
            sign = key;
            out.textContent = sign;
        }
        return;
    }

    if (isEqual) {
        // if (b === '') b = a;
        let res;
        switch (sign) {
            case "+":
                a = (+a) + (+b);
                break;

            case "-":
                a = a - b;
                break;

            case "x":
                a = a * b;
                break;

            case "/":
                if (b === '0') {
                    clearAll();
                    out.textContent = '/ by zero!';
                    return;
                }
                a = a / b;
                break;
            case "xy":
                res = a;
                for (let i = 1; i < b; i++) {
                    res *= a;
                }
                a = res;
                break;
            case "y√x":
                let root = rootNDegree(a, b);
                out.textContent = root;
                a = root;
                break;
        }
        b = '';
        if (showOperator !== '') {
            out.textContent = showOperator;
            sign = showOperator;
            showOperator = '';
        }
        else {
            finish = true;
            out.textContent = a;
        }
    }
});

document.getElementById("colorTheme").addEventListener("click", () => {
    document.documentElement.classList.remove("color", "light");
    document.documentElement.classList.add("color");
});

document.getElementById("lightTheme").addEventListener("click", () => {
    document.documentElement.classList.remove("color", "light");
    document.documentElement.classList.add("light");
});