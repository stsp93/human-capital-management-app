    const form = document.getElementById('findEmployee');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const searchValue = document.getElementById('search').value;
        console.log(form.getAttribute('action'));
        const action = form.getAttribute('action')+`?findEmployee=${searchValue}`;

        form.setAttribute('action', action);

        form.submit();
    });