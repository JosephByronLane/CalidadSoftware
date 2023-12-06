const textarea = document.getElementById("floatingTextarea");
const btnguardar = document.querySelector(".guardar");
let clicked = false;

function addLineBreakOnClick() {
    textarea.addEventListener("click", function() {
        if (!clicked) {
          textarea.value += "\n";
          clicked = true;
        }
    });
}

function getViajeID(){
  btnguardar.addEventListener('click', function() {
    // Realizar una solicitud para obtener el ID del viaje desde tu API
    fetch('https://cors-anywhere.herokuapp.com/http://54.196.52.240:3000/viajes/1', {
      "method": "GET"
    })
        .then(response => {
            if (response.ok) {
                return response.json(); // Convertir la respuesta a JSON
            } else {
              console.log(response)
              throw new Error('Error al obtener el ID del viaje');
            }

        })
        .then(data => {
            const idViaje = data.id; // Suponiendo que el ID del viaje está en la propiedad 'id' del objeto devuelto
            console.log('ID del viaje:', idViaje);

            // Aquí puedes realizar más acciones con el ID del viaje, como enviarlo a otro endpoint o mostrarlo en la interfaz
        })
        .catch(error => {
            console.error('Error:', error);
        });
});
}



addLineBreakOnClick()
getViajeID()