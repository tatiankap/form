const form = document.querySelector('form');
const formName = form.elements['name'];
const formSurname = form.elements['surname'];
const formBirth = form.elements['birth'];
const formInputEl = form.querySelectorAll('input.form-control')
const citySelect = document.querySelector('#city');
const addressInput = form.elements['address'];

function getLanguage() {
    const checkedLang = document.querySelectorAll('input[name="lang"]:checked');
    const values = [];
    checkedLang.forEach(checkbox => {
        values.push(checkbox.value);
    })

    return values;
}

formInputEl.forEach(el => {
    el.addEventListener('keyup', e => {
        if (e.target.classList.contains('has-error')) {
            hideError(e.target);
        }
    })
})


form.addEventListener('submit', e => {
    e.preventDefault();
    const validFormName = hasValue(formName);
    const validFormSurname = hasValue(formSurname);
    const validFormBirth = hasValue(formBirth);

    if (validFormBirth && validFormName && validFormSurname) {
        const formInfo = {
            name: formName.value,
            surname: formSurname.value,
            birth: formBirth.value,
            sex: form.querySelector('input[name=sex]:checked').value,
            city: citySelect.value,
            address: addressInput.value,
            languages: getLanguage()
        };

        createTable(formInfo)

    }
})

function showError(target, errorMessage) {
    const smallEl = target.nextElementSibling;
    target.classList.add('has-error')
    smallEl.textContent = errorMessage;
}

function hideError(target) {
    const smallEl = target.nextElementSibling;
    target.classList.remove('has-error')
    smallEl.textContent = '';
}


function hasValue(input) {
    if (input.value.length === 0) {
        showError(input, 'Input should not be empty')
        return false
    } else {
        hideError(input)
        return true
    }
}
function toggleForm(){
    form.classList.toggle('d-none')
}

function createTable(formInfo) {
    toggleForm()
    const table = document.createElement('table');
    table.classList.add('table');
    const tableBody = document.createElement('tbody');

    Object.keys(formInfo).forEach(key => {
        if (formInfo[key].length) {
            tableBody.innerHTML += `
         <tr>
             <td>${key}</td>
             <td>${formInfo[key]}</td>
         </tr>`
        }
    });
    const backBtn = document.createElement('button');
    backBtn.textContent = 'Back to form';
    backBtn.classList.add('btn');

    table.appendChild(tableBody);
    table.appendChild(backBtn);


    document.body.append(table);
    backBtn.addEventListener('click', e => {
        const tableEl = document.querySelector('table');
        if (tableEl) {
            tableEl.remove();
        }
        toggleForm();
    })  
}