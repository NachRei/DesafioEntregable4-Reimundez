const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const exphbs = require('express-handlebars');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Configurar Handlebars
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Configurar las rutas y sockets
const productsRouter = require('./api/products');
const cartsRouter = require('./api/carts');
const viewsRouter = require('./views');

app.use(express.json());
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter(io));  // Pasar la instancia de "io" al viewsRouter

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
