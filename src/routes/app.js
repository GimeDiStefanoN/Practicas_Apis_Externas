//requerir modulos
const {Router} = require('express');

//utilizamos el metodo router para definir rutas
const router = new Router();

//creo la primera ruta
router.get("/", (req, res)=>{
    res.render("index");
});

router.get("/films", async (req, res)=>{

    //CODIGO QUE BRINDA RAPIDAPI
    const url = 'https://online-movie-database.p.rapidapi.com/auto-complete?q=SPIDERMAN';
    const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '48c2dcf872mshc65de31c24aeaa4p1c1d14jsna9f59685ac1a',
        'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
    }
    };

    try{
        fetch(url, options)
        .then(res => res.json())
        .then(json => {
            console.log(json)
            const pelis = json.d.map(peli =>{
            return {
                id: peli.id,
                title:peli.l,
                year:peli.y || 'Sin información',
                imageUrl: peli.i && peli.i.image && peli.i.image.Url ? peli.i.image.Url : 'https://culturageek.com.ar/wp-content/uploads/2023/01/Diseno-sin-titulo-2023-01-30T140604.036.jpg'
                };
            })
            return Promise.all(pelis);
        })
        .then(pelis => {
            res.render('films.ejs', { pelis });
          })
        //return res.send(json)  //debo retornar los datos obtenidos para verlo en el endpoint
    
    } 
    catch(error) {
            console.error('error:', error);
            res.status(500).send('Ha ocurrido un error al obtener las películas.');
    }  
});

router.get("/starWars", async(req, res)=>{
    fetch(`https://swapi.dev/api/people`)
  .then(response => response.json())
  .then(data => {
      console.log("🚀 ~ file: app.js:59 ~ router.get ~ data:", data)
      const personajes = data.results.map(personaje =>{
        return{
            name: personaje.name,
            date: personaje.birth_year,
            gender: personaje.gender
        }
      })
      return res.send(data)
     //res.render("starWars");
  });
});

module.exports = router;
