import template from "./Form.precompiled.js";
import "./Form.css";

/**
 * Компонент формы, собирающий список инпутов и кнопок.
 */
export class Form {
    /**
     * @param {Array} inputs - список Input-компонентов
     * @param {Array} buttons - список Button-компонентов
     * @param {Function} onSubmit - обработчик сабмита (получает значения)
     * @param {string} [title] - заголовок формы
     */
    constructor(inputs, buttons, onSubmit, title = "") {
        this.inputs = inputs;
        this.buttons = buttons;
        this.onSubmit = onSubmit;
        this.title = title;
    }

    validate() {
        let isValid = true;

        for (const input of this.inputs) {
            if (!input.validate()) {
                isValid = false;
            }
        }

        this.buttons.forEach((btn) => {
            btn.element.disabled = !isValid;
        });

        return isValid;
    }

    render() {
        // рендерим hbs
        const html = template({ title: this.title });
        const div = document.createElement("div");
        div.innerHTML = html;
        this.element = div.firstElementChild;

        this.inputsContainer = this.element.querySelector(".form__inputs");
        this.actionsContainer = this.element.querySelector(".form__actions");

        // вставляем инпуты
        this.inputs.forEach((input) => {
            const el = input.render();
            this.inputsContainer.appendChild(el);

            el.addEventListener("input", () => this.validate());
            el.addEventListener("blur", () => this.validate());
        });

        // вставляем кнопки
        this.buttons.forEach((btn) => {
            this.actionsContainer.appendChild(btn.render());
        });

        this.element.addEventListener("submit", (e) => {
            e.preventDefault();

            if (this.validate()) {
                const values = {};
                this.inputs.forEach((input) => {
                    values[input.type] = input.getValue();
                });
                this.onSubmit(values);
            }
        });

        this.validate(); // начальное состояние
        return this.element;
    }
}