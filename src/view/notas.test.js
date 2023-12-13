  const { TextEncoder, TextDecoder } = require('util'); // For Node.js versions that support TextEncoder/TextDecoder
  global.TextEncoder = TextEncoder;
  global.TextDecoder = TextDecoder;

  const { JSDOM } = require('jsdom');

  // Mock the DOM environment before your tests run
  const { window } = new JSDOM('<!doctype html><html><body></body></html>');
  global.document = window.document;
  global.window = window;


  const fetchMock = require('jest-fetch-mock');
  fetchMock.enableMocks(); // Enable mocking fetch globally in your tests
  const { getViajeID, PostNotaViaje } = require('./notas'); // Replace with your actual file path

  describe('getViajeID function', () => {
    beforeEach(() => {
      fetch.resetMocks();
    });

    test('should fetch and get trip ID', async () => {
      fetch.mockResponseOnce(JSON.stringify({ id: 1 }));
      
      await getViajeID();

      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith('http://54.196.52.240:3000/viaje/1', { method: 'GET' });
    });
  });

  describe('PostNotaViaje function', () => {
    beforeEach(() => {
      fetch.resetMocks();
    });

    test('should post trip note', async () => {
      fetch.mockResponseOnce(JSON.stringify({}));

      document.body.innerHTML = '<textarea id="floatingTextarea"></textarea>';
      document.querySelector('#floatingTextarea').value = 'Test note';

      await PostNotaViaje(1);

      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith('http://54.196.52.240:3000/viajes/nota', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: 1, notas: 'Test note' })
      });
    });

    test('should not post trip note if textarea is empty', async () => {
      fetch.mockResponseOnce(JSON.stringify({}));
  
      document.body.innerHTML = '<textarea id="floatingTextarea"></textarea>';
      document.querySelector('#floatingTextarea').value = ''; // Set an empty value for the textarea
  
      await PostNotaViaje(1);
  
      expect(fetch).toHaveBeenCalledTimes(1); // Expect fetch to have been called
      expect(fetch).toHaveBeenCalledWith('http://54.196.52.240:3000/viajes/nota', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: 1, notas: '' }) // Validate the body sent in the fetch call
      });
    });   
  });

