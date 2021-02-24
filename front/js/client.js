(() => {
    const sock = io();

    sock.on('new-message', msg => {
        let bdy = document.body;
        let elem = document.createElement('li');
        elem.innerHTML = msg;
        bdy.appendChild(elem);
    });

})();