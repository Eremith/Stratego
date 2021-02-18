(() => {
    const sock = io();

    sock.on('message', (text) => {
        let bdy = document.body;
        let elem = document.createElement('p');
        elem.innerHTML = text;
        bdy.appendChild(elem);
    })
})();