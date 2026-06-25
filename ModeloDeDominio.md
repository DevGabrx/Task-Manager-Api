## Entidades


## Usuario
- ID(PK)
- nombre
- correo
- isDeleted

## Tareas
-idDueño(fk)
-idTarea(PK)
CreatedAt
-nombreTarea
estado
categoria enum(laborales,academicas y personales)
updatedAt
deletedTask


CATEGORIA NO ES UNA ENTIDAD ES SOLO PARA CALIFICAR LA TAREA 
Relacion entre usuario y tareas = 1 a Muchos




## Endpoints (borrador)
| Post | Crear Usuario | el cliente debera poder crear su usuario
|Post|crearTarea|El cliente debera propiconar los datos de la tarea para poder hacerlo debera tener un id valido(idDueño)|
|Get|Ver tareas |El cliente debera poder ver sus tareas|



El usuario debe poder ver/editar y borrar una tarea 


Metodo crear = post
Metodo leer = get
metodo actualizar = patch
metodo eliminar = delete 

Preguntas :

1 . Un usuario tiene muchas tareas y una tarea tiene una sola categoria

2. Estados = comenzar , en proceso , hecha . y la puede cambiar solamente el dueño de esa tarea 

3 . Implementa la persistencia en json ya que segun una IA me recomienda utilizar json ya que no se reiniciaran los datos y es la efectiva para este proyecto de aprendizaje

4. Borrado logico para evitar desastres 

Todavia no toquemos Auth 


RETO 1# 

[Cliente HTTP] → [Accede a la ruta] → [Controller] → [Services] →[Repositorio]-[Base de datos]

##Retos de asimilacion 

Respuesta el metodo find es O(n) siendo el tiempo de ejecucion proporcional a el tamaño de datos.


