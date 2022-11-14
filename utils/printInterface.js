const body = document.querySelector('body')

const print_a_title = (text) => {
    const title = document.createElement('h1');
    title.textContent = text;

    body.appendChild(title);
};

export { print_a_title };