import express from 'express';
import Producto from './class/producto.js';
import { contenido } from './module/app.js';

/**
 * DATOS A MANIPULAR
 */
let productos = [];

//Creando algunos Productos para pruebas
//Comentar para verificar el error de no existen productos.
for (let i = 0; i < 2; i++) {
  const objDatos = contenido();
  const objProducto = new Producto(
    objDatos.title,
    objDatos.price,
    objDatos.thumbnail,
    i + 1
  );
  productos.push(objProducto);
}

/** INICIALIZACION API con EXPRESS */
const app = express();
const puerto = 8080;
const server = app.listen(puerto, () =>
  console.log('Server up en puerto', puerto)
);

server.on('error', (err) => {
  console.log('ERROR ATAJADO', err);
});

/**
 * DEFINICION RUTAS BASICAS
 */

//Ruta para Listar todos los producto existentes
app.get('/api/productos/listar', (req, res) => {
  if (productos.length < 1) {
    return res.status(400).json({
      error: 'No hay productos cargados',
    });
  }

  res.json({
    productos,
  });
});

//Ruta para listar un producto especifico por su id
app.get('/api/productos/listar/:id', (req, res) => {
  const id = parseInt(req.params.id);

  if (id < 1 || id > productos.length) {
    return res.status(400).json({
      error: 'Producto no encontrado',
    });
  }

  const product = productos[id - 1];
  res.json({
    product,
  });
});

// Modulos usados para aceptar el metodo post con JSON o urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Ruta para guardar un producto nuevo si se cumplen los parámetros necesarios.
app.post('/api/guardar', (req, res) => {
  const body = req.body;
  const errorGuardar = () => {
    return res.status(400).json({
      error: 'Parametros no validos',
    });
  };

  if (body.title === undefined) {
    errorGuardar();
  }

  if (body.price === undefined) {
    errorGuardar();
  }

  if (isNaN(parseFloat(body.price))) {
    errorGuardar();
  }

  if (body.thumbnail === undefined) {
    errorGuardar();
  }

  const objProducto = new Producto(
    body.title,
    body.price,
    body.thumbnail,
    productos.length + 1
  );

  productos.push(objProducto);

  res.json({
    objProducto,
  });
});
