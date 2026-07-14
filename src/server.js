import app from './app.js'

//puerto
const puerto = process.env.PORT || 3000;

app.listen(puerto, () => {

    console.log(`Iniciando el servidor en el puerto http://localhost:${puerto}`)
})

console.log("¿Me ejecuto antes o después?")