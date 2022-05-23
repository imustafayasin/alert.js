const Swal = {
    fire: function (title) {
        if (!!document.querySelector(".alert-wrapper")) return
        return new Promise((resolve, reject) => {
            this.setup(title);
            resolve()
        })
    },
    setup: function (title) {
        const alert_wrapper = document.createElement('div');
        const alert_bg = document.createElement('div');
        const alert_content = document.createElement("div");

        alert_bg.className = "alert-bg";
        alert_wrapper.className = "alert-wrapper";
        alert_content.className = "alert-content";
        setTimeout(() => {
            alert_wrapper.classList.add("show");
        }, 250);
        const _title = document.createElement('h2')
        _title.innerText = title;
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
        alert
    }
}

export default Swal;

