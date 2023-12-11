const textarea = document.getElementById("floatingTextarea");
const btnguardar = document.querySelector(".guardar");
let clicked = false;

//comenta toda esta parte para hacer las pruebas
// export function addLineBreakOnClick() {
//     textarea.addEventListener("click", function() {
//         if (!clicked) {
//           textarea.value += "\n";
//           clicked = true;
//         }
//     });
// }


function getViajeID(){
   // Realizar una solicitud para obtener el ID del viaje desde tu API
    fetch('http://54.196.52.240:3000/viaje/1', {
      "method": "GET"
    })
        .then(response => {
            if (response.ok) {
                return response.json(); // Convertir la respuesta a JSON
            } else {
              throw new Error('Error al obtener el ID del viaje');
            }

        })
        .then(data => {
          idViaje = data.id;
          console.log('ID del viaje:', idViaje);
          
          // After getting the trip ID, attach the event listener to the "Guardar" button
          btnguardar.addEventListener('click', function() {
              if (idViaje !== null) {
                const textarea = document.querySelector("#floatingTextarea");
                const contenidoNota = textarea.value.trim(); // Trim to remove leading/trailing whitespace
          
                if (contenidoNota === '') {
                  // Show message for empty note
                  alert('Please write a note before saving.');
                  return; // Stop execution if the note is empty
                }

                PostNotaViaje(idViaje);
              } else {
                  console.error('ID del viaje no disponible');
              }
          });
      })
      .catch(error => {
          console.error('Error: ', error);
      });
  }
  
function PostNotaViaje(idViaje) {
  const textarea = document.querySelector("#floatingTextarea");
  const contenidoNota = textarea.value; // Use semicolons to end statements
    
  fetch(`http://54.196.52.240:3000/viajes/nota`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: idViaje,
      notas: contenidoNota
    })
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        console.error('Response:', response); // Log the response for troubleshooting
        throw new Error('Error al guardar la nota');
      }
    })
    .then(data => {
      console.log('Nota guardada:', data);
      // Additional actions after successfully saving the note
    })
    .catch(error => {
      console.error('Error al guardar la nota:', error);
    });
}
  


// esta funcion
// addLineBreakOnClick()
getViajeID()

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = { getViajeID, PostNotaViaje };
}