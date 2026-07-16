import express from "express";
import userRepository from "./repositories/userRepository.js";

const app = express();

//middleware
app.use(express.json());

//Se quita el x-powered-by por seguridad"
app.disable("x-powered-by");

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

app.post("/agregar/:id/:nombre/:correo/:isDeleted", async(req,res)=>{
    

    const id = parseInt(req.params.id);
    const nombre = req.params.nombre;
    const correo = req.params.correo;
    

    userRepository.addUser(id,nombre,correo,true)

    res.json(200).json({message : "Agregado correctamente"})
});

//ENDPOINT PARA ELIMINAR

app.delete("/eliminar/:id", async (req, res) => {

  const id = parseInt(req.params.id);

 userRepository.softDelete(id)

  return res.status(202).json({message : "Usuario eliminado correctamente"})

});

//Se exporto app para ejecutarse en el fichero server.js
export default app;
