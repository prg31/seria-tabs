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
    const path = new URL( '/edit-tabs.php?method=deleteAttribute', window.location.origin );

    const undo = confirm("Вы действительно хотите удалить атрибут? Действия будут применены безвозвратно");

    if (!undo) {
        return;
    }

    const formData = new FormData();
    formData.append('id', dbID);

    fetch(path, {
        method: 'POST',
        body: formData
    }).then( () => {
        document.querySelector(`#attribute-${dbID}`).remove();
    });
};

function sendForm( event ) {

    event.preventDefault();

    const action = event.target.getAttribute('action');
    const path = new URL( action, window.location.origin ).toString();

    const formData = new FormData();
    event.target.querySelectorAll('input').forEach(input => {

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

    fetch(path, {
        method: 'POST',
        body: formData,
    })
    .then( () => {

        //clear inputs if needed
        if ( event.target.dataset.flushinputs ) {
            event.target.reset();
        }
    });

    return false;
}