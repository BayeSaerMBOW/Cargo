const form = document.querySelector('#form');
const nom = document.querySelector('#nom');
const prenom = document.querySelector('#prenom');

const showSuccees = (fils) => {
    const parent = fils.parentNode;
    parent.className = 'content success';

};

const getInputName = input => input.id.charAt(0).toUpperCase() + input.id.slice(1);


const showError = (fils, msg) => {
    const parent = fils.parentNode;
    parent.className = 'content error';
    parent.querySelector('span').innerText = msg;
};



form.addEventListener('submit', (e) => {  
    e.preventDefault();
    checkRequireGlobal([nom, prenom]);
    checkLength(nom, 5, 30);
    checkLength(prenom, 10, 50);
});

const checkLength = (input, min, max) => {

    if (input.value.length < min) {
        showError(input, `${getInputName(input)} doit contenir au moins ${min} caractères`);
    } else if (input.value.length > max) {
        showError(input, `${getInputName(input)} doit contenir au plus ${max} caractères`);
    } else {
        showSuccees(input);
    }
}

const checkRequire = (input) => {
    const parent = input.parentNode;
    if (input.value.trim() === '') { 
        parent.className += ' error';
        parent.className = 'content error';
        parent.classList.add('error');
        showError(input, `${getInputName(input)} est requis`);
    } else {
        showSuccees(input);
    }

}

const checkRequireGlobal = (inputArray) => {
    inputArray.forEach(input => {
        const parent = input.parentNode;
        if (input.value.trim() === '') {
            parent.className += ' error';
            parent.className = 'content error';
            parent.classList.add('error');
            showError(input, `${getInputName(input)} est requis`);
        } else {
            showSuccees(input);
        }
    });

}



