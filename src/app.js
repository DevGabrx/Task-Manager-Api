import express from 'express'

const app = express()
const puerto = 4030

app.use(express.json())

app.get('/health',(req,res)=>{
    
    res.send(`Solicitud de respuesta  = ${res.statusCode}`)
})

app.listen(puerto,()=>{
    console.log(`Servidor andando!!! en http://localhost:${puerto}}`)
})