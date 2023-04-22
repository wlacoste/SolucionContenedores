# Andreani | React App Template

Incluye:
- `Eslint` de la compañia
- `Stylesystem` (Layout y ejemplos)
- `Testing` Ejemplos básicos
- `Stylelint` configuración base
- `Github Action` de Arquitectura (incluye Sonar)


Para poder instalar correctamente por favor dirigirse a la seccion de [configuración de arquitectura](http://localhost:8000/architecture-it/docs/Architecture_Packages/#npm)

----

### Comandos Utiles

- `test` Corre jest solamente
- `test:coverage`Ejecuta jest y el coverage
- `test:watch` Ejecuta jest en watch mode
- `test:specific` Ejecuta jest en watch mode pero con un filtro especifico
- `lint` Ejecuta Stylelint y ESlint
- `lint:fix`Ejecuta Stylelint, ESlint y arregla los errores
- `stylelint` Ejecuta Stylelint
- `stylelint:fix` Ejecuta Stylelint y arregla los errores
- `eslint` Ejecuta ESlint 
- `eslint:fix` Ejecuta ESlint y arregla los errores
- `docker:build` Ejecuta Docker y hace el build respectivo (se aconseja cambiar al nombre de la aplicación)
- `docker:start` Ejecuta Docker levanta la imagen construida anteriormente (se aconseja cambiar al nombre de la aplicación)

### Absolute paths

Agregamos en el `tsconfig.json` y en `jest.config.js` respectivamente una seccion para soportar **paths absolutos**. Es extremadamente útil cuando el proyecto va creciendo en estructura y complejidad de carpetas anidadas.

Para evitar el uso de imports anidados y poco legibles como: `../../../../../../components/Button` por `components/Button`

Por ejemplo:

```js
import createEmotionCache from "components/HeaderNavBar";
```
