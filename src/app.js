import express from "express";
import {userRepository} from "./repositories/userRepository.js";

const app = express();



//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Se quita el x-powered-by por seguridad"
app.disable('x-powered-by')

//Se responde con un json
app.get("/health", (req, res) => {
  res.json({ Status: "ok" , path : userRepository.filePath});
});

//this endpoint is working!!! , we use this endpoint for look for user by id
app.get("/users/:id", async (req, res) => {

  try{ 
      const id = parseInt(req.params.id)

  const user = await userRepository.getByID(id)

  res.status(200).json({resultado : user})

  }catch(error){
    res.status(404).json({Mensaje : error.message})
  }

});

//ENDPOINT PARA AGREGAR USUARIO

app.post("/users", async (req, res) => {

  try{
     const {nombre,correo} = req.body

  if (!nombre || !correo) {
      return res.status(400).json({ message: "Nombre y correo son obligatorios." });
    }


     const newUser = await userRepository.addUser({nombre , correo})

  res.status(201).json({ message: "Agregado correctamente", Usuario: newUser})

  }catch(error){
    res.status(500).json({message : `No funciono ${error.message}` })
  }

 
});

//ENDPOINT PARA ELIMINAR

app.delete("/users/:id", async (req, res) => {

  const id = parseInt(req.params.id);

  await userRepository.logicalDelete(id)

  return res.status(202).json({ message: "Usuario eliminado correctamente" })

});

app.get('/users', async (req, res) => {

  const todos = await userRepository.getAll()

  res.json({ TodosLosUsuarios: todos })
})

app.patch('/users/:id', async (req,res)=>{

  try{

    const id = parseInt(req.params.id)

    const newdata = req.body

    const userUpdate = await userRepository.updateUser(id,newdata)


    if (!newdata || Object.keys(newdata).length === 0) {
      return res.status(400).json({ 
        error: 'Debes proporcionar al menos un campo para actualizar.' 
      }); // 400 Bad Request
    }

    if(userUpdate){
      res.status(200).json({UsuarioActualizado: userUpdate})
    }


  }catch(error){
    res.status(500).json({mensaje : `Ha ocurrido un problema : ${error.message}`})
  }

  
  
 
}

)
//Se exporto app para ejecutarse en el fichero server.js
export default app;
