document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('ActivityForm');
    var btnGuardar = document.getElementById('btnGuardar');
    var formattedDateTimeStart, formattedDateTimeEnd;

    const Query = window.location.search
    const URLParameters = new URLSearchParams(Query)
    const HasViajeId = URLParameters.has('viajeId')
    const HasActividadId = URLParameters.has('actividadId')
    console.log('viajeId: ', HasViajeId)
    console.log('actividadId: ', HasActividadId)
    

    const ViajeId = URLParameters.get('viajeId')
    const ActividadId = URLParameters.get('actividadId')
    console.log('viajeId: ', ViajeId)
    console.log('actividadId: ', ActividadId)
    
    if(HasActividadId === true){
        MostrarDatos(ViajeId, ActividadId)
    }

    btnGuardar.addEventListener('click', function () {
        // Obtener valores de los campos
        var nombreActividad = document.getElementById('activityName').value;
        var Ubicacion = document.getElementById('location').value;
        formattedDateTimeStart = logDateTimeStart();
        formattedDateTimeEnd = logDateTimeEnd();
        console.log(nombreActividad)
        console.log(Ubicacion)

                // Todos los campos están completos y las fechas son válidas, puedes enviar el formulario o realizar otras acciones aquí
                console.log('Actividad enviada correctamente.');

                // Crear objeto con datos del formulario en el formato requerido
                var formData = {
                    nombre: nombreActividad,
                    fecha_inicio: formattedDateTimeStart,
                    fecha_final: formattedDateTimeEnd,
                    ubicacion: Ubicacion,
                };

                // Configurar opciones para la solicitud fetch
                var requestOptionsPost = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                };

                var requestOptionsPut = {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                };

                if(HasActividadId === false){
                    fetch(`http://54.196.52.240:3000/viaje/${ViajeId}/actividad`, requestOptionsPost)
                    .then(response => response.json())
                    .then(data => {
                        
                        // Manejar la respuesta de la API
                        console.log('Respuesta de la API:', data);
                        // Puedes agregar aquí lógica adicional según la respuesta de la API
                    })
                    .catch(error => {
                        console.error('Error al enviar la solicitud:', error);
                        // Puedes manejar los errores de la solicitud aquí
                    });
                }
                else{
                    fetch(`http://54.196.52.240:3000/viaje/${ViajeId}/actividad/${ActividadId}`, requestOptionsPut)
                    .then(response => response.json())
                    .then(data => {
                        
                        // Manejar la respuesta de la API
                        console.log('Respuesta de la API:', data);
                        // Puedes agregar aquí lógica adicional según la respuesta de la API
                    })
                    .catch(error => {
                        console.error('Error al enviar la solicitud:', error);
                        // Puedes manejar los errores de la solicitud aquí
                    });   
                }

                // Realizar la solicitud fetch a tu API
                

            // goBack();

            
            
        
    });

    
    
});

function MostrarDatos(ViajeId, ActividadId){
    fetch(`http://54.196.52.240:3000/viaje/${ViajeId}/actividad/${ActividadId}`)
        .then(response => response.json())
        .then(data => {
            
            var dateStart = new Date(data.fecha_inicio)
            var formatteddatestart = (dateStart.getDate() + 1) + '/' + (dateStart.getMonth() + 1) + '/' + dateStart.getFullYear()
            document.getElementById('fechaInicio').value = formatteddatestart

            var dateEnd = new Date(data.fecha_final)
            var formatteddateend = (dateEnd.getDate() + 1) + '/' + (dateEnd.getMonth() + 1) + '/' + dateEnd.getFullYear()
            document.getElementById('fechaFinalizacion').value = formatteddateend

            document.getElementById('activityName').value = data.nombre
            document.getElementById('location').value = data.ubicacion

        })
        .catch(error => {
            console.error('Error al enviar la solicitud:', error);
            // Puedes manejar los errores de la solicitud aquí
        });
}

function goBack() {
    window.history.back();
}

$(function(){
    $('#startDatePicker, #endDatePicker').datepicker({
        autoclose: true,
        todayHighlight: true,
    });
    $('#startTimePicker, #endTimePicker').timepicker({
        showMeridian: false,
        defaultTime: false
    });
    
    $('#startDatePicker').on('changeDate', function(e){
        const selectedDate = e.date;
        const selectedTime = $('#startTimePicker').val();
        logDateTimeStart(selectedDate, selectedTime);
    });

    $('#endDatePicker').on('changeDate', function(e){
        const selectedDate = e.date;
        const selectedTime = $('#endTimePicker').val();
        logDateTimeEnd(selectedDate, selectedTime);
    });
})

function logDateTimeStart() {
    const selectedDate = $('#startDatePicker').datepicker('getDate');
    const selectedTime = $('#startTimePicker').val();
    formattedDateTimeStart = getFormattedDateTime(selectedDate, selectedTime);
    console.log(formattedDateTimeStart); // Puedes agregar esto si quieres mostrarlo en la consola
    return formattedDateTimeStart;
}

function logDateTimeEnd() {
    const selectedDate = $('#endDatePicker').datepicker('getDate');
    const selectedTime = $('#endTimePicker').val();
    formattedDateTimeEnd = getFormattedDateTime(selectedDate, selectedTime);
    console.log(formattedDateTimeEnd); // Puedes agregar esto si quieres mostrarlo en la consola
    return formattedDateTimeEnd;
}

function getFormattedDateTime(date, time) {
    return moment(date).format('YYYY-MM-DDTHH:mm:ss.SSS');
}