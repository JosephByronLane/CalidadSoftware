import { Actividad } from "../models/Actividad";
import { Imagen } from "../models/Imagen";

const request = require('supertest');
const app = 'http://localhost:3000'; 
console.log("-------------------------------------------")
console.log("-------------------------------------------")
console.log("-------------------------------------------")
console.log("-------------------------------------------")


describe('GET /viaje', () => {
  it('should retrieve all viajes with correct structure', async () => {
    const res = await request(app).get('/viaje');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
    res.body.forEach((viaje:any)  => {
      expect(viaje).toHaveProperty('nombre');
      expect(viaje).toHaveProperty('fecha_inicio');
      expect(viaje).toHaveProperty('fecha_final');
      expect(viaje).toHaveProperty('tipo');
      expect(viaje).toHaveProperty('notas');
    });
  });
  it('should handle malformed request gracefully', async () => {
    const res = await request(app).get('/viaje?invalidParam=abc');
    expect(res.statusCode).not.toBe(500);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should ignore unexpected query parameters', async () => {
    const res = await request(app).get('/viaje?unusedParam=123');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

});

const testData = {
  nombre: 'Test Viaje', 
  fecha_inicio: '2023-12-15T00:00:00.000Z', 
  fecha_final: '2023-12-22T00:00:00.000Z', 
  tipo: 'Vacation',
  destino:"test"
};
let lastaddedId = 0 
describe('POST /viaje', () => {
  it('should create a new viaje with valid data', async () => {

    const res = await request(app)
      .post('/viaje')
      .send(testData);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('viaje');
    const viaje = res.body.viaje;
    lastaddedId = res.body.viaje.id;
    expect(viaje).toHaveProperty('nombre', testData.nombre);
    expect(viaje).toHaveProperty('fecha_inicio', testData.fecha_inicio);
    expect(viaje).toHaveProperty('fecha_final', testData.fecha_final);
    expect(viaje).toHaveProperty('tipo', testData.tipo);
    expect(viaje).toHaveProperty('destino', testData.destino);

  });
  it('should return 400 when required fields are missing', async () => {
    const res = await request(app)
      .post('/viaje')
      .send({ nombre: 'Test Viaje', fecha_inicio: '2023-12-15T00:00:00.000Z' });
    expect(res.statusCode).toEqual(400);
  });

  it('should return 400 for empty payload', async () => {
    const res = await request(app)
      .post('/viaje')
      .send({});
    expect(res.statusCode).toEqual(400);
  });
});

let lastaddedId2 = 0;
let testData2= {}
describe('POST /viajes/nota', () => {
  beforeAll(async () => {
    const res = await request(app).get('/viaje');
    expect(res.statusCode).toEqual(200);
    const viajes = res.body;

    if (viajes.length > 0) {
      lastaddedId2 = viajes[viajes.length - 1].id;
      testData2 = {
        id: lastaddedId2,
        notas: "test"
      };
    }
  });

  it('should add notes to a viaje and return the updated viaje with correct structure', async () => {
    const res = await request(app)
      .post('/viajes/nota')
      .send(testData2);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('viaje');
    const viaje = res.body.viaje;

    expect(viaje).toHaveProperty('nombre', testData.nombre); // Assumes testData.nombre exists
    expect(viaje).toHaveProperty('fecha_inicio', testData.fecha_inicio); // Assumes testData.fecha_inicio exists
    expect(viaje).toHaveProperty('fecha_final', testData.fecha_final); // Assumes testData.fecha_final exists
    expect(viaje).toHaveProperty('tipo', testData.tipo); // Assumes testData.tipo exists
    expect(viaje).toHaveProperty('notas', "test");
  });


  it('should return 400 if id or notas are missing', async () => {
    const res = await request(app).post('/viajes/nota').send(
      { 
        id: 1
       });
    expect(res.statusCode).toEqual(400);
  });

  it('should return 400 for invalid id type', async () => {
    const res = await request(app).post('/viajes/nota').send(
      { 
        id: 'asdfasdfasdf',
        notas: 'Test Note'
     });
    expect(res.statusCode).toEqual(404);
  });

  it('should return 400 for empty notes', async () => {
    const res = await request(app).post('/viajes/nota').send(
      {
         id: 1,
          notas: ''
     });
    expect(res.statusCode).toEqual(400);
  });


});
describe('GET /viaje/:id', () => {
  beforeAll(async () => {
    const res = await request(app).get('/viaje');
    expect(res.statusCode).toEqual(200);
    const viajes = res.body;

    if (viajes.length > 0) {
      lastaddedId2 = viajes[viajes.length - 1].id;
      testData2 = {
        id: lastaddedId2,
        notas: "test"
      };
    }
  });
  it('should retrieve a viaje by id with correct structure', async () => {
    const res = await request(app)
      .get(`/viaje/${lastaddedId}`)
    expect(res.statusCode).toEqual(200);
    const viaje = res.body;
    lastaddedId = viaje.id;
    expect(viaje).toHaveProperty('nombre', testData.nombre);
    expect(viaje).toHaveProperty('fecha_inicio', testData.fecha_inicio);
    expect(viaje).toHaveProperty('fecha_final', testData.fecha_final);
    expect(viaje).toHaveProperty('tipo', testData.tipo);
    expect(viaje).toHaveProperty('notas', "test");

  });
  it('should return 404 for a non-existent viaje', async () => {
    const nonExistentId = 99999;
    const res = await request(app).get(`/viaje/${nonExistentId}`);
    expect(res.statusCode).toEqual(404);
  });

  it('should return 400 for an invalid id format', async () => {
    const invalidId = 'abc'; 
    const res = await request(app).get(`/viaje/${invalidId}`);
    expect(res.statusCode).toEqual(500);
  });
  let results: any;
  it('should return 404 for a malformed URL', async () => {
    const res = await request(app).get(`/viaje/${results}`);
    expect(res.statusCode).toEqual(500);
  });
});

const testData3 = {
  nombre: "Caminata en el parqueHOLA",
  ubicacion: "Parque Central",
  fecha_inicio: "2023-12-01T09:00:00.000Z",
  fecha_final: "2023-12-01T11:00:00.000Z"
};

describe('POST /viaje/:viajeId/actividad', () => {
  beforeAll(async () => {
    const res = await request(app).get('/viaje');
    expect(res.statusCode).toEqual(200);
    const viajes = res.body;

    if (viajes.length > 0) {
      lastaddedId2 = viajes[viajes.length - 1].id;
      testData2 = {
        id: lastaddedId2,
        notas: "test"
      };
    }
  });
  it('should create a new actividad', async () => {

    const res = await request(app)
      .post(`/viaje/${lastaddedId2}/actividad`)
      .send(testData3);

    expect(res.statusCode).toEqual(201);
    
    expect(res.body).toHaveProperty('nombre', testData3.nombre);
    expect(res.body).toHaveProperty('ubicacion', testData3.ubicacion);
    expect(res.body).toHaveProperty('fecha_inicio', testData3.fecha_inicio);
    expect(res.body).toHaveProperty('fecha_final', testData3.fecha_final);

  });

  it('should return 400 when required fields are missing', async () => {
    const res = await request(app).post('/viaje/1/actividad').send({});
    expect(res.statusCode).toEqual(500);
  });

  it('should return 404 for a non-existent viaje', async () => {
    const res = await request(app).post('/viaje/9999/actividad').send({ });
    expect(res.statusCode).toEqual(404);
  });
});


describe('GET /viaje/:viajeId/actividad', () => {
  beforeAll(async () => {
    const res = await request(app).get('/viaje');
    expect(res.statusCode).toEqual(200);
    const viajes = res.body;

    if (viajes.length > 0) {
      lastaddedId2 = viajes[viajes.length - 1].id;
    }
  });
  it('should retrieve all actividades with correct structure', async () => {
    const res = await request(app).get(`/viaje/${lastaddedId2}/actividad`);
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
    res.body.forEach((actividad:Actividad)  => {
      expect(actividad).toHaveProperty('nombre', testData3.nombre);
      expect(actividad).toHaveProperty('ubicacion', testData3.ubicacion);
      expect(actividad).toHaveProperty('fecha_inicio', testData3.fecha_inicio);
      expect(actividad).toHaveProperty('fecha_final', testData3.fecha_final);
    });
  });
  it('should return 404 for a non-existent viaje', async () => {
    const res = await request(app).get(`/viaje/99999/actividad`);
    expect(res.statusCode).toEqual(404);
  });
  it('should return 400 for an invalid viajeId format', async () => {
    const res = await request(app).get(`/viaje/abc/actividad`);
    expect(res.statusCode).toEqual(500);
  });});




describe('GET /viaje/:viajeId/actividad/:actividadId', () => {
  let validId: number;

  beforeAll(async () => {
    const resget = await request(app).get('/viaje');
    expect(resget.statusCode).toEqual(200);
    const viajes = resget.body;

    if (viajes.length > 0) {
      lastaddedId2 = viajes[viajes.length - 1].id;

    }
    const res = await request(app).get(`/viaje/${lastaddedId2}/actividad`);
    const actividades = res.body;

    if (actividades.length > 0) {
      validId = actividades[0].id; 
    }
  });

  it('should retrieve a specific actividad with correct structure', async () => {
    const res = await request(app).get(`/viaje/${lastaddedId2}/actividad/${validId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('nombre', testData3.nombre);
    expect(res.body).toHaveProperty('ubicacion', testData3.ubicacion);
    expect(res.body).toHaveProperty('fecha_inicio', testData3.fecha_inicio);
    expect(res.body).toHaveProperty('fecha_final', testData3.fecha_final);
  });

  it('should return 404 for a non-existent actividad', async () => {
    const nonExistentActividadId = 99999;
    const res = await request(app).get(`/viaje/1/actividad/${nonExistentActividadId}`);
    expect(res.statusCode).toEqual(404);
  });

  it('should return 400 for an invalid actividadId format', async () => {
    const invalidActividadId = 'abc';
    const res = await request(app).get(`/viaje/1/actividad/${invalidActividadId}`);
    expect(res.statusCode).toEqual(500);
  });});




describe('POST /viaje/:viajeId/actividad/:actividadId/imagen', () => {
  let validId: number;

  beforeAll(async () => {
    const resget = await request(app).get('/viaje');
    expect(resget.statusCode).toEqual(200);
    const viajes = resget.body;

    if (viajes.length > 0) {
      lastaddedId2 = viajes[viajes.length - 1].id;
      console.log(lastaddedId2)
    }
    const res = await request(app).get(`/viaje/${lastaddedId2}/actividad`);
    const actividades = res.body;
    console.log(actividades)
    if (actividades.length > 0) {
      validId = actividades[0].id; 
    }
  });

  it('should add a new imagen', async () => {
    const res = await request(app)
      .post(`/viaje/${lastaddedId2}/actividad/${validId}/imagen`)
      .send({ link: 'https://www.reddit.com/media?url=https%3A%2F%2Fi.redd.it%2Fguprstzj3yxa1.jpg' });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('direccion', 'https://www.reddit.com/media?url=https%3A%2F%2Fi.redd.it%2Fguprstzj3yxa1.jpg');
  });

  it('should return 400 for missing or invalid data', async () => {
    const res = await request(app).post(`/viaje/${lastaddedId2}/actividad/${validId}/imagen`).send({});
    expect(res.statusCode). toEqual(500);
  });

  it('should return 404 for non-existent actividad or viaje', async () => {
    const res = await request(app).post('/viaje/9999/actividad/9999/imagen').send({ link: 'https://www.reddit.com/media?url=https%3A%2F%2Fi.redd.it%2Fguprstzj3yxa1.jpg' });
    expect(res.statusCode).toEqual(404);
  });  
});

describe('GET /viaje/:viajeId/actividad/:actividadId/imagen', () => {
  let validId: number;

  beforeAll(async () => {
    const resget = await request(app).get('/viaje');
    expect(resget.statusCode).toEqual(200);
    const viajes = resget.body;

    if (viajes.length > 0) {
      lastaddedId2 = viajes[viajes.length - 1].id;
      console.log(lastaddedId2)
    }
    const res = await request(app).get(`/viaje/${lastaddedId2}/actividad`);
    const actividades = res.body;
    if (actividades.length > 0) {
      validId = actividades[0].id; 
      console.log(validId)

    }
  });
  it('should retrieve all imagenes for a actividad', async () => {
    const res = await request(app).get(`/viaje/${lastaddedId2}/actividad/${validId}/imagen`); 
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
    res.body.forEach((imagen:Imagen) => {
      expect(imagen).toHaveProperty('direccion');
    });
  });

  it('should return 404 for a non-existent actividad or viaje', async () => {
    const res = await request(app).get(`/viaje/9999/actividad/9999/imagen`);
    expect(res.statusCode).toEqual(404);
  });
});

describe('GET /viaje/:viajeId/actividad/:actividadId/imagen/:imagenId', () => {
  let validId: number;
  let validIdimg: number;

  beforeAll(async () => {
    const resget = await request(app).get('/viaje');
    expect(resget.statusCode).toEqual(200);
    const viajes = resget.body;
    console.log("-------------------------")
    if (viajes.length > 0) {
      lastaddedId2 = viajes[viajes.length - 1].id;
      console.log(lastaddedId2)
    }
    const res = await request(app).get(`/viaje/${lastaddedId2}/actividad`);
    const actividades = res.body;
    if (actividades.length > 0) {
      validId = actividades[0].id; 
      console.log(validId)

    }
    const res2 = await request(app).get(`/viaje/${lastaddedId2}/actividad/${validId}/imagen`);
    if (res2.body.length > 0) {
      validIdimg = res2.body[0].id;
      console.log(validIdimg)

    }
  });

  it('should retrieve a specific imagen for a actividad', async () => {
    const res = await request(app).get(`/viaje/${lastaddedId2}/actividad/${validId}/imagen/${validIdimg}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('direccion');
  });

  it('should return 404 for a non-existent imagen, actividad, or viaje', async () => {
    const res = await request(app).get(`/viaje/${lastaddedId2}/actividad/${validId}/imagen/9999`);
    expect(res.statusCode).toEqual(404);
  });

  it('should return 400 for an invalid imagenId format', async () => {
    const res = await request(app).get(`/viaje/1/actividad/${validId}/imagen/abc`);
    expect(res.statusCode).toEqual(500);
  });

});


describe('DELETE /viaje/:viajeId/actividad/:actividadId', () => {
  let validId: number;
  let lastaddedId3: number;
  beforeAll(async () => {
    const resget = await request(app).get('/viaje');
    expect(resget.statusCode).toEqual(200);
    const viajes = resget.body;

    if (viajes.length > 0) {
      lastaddedId3 = viajes[viajes.length - 1].id;
    }
    const res = await request(app).get(`/viaje/${lastaddedId2}/actividad`);
    const actividades = res.body;

    if (actividades.length > 0) {
      validId = actividades[0].id; 
    }
  });

  it('should delete an actividad', async () => {
    const res = await request(app).delete(`/viaje/${lastaddedId3}/actividad/${validId}`);
    expect(res.statusCode).toEqual(200);
  });

  it('should return 404 for a non-existent actividad or viaje', async () => {
    const res = await request(app).delete('/viaje/9999/actividad/9999');
    expect(res.statusCode).toEqual(404);
  });
  it('should return 400 for an invalid id format', async () => {
    const res = await request(app).delete(`/viaje/abc`);
    expect(res.statusCode).toEqual(404);
  });
});