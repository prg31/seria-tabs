window.addEventListener('DOMContentLoaded', () => {

    document.querySelectorAll('.delete-attribute').forEach( link => {
        link.addEventListener('click', deleteAttr)
    });

    document.querySelectorAll('form').forEach( form => {
        form.addEventListener('submit', sendForm)
    })
});

const deleteAttr = event => {

    event.preventDefault();

    const dbID = event.target.dataset.id;
    const path = '/edit-tabs.php?method=' + event.target.dataset.action;
    const url = new URL( path, window.location.origin ).toString();

    const undo = confirm("Вы действительно хотите удалить атрибут? Действия будут применены безвозвратно");
    if (!undo) return;

    const formData = new FormData();
    formData.append('id', dbID);

    if (event.target.dataset.type !== undefined) {
        formData.append('type', event.target.dataset.type)
    }

    fetch(url, { method: 'POST', body: formData })
    .then(response => response.json())
    .then( response => {

        if (response.status === 'error') {
            errorAlert(event.target, response.text);
        } else {
            successAlert(event.target, response.text);
            document.querySelector(`#attribute-${dbID}`).remove();
        }
    });
};

const sendForm = event => {

    event.preventDefault();

    const action = event.target.getAttribute('action');
    const path = new URL( action, window.location.origin ).toString();

    const formData = new FormData();
    event.target.querySelectorAll('input, select').forEach(input => {

        if (input.type === 'file') {
            for (const file of input.files) {
                formData.append(input.getAttribute('id'), file, file.name)
            }
        } else {
            formData.append( input.getAttribute('id'), input.value );
        }
    });

    //seriaId is init in html template <script> tag in header
    formData.append('seriaId', seriaId);

    fetch(path, { method: 'POST', body: formData })
    .then(response => response.json())
    .then( response => {

        if (response.status === 'error') {
            errorAlert(event.target, response.text);
        }
        else {
            successAlert(event.target, response.text);
        }

        //clear inputs if needed
        if (event.target.dataset.flushinputs === 'true') {
            event.target.querySelectorAll('input').forEach(input => {
                input.value = "";
            })
        }
    })
}

const errorAlert = (form, text) => {

    form.querySelectorAll('.alert').forEach( alert => {
        alert.remove();
    })

    const alert = document.createElement('div');
    alert.classList.add('alert', 'alert-danger');
    alert.setAttribute('role', 'alert');
    alert.innerText = text;

    form.prepend(alert);
};
const successAlert = (form, text) => {

    form.querySelectorAll('.alert').forEach( alert => {
        alert.remove();
    })

    const alert = document.createElement('div');
    alert.classList.add('alert', 'alert-success');
    alert.setAttribute('role', 'alert');
    alert.innerText = text;

    form.prepend(alert);
};