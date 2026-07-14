## Pregunta guia ¿Por qué nodemon va en devDependencies y express en dependencies?

Respuesta = Nodemon va en devDepencies porque es una depencia exclusiva para el entorno de desarrollo no deberia subirse a produccion ya que no se utilizara  mientras que express es una depencia para producion ya que nuestra aplicacion la necesitara cuando este en funcionamiento

## Módulos ES vs CommonJS: elige uno y mantén consistencia ("type": "module" en package.json → import/export; si no → require/module.exports)

Respuesta escogi ESmodules porque es el estandar actualmente xd

## Reto rápido (Event Loop)
Con la corrección del listen, responde:

¿Qué archivo es el punto de entrada cuando ejecutas npm run dev?

cuando hago eso se ejecuta el server.js con la dependencia nodemon

¿En qué orden se ejecutan import app from './app.js' y el callback de listen?

Investigando descubri que el import es asincrono asi que va cargando mientras lee las lineas de codigo ,es decir , no se detiene.

El app.listen es asincrono se . lo pude ver con un console.log