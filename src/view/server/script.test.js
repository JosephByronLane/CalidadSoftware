
const { processFile } = require('./script');


describe('Pruebas de formato de archivo', () => {
  test('processFile debería manejar el formato PNG correctamente', () => {

    const pngFile = new File([''], 'imagen.png', { type: 'image/png' });


    const container = document.createElement('div');


    processFile(pngFile, container);


    const imageElement = container.querySelector('img');
    expect(imageElement).toBeTruthy();

    const statusElement = container.querySelector('.status-text span');
    expect(statusElement.textContent).toContain(pngFile.name);
  });

});
