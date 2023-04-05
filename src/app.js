//requerir modulos
const express = require('express');
const path = require('path');

//inicializar express
const app = express();

//configuro archivos estaticos
const viewsPath = path.join(__dirname, 'views');
const publicPath = path.join(__dirname, '../public');

//configuro
const PORT = 3000
app.set('view engine', 'ejs');
app.set('views', viewsPath);

//middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static(publicPath));

//defino rutas
app.use(require('./routes/app.js'));

//inicio servidor
app.listen(PORT, () => console.log(`Se esta escuchando en el puerto ${PORT}!`));



//api
//https://api.themoviedb.org/3/movie/550?api_key=15e437a6e0a7132a6481247878fcbcf3