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
    console.log(`Ha ocurrido un error ${error}`);
  }
}

async function createUsers(){

    const users =  await readJSON()
    

    const newUser = {
    "id": 6,
    "nombre": "Andres Mora",
    "correo": "andres.mora@example.com",
    "isDeleted": false
  }

  
  users.push(newUser)

  await fs.writeFile(storagePath,JSON.stringify(users,null,2))
    
}

createUsers()
readJSON().then((usuarios) => {
  console.log(usuarios);
});

export class UserRepository {
  async #readUsers() {}
}

export default {
    createUsers,
    readJSON
};

//TENGO UN ERROR EN EL CONSOLE LOG NO ME ESTA TOMANDO EL ANDRES MORA :)