import express from 'express'

const app = express()



//middleware
app.use(express.json())

//Se quita el x-powered-by por seguridad"
app.disable('x-powered-by')


//Se responde con un json
app.get('/health',(req,res)=>{
    
    res.json({"Status" : "ok"})
    
})

//Se exporto app para ejecutarse en el fichero server.js
export default app;