document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('viajeForm');
    var btnGuardar = document.getElementById('btnGuardar');

    btnGuardar.addEventListener('click', function () {
        // Obtener valores de los campos
        var nombreViaje = document.getElementById('nombreViaje').value;
        var destino = document.getElementById('destino').value;
        var fechaInicio = document.getElementById('fechaInicio').value;
        var fechaFinalizacion = document.getElementById('fechaFinalizacion').value;
        var tipoViaje = document.getElementById('tipoViaje').value;

        // Validar que todos los campos obligatorios estén completos
        if (!nombreViaje || !destino || !fechaInicio || !fechaFinalizacion || !tipoViaje) {
            alert('Por favor, completa todos los campos del formulario.');
        } else {
            // Validar que las fechas no sean pasadas
            var hoy = new Date().toISOString().split('T')[0]; // Obtener la fecha actual en formato ISO

            if (fechaInicio < hoy || fechaFinalizacion < hoy) {
                alert('Por favor, ingresa fechas válidas. Las fechas no pueden ser anteriores a hoy.');
            } else if (fechaInicio > fechaFinalizacion) {
                alert('La fecha de inicio no puede ser posterior a la fecha de finalización.');
            } else {
                // Todos los campos están completos y las fechas son válidas, puedes enviar el formulario o realizar otras acciones aquí
                console.log('Formulario enviado correctamente.');

                // Crear objeto con datos del formulario en el formato requerido
                var formData = {
                    nombre: nombreViaje,
                    fecha_inicio: fechaInicio + 'T00:00:00.000Z',
                    fecha_final: fechaFinalizacion + 'T00:00:00.000Z',
                    destino: destino,
                    tipo: tipoViaje
                };

                // Configurar opciones para la solicitud fetch
                var requestOptions = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                };

                // Realizar la solicitud fetch a tu API
                fetch('http://54.196.52.240:3000/viaje', requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        // Manejar la respuesta de la API
                        console.log('Respuesta de la API:', data);

                        // Mostrar un mensaje indicando que el viaje ha sido guardado
                        alert('¡Viaje guardado exitosamente!');
                    })
                    .catch(error => {
                        console.error('Error al enviar la solicitud:', error);
                        // Puedes manejar los errores de la solicitud aquí
                    });
            }
        }
    });
});
