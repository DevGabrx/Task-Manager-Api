import { randomInt } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const storagePath = path.resolve(__dirname, "../../data/users.json");



//this function allow to write users

//this function allow to read users
async function readJSON(){


  try {
    const contenido = await fs.readFile(storagePath, "utf8");

    const datos = JSON.parse(contenido);
    return datos;
  } catch (error) {

    if(error.code === 'ENOENT'){
        return [];
    }
    console.log(`Ha ocurrido un error desconocido ${error}`);
  }
}

async function WriteJSON(users){

  await fs.writeFile(storagePath,JSON.stringify(users,null,2))
    
}

async function addUser(id,nombre,correo,isDeleted=true){

  const nuevoUsuario = {
    "user.id" : id,
    "user.nombre" : nombre,
    "user.correo" : correo,
    "isDeleted" : isDeleted
  }

  const users = await readJSON()

  users.push(nuevoUsuario)
  WriteJSON(users)
}

// createUsers()
// readJSON().then((usuarios) => {
//   console.log(usuarios);
// });

async function softDelete(id){

  //Extraer todos los usuarios
    const users = await readJSON()

    //Buscar al usuario por su ID
    const userIndex = users.findIndex((user) => {
    return user.id === id;
  })

  if(userIndex === -1){
    throw new Error("Error no se ha encontrado el usuario")
  }

  users[userIndex].isDeleted = true;

  //Escribir nuevamente 
  await WriteJSON(users)

  return 
}

export class UserRepository {
  async #readUsers() {}
}

export default {
    readJSON,
    WriteJSON,
    softDelete,
    addUser
};
