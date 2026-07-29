import { randomUUID } from 'crypto';
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const storagePath = path.resolve(__dirname, "../../data/users.json");


export class userRepository {

  static filePath = storagePath

   static async readJSON() {
    try {

      const content = await fs.readFile(this.filePath, "utf8")
      const users = JSON.parse(content)

      return users;

    }catch(error){

      // Si el archivo no existe (error ENOENT), lo creamos vacío y retornamos un array vacío
      if (error.code === 'ENOENT') {
        await this.writeJSON([]);
        return [];
      }
      if (error instanceof SyntaxError) {
        throw new Error(`El archivo ${this.filePath} no contiene un JSON válido.`);
      }
      throw error;
    }
  }

  static async writeJSON(data) {
    await fs.writeFile(this.filePath, JSON.stringify(data, null, 2), 'utf-8')
  }

  //agregar usuario
  static async addUser({nombre, correo }) {

  const nuevoUsuario = {
    "id": randomUUID(),
    "nombre": nombre,
    "correo": correo,
    "isDeleted": false
  }

  const users = await this.readJSON()

  users.push(nuevoUsuario)
  await this.writeJSON(users)
  return nuevoUsuario
}

static async logicalDelete(id) {

  //Extraer todos los usuarios
  const users = await this.readJSON()

  //Buscar al usuario por su ID
  const userIndex = users.findIndex((user) => {
    return user.id === id;
  })

  if (userIndex === -1) {
    throw new Error("Error no se ha encontrado el usuario")
  }

  users[userIndex].isDeleted = true;

  //Escribir nuevamente 
  await this.writeJSON(users)

  return
}

//Obtener todos los usuarios
static async getAll() {

  const users = await this.readJSON()

  return users.filter(user => !user.isDeleted);
}

static async getByID(id){

  const users = await this.readJSON()

  const userbyID = users.find((user)=>{
    return user.id===id
  })

  if(!userbyID){
    throw new Error("El usuario no existe")
  }

  return userbyID;
}

static async updateUser(id,newData){

  const users = await this.readJSON()

    const index = users.findIndex((user) => {
    return user.id === id;
  })


  if (index === -1) {
    throw new Error("Error no se ha encontrado el usuario")
  }

  users[index] = {
    ...users[index], // Mantiene campos anteriores (id, isDeleted, etc.)
    ...newData,
    id 
  };

  await this.writeJSON(users)

  return users[index]

}

  
}

