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
  res.json({ Status: "ok" });
});

//this endpoint is working!!! , we use this endpoint for look for user by id
app.get("/users/:id", async (req, res) => {
  const users = await userRepository.readJSON();
  
  const id = parseInt(req.params.id);

  const user = users.find((user) => {
    return user.id === id;
  });

  if (!user) {
    throw new Error("El usuario no existe");

  }

  res.json(user);
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

//Se exporto app para ejecutarse en el fichero server.js
export default app;
