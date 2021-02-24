let form = document.getElementById('loginForm');
let input = document.getElementById('username');

form.addEventListener('submit', event => {
    event.preventDefault();
    logger.sendLogin(input.value);
});