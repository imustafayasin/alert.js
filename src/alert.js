class Alert {

    _title

    static fire(title) {
        if (!!document.querySelector(".alert-wrapper")) return
        return new Promise((resolve, reject) => {
            this._title = title;
            this.setup();
            resolve()
        })
    }

    static setup() {

        const alert_wrapper = this.elementCreator('div', 'alert-wrapper');
        const alert_bg = this.elementCreator('div', 'alert-bg')
        const alert_content = document.createElement("div");

        alert_content.className = "alert-content";
        setTimeout(() => {
            alert_wrapper.classList.add("show");
        }, 250);

        const _title = document.createElement('h2')
        _title.innerText = this._title;
        alert_wrapper.appendChild(alert_bg)
        alert_content.appendChild(_title)

        alert_wrapper.appendChild(alert_content)
        document.body.appendChild(alert_wrapper)
        alert_bg.addEventListener('click', (e) => {
            alert_wrapper.classList.remove("show");
            alert_wrapper.addEventListener('transitionend', () => {
                alert_wrapper.remove()
            })
        })
    }


    static elementCreator(type, _class, text, html, id, appendElement) {
        let element = document.createElement(type);
        element.className = _class;
        element.innerText ??= text;
        element.innerHTML ??= html;
        element.id ??= id;
        appendElement?.appendChild(element);
        return element
    }
    show() {
        this.hideAlert = true
    }
    hide() {
        this.hideAlert = false
    }
}



export default Alert;

