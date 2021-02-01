class Calculator {
  public wrapper: HTMLDivElement;
  private output: HTMLDivElement;
  public n1: string = null;
  public n2: string = null;
  public operator: string = null;
  public result: string = null;
  public buttonList: Array<Array<string>> = [
    ["Clear", "/"],
    ["7", "8", "9", "*"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["0", ".", "="],
  ];

  constructor() {
    this.createWrapper();
    this.createOutput();
    this.createButtons();
    this.bindEvents();
  }

  createButton(text: string, container: HTMLElement, className: string): void {
    const button: HTMLButtonElement = document.createElement("button");
    button.textContent = text;
    if (className) {
      button.className = className;
    }
    container.appendChild(button);
  }

  createWrapper(): void {
    this.wrapper = document.createElement("div");
    this.wrapper.classList.add("wrapper");
    document.body.appendChild(this.wrapper);
  }

  createOutput(): void {
    this.output = document.createElement("div");
    this.output.classList.add("output");
    this.output.textContent = "0";
    this.wrapper.appendChild(this.output);
  }

  createButtons(): void {
    this.buttonList.forEach((textList) => {
      const div: HTMLDivElement = document.createElement("div");
      div.classList.add("row");
      textList.forEach((item) => {
        this.createButton(item, div, `button text-${item}`);
        this.wrapper.appendChild(div);
      });
    });
  }

  bindEvents(): void {
    this.wrapper.addEventListener("click", (event) => {
      if (event.target instanceof HTMLButtonElement) {
        const button: HTMLButtonElement = event.target;
        const text = button.textContent;
        this.updateNumbersOrOperator(text);
      }
    });
  }

  clear(): void {
    this.operator = null;
    this.result = null;
    this.n1 = null;
    this.n2 = null;
    this.output.textContent = "0";
  }

  updateNumbersOrOperator(text): void {
    if (/[\d.]/.test(text)) {
      this.updateNumbers(text);
    } else if (/[+\-*\/]/.test(text)) {
      if (!this.n1 && this.result) {
        this.n1 = this.result;
        this.result = null;
      }
      this.operator = text;
    } else if (/=/.test(text)) {
      this.updateResult();
    } else {
      this.clear();
    }
  }

  updateNumbers(text: string): void {
    if (this.operator) {
      this.updateNumber("n2", text);
    } else {
      this.updateNumber("n1", text);
    }
  }

  updateNumber(name: string, text: string) {
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
    } else {
      this[name] = text;
    }
    this.output.textContent = this[name];
  }

  updateResult(): void {
    if (this.operator === null || this.n1 === null) {
      return;
    }
    let result;
    const n1: number = parseFloat(this.n1);
    const n2: number = parseFloat(this.n2);
    if (this.operator === "+") {
      result = n1 + n2;
    } else if (this.operator === "-") {
      result = n1 - n2;
    } else if (this.operator === "*") {
      result = n1 * n2;
    } else if (this.operator === "/") {
      if (n2 === 0) {
        result = "不是数字";
        this.output.textContent = result;
        return;
      } else {
        result = n1 / n2;
      }
    }
    result = result.toString();
    this.result = result;
    this.n1 = null;
    this.n2 = null;
    this.operator = null;
    this.output.textContent = result;
  }
}

const calculator = new Calculator();
