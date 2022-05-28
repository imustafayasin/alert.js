"use strict"
class Alert {
    static fire(obj) {

        this._showAcceptButton = true,
            this._showCancelButton = false,
            this._cancelButtonText = 'Cancel',
            this._acceptButtonText = 'Okey',
            this._onConfirm = false,
            this._description = null,

            Object.entries(obj).forEach(([key, value]) => this[key.padStart(key.length + 1, '_')] = value)
        this.setup()
    }

    static setup() {
        const alert_wrapper = this.elementCreator({ type: 'div', _class: 'alert-wrapper', parentElement: document.body })
        this.elementCreator({ type: 'div', _class: 'alert-bg close-alert', parentElement: alert_wrapper })
        const alert_content = this.elementCreator({ type: 'div', _class: 'alert-content', parentElement: alert_wrapper, styleProperty: ['--align', this._textAlign] })

        this.elementCreator({ type: 'div', _class: `icon ${this._type}`, html: this.renderIcon(), parentElement: alert_content })
        this._htmlContent && this.elementCreator({ type: 'div', html: this._htmlContent, parentElement: alert_content })
        this.elementCreator({ type: 'h2', text: this._title, parentElement: alert_content })
        this.elementCreator({ type: 'p', text: this._description, parentElement: alert_content })
        this.elementCreator({ type: 'button', _class: 'close-modal-button close-alert', html: '&times;', parentElement: alert_content })

        const alert_actions = this.elementCreator({ type: 'div', _class: 'alert-actions', parentElement: alert_content })
        this._showCancelButton && this.elementCreator({ type: 'button', _class: 'cancel-button close-alert', text: this._cancelButtonText, parentElement: alert_actions })
        this._showAcceptButton && this.elementCreator({ type: 'button', _class: `accept-button close-alert`, text: this._acceptButtonText, parentElement: alert_actions })


        this.show(alert_wrapper)
        this._setTimeout && setTimeout(() => this.hide(alert_wrapper), this._setTimeout)
        this.customEventListener('.close-alert', 'click', () => this.hide(alert_wrapper))
        this.customEventListener('.accept-button', 'click', this._onConfirm)
    }

    static customEventListener(selector, listener, callback) {
        if (!callback) return
        document.querySelectorAll(selector).forEach(item => item.addEventListener(listener, () => { callback?.() }))
    }

    static elementCreator({ type, _class, text, html, id, parentElement, styleProperty }) {
        let element = document.createElement(type)
        element.className = _class ?? element.className
        element.innerText = text ?? element.innerText
        element.innerHTML = html ?? element.innerHTML
        element.id = id ?? element.id;
        styleProperty && element.style.setProperty(...styleProperty)
        parentElement?.appendChild(element)
        return element
    }
    static show(_element) {
        setTimeout(() => _element.classList.add("show"), 250);
    }
    static hide(_element) {
        _element.classList.remove("show")
        _element.addEventListener('transitionend', () => _element.remove())
    }
    static renderIcon() {
        return `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"
        y="0px" viewBox="0 0 330 330" style="enable-background:new 0 0 330 330;" xml:space="preserve">
    
        <path  d="M165,0.008C74.019,0.008,0,74.024,0,164.999c0,90.977,74.019,164.992,165,164.992s165-74.015,165-164.992
                    C330,74.024,255.981,0.008,165,0.008z M165,299.992c-74.439,0-135-60.557-135-134.992S90.561,30.008,165,30.008
                    s135,60.557,135,134.991C300,239.436,239.439,299.992,165,299.992z" />
        <path  d="M165,130.008c-8.284,0-15,6.716-15,15v99.983c0,8.284,6.716,15,15,15s15-6.716,15-15v-99.983
                    C180,136.725,173.284,130.008,165,130.008z" />
        <path d="M165,70.011c-3.95,0-7.811,1.6-10.61,4.39c-2.79,2.79-4.39,6.66-4.39,10.61s1.6,7.81,4.39,10.61
                    c2.79,2.79,6.66,4.39,10.61,4.39s7.81-1.6,10.609-4.39c2.79-2.8,4.391-6.66,4.391-10.61s-1.601-7.82-4.391-10.61
                    C172.81,71.61,168.95,70.011,165,70.011z" />
    
    </svg>`;

    }
}



export default Alert;

