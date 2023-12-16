document.addEventListener("DOMContentLoaded", function () {
    const dropArea = document.querySelector(".drop-area");
    const button = dropArea.querySelector("button");
    const input = dropArea.querySelector("#input-file");
    const dragText = dropArea.querySelector("#drag-text");
    let files;

    button.addEventListener("click", (e) => {
        input.click();
    });

    input.addEventListener("change", function (e) {
        files = this.files;
        dropArea.classList.add("active");
        showFiles(files);
        dropArea.classList.remove("active");
    });

    dropArea.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropArea.classList.add("active");
        dragText.textContent = "Suelta para subir los archivos";
    });

    dropArea.addEventListener("dragleave", (e) => {
        e.preventDefault();
        dropArea.classList.remove("active");
        dragText.textContent = "Arrastra y suelta imágenes";
    });

    dropArea.addEventListener("drop", (e) => {
        e.preventDefault();
        files = e.dataTransfer.files;
        showFiles(files);
        dropArea.classList.remove("active");
        dragText.textContent = "Arrastra y suelta imágenes";
    });

    function showFiles(files) {
        if (files.length == undefined) {
            processFile(files);
        } else {
            for (const file of files) {
                processFile(file);
            }
        }
    }

    function processFile(file) {
        const docType = file.type;
        const validExtensions = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];

        if (validExtensions.includes(docType)) {
            const fileReader = new FileReader();
            const id = `file-${Math.random().toString(32).substring(7)}`;

            fileReader.addEventListener("load", (e) => {
                const fileUrl = fileReader.result;
                const image = `
                    <div id="${id}" class="file-container">
                        <img src="${fileUrl}" alt="${file.name}" width="50">
                        <div class="status">
                            <span>${file.name}</span>
                            <span class="status-text">
                                loading...
                            </span>
                        </div>
                    </div>
                `;

                const html = document.querySelector(`#preview`).innerHTML;
                document.querySelector(`#preview`).innerHTML = image + html;

                // Llamar a uploadFile después de cargar el archivo
                uploadFile(file, id);
            });

            fileReader.readAsDataURL(file);
        } else {
            // archivo no válido
            alert("No es un archivo válido");
        }
    }

    async function uploadFile(file, id) {
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch('http://localhost:3001/upload', {
                method: "POST",
                body: formData,
            });

            const responseText = await response.text();
            console.log(responseText);

            const statusElement = document.querySelector(`#${id}.status-text`);
            if (statusElement) {
                statusElement.innerHTML = `<span class="success">Archivo subido correctamente...</span>`;
            } else {
                // console.error(`Elemento con id ${id}.status-text no encontrado en el DOM.`);
            }
        } catch (error) {
            console.error(error);
            console.error('Error al realizar la solicitud fetch.');
            // Puedes agregar más información sobre el error aquí
        }
    }
});
