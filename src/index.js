var Calculator = /** @class */ (function () {
    function Calculator() {
        this.n1 = null;
        this.n2 = null;
        this.operator = null;
        this.result = null;
        this.buttonList = [
            ["Clear", "/"],
            ["7", "8", "9", "*"],
            ["4", "5", "6", "-"],
            ["1", "2", "3", "+"],
            ["0", ".", "="],
        ];
        this.createWrapper();
        this.createOutput();
        this.createButtons();
        this.bindEvents();
    }
    Calculator.prototype.createButton = function (text, container, className) {
        var button = document.createElement("button");
        button.textContent = text;
        if (className) {
            button.className = className;
        }
        container.appendChild(button);
    };
    Calculator.prototype.createWrapper = function () {
        this.wrapper = document.createElement("div");
        this.wrapper.classList.add("wrapper");
        document.body.appendChild(this.wrapper);
    };
    Calculator.prototype.createOutput = function () {
        this.output = document.createElement("div");
        this.output.classList.add("output");
        this.output.textContent = "0";
        this.wrapper.appendChild(this.output);
    };
    Calculator.prototype.createButtons = function () {
        var _this = this;
        this.buttonList.forEach(function (textList) {
            var div = document.createElement("div");
            div.classList.add("row");
            textList.forEach(function (item) {
                _this.createButton(item, div, "button text-" + item);
                _this.wrapper.appendChild(div);
            });
        });
    };
    Calculator.prototype.bindEvents = function () {
        var _this = this;
        this.wrapper.addEventListener("click", function (event) {
            if (event.target instanceof HTMLButtonElement) {
                var button = event.target;
                var text = button.textContent;
                _this.updateNumbersOrOperator(text);
            }
        });
    };
    Calculator.prototype.clear = function () {
        this.operator = null;
        this.result = null;
        this.n1 = null;
        this.n2 = null;
        this.output.textContent = "0";
    };
    Calculator.prototype.updateNumbersOrOperator = function (text) {
        if (/[\d.]/.test(text)) {
            this.updateNumbers(text);
        }
        else if (/[+\-*\/]/.test(text)) {
            if (!this.n1 && this.result) {
                this.n1 = this.result;
                this.result = null;
            }
            this.operator = text;
        }
        else if (/=/.test(text)) {
            this.updateResult();
        }
        else {
            this.clear();
        }
    };
    Calculator.prototype.updateNumbers = function (text) {
        if (this.operator) {
            this.updateNumber("n2", text);
        }
        else {
            this.updateNumber("n1", text);
        }
    };
    Calculator.prototype.updateNumber = function (name, text) {
        if (text === ".") {
            if (!this[name]) {
                this[name] = "0";
            }
            if (/\./.test(this[name])) {
                return;
            }
        }
        if (this[name]) {
            this[name] += text;
        }
        else {
            this[name] = text;
        }
        this.output.textContent = this[name];
    };
    Calculator.prototype.updateResult = function () {
        if (this.operator === null || this.n1 === null) {
            return;
        }
        var result;
        var n1 = parseFloat(this.n1);
        var n2 = parseFloat(this.n2);
        if (this.operator === "+") {
            result = n1 + n2;
        }
        else if (this.operator === "-") {
            result = n1 - n2;
        }
        else if (this.operator === "*") {
            result = n1 * n2;
        }
        else if (this.operator === "/") {
            if (n2 === 0) {
                result = "不是数字";
                this.output.textContent = result;
                return;
            }
            else {
                result = n1 / n2;
            }
        }
        result = result.toString();
        this.result = result;
        this.n1 = null;
        this.n2 = null;
        this.operator = null;
        this.output.textContent = result;
    };
    return Calculator;
}());
var calculator = new Calculator();
