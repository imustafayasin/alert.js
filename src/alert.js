class Alert {

    _title
    _description

    static fire(title, description) {
        if (!!document.querySelector(".alert-wrapper")) return
        return new Promise((resolve, reject) => {
            this._title = title;
            this._description = description;
            this.setup();
            resolve()
        })
    }

    static setup() {

        const alert_wrapper = this.elementCreator({ type: 'div', _class: 'alert-wrapper', parentElement: document.body })
        const alert_bg = this.elementCreator({ type: 'div', _class: 'alert-bg close-alert', parentElement: alert_wrapper })
        const alert_content = this.elementCreator({ type: 'div', _class: 'alert-content', parentElement: alert_wrapper })

        this.elementCreator({ type: 'h2', text: this._title, parentElement: alert_content })
        this.elementCreator({ type: 'p', text: this._description, parentElement: alert_content })
        this.elementCreator({ type: 'button', _class:'close-modal-button close-alert', html: '&times;', parentElement: alert_content })

        const alert_actions = this.elementCreator({ type: 'div', _class: 'alert-actions', parentElement: alert_content })
        const accept_button = this.elementCreator({ type: 'button', _class: 'accept-button close-alert', text: 'Okey', parentElement: alert_actions })


        this.show(alert_wrapper)
        this.customEventListener('.close-alert', 'click', () => this.hide(alert_wrapper))
    }

    static customEventListener(selector, listener, callback) {
        document.querySelectorAll(selector).forEach(item => item.addEventListener(listener, () => { callback() }))
    }

    static elementCreator({ type, _class, text, html, id, parentElement }) {
        let element = document.createElement(type)
        element.className = _class ?? element.className
        element.innerText = text ?? element.innerText
        element.innerHTML = html ?? element.innerHTML
        element.id = id ?? element.id
        parentElement?.appendChild(element)
        return element
    }
    static show(_element) {
        setTimeout(() => _element.classList.add("show"), 250);
    }
    static hide(_element) {
        console.log(_element)
        _element.classList.remove("show")
        _element.addEventListener('transitionend', () => _element.remove())
    }
}



export default Alert;

