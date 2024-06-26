document.addEventListener('DOMContentLoaded', function() {
    const odontologoForm = document.getElementById('odontologoForm');
    const odontologosTable = document.getElementById('odontologosTable').getElementsByTagName('tbody')[0];

    odontologoForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(odontologoForm);
        const data = {
            numMatricula: formData.get('numMatricula'),
            nombre: formData.get('nombre'),
            apellido: formData.get('apellido')
        };

        fetch('/api/odontologos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(odontologo => {
            // Clear form
            odontologoForm.reset();

            // Add new odontologo to the table
            const newRow = odontologosTable.insertRow();
            newRow.innerHTML = `
                <td>${odontologo.numMatricula}</td>
                <td>${odontologo.nombre}</td>
                <td>${odontologo.apellido}</td>
            `;

            // Show success message
            showAlert('Odontólogo agregado exitosamente', 'success');
        })
        .catch(error => {
            console.error('Error:', error);
            // Show error message
            showAlert('Error al agregar odontólogo', 'danger');
        });
    });

    fetch('/api/odontologos')
        .then(response => response.json())
        .then(odontologos => {
            odontologos.forEach(odontologo => {
                const newRow = odontologosTable.insertRow();
                newRow.innerHTML = `
                    <td>${odontologo.numMatricula}</td>
                    <td>${odontologo.nombre}</td>
                    <td>${odontologo.apellido}</td>
                `;
            });
        })
        .catch(error => console.error('Error:', error));

    function showAlert(message, type) {
        const alertContainer = document.createElement('div');
        alertContainer.className = `alert alert-${type}`;
        alertContainer.textContent = message;
        document.body.prepend(alertContainer);

        setTimeout(() => {
            alertContainer.remove();
        }, 3000);
    }
});
