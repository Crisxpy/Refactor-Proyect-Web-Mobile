# Guía de Buenas Prácticas de Desarrollo - Proyecto Refactorización

Este documento resume los estándares y prácticas que el equipo debe seguir para la refactorización del código "Spaghetti" a un sistema modular y profesional.

## 1. Gestión del Repositorio (Git & GitHub)

### Flujo de Trabajo (Git Flow Simplificado)

- **Rama `main`**: Solo contiene código estable y funcional. **Prohibido hacer commits directos.**
- **Rama `dev`**: Rama de integración donde se une el trabajo de todos los miembros.
- **Ramas de Feature (`dev-nombre`)**: Cada miembro trabaja en su propia rama para evitar conflictos.

### Comandos Clave

- `git pull origin dev`: Antes de empezar a trabajar, trae los cambios de tus compañeros.
- `git add .` + `git commit -m "mensaje descriptivo"`: Guarda tus avances localmente.
- `git push origin dev-nombre`: Sube tus cambios a tu rama en GitHub.
- **Pull Request (PR)**: Se debe crear un PR en GitHub para pasar de tu rama a `dev`. Al menos otro miembro debe revisar el código.

---

## 2. Calidad de Código (Clean Code)

### Reglas de Oro de Refactorización

1.  **Nombres Semánticos**: Eliminar variables tipo `x`, `a`, `temp`. Usar nombres que expliquen el contenido (ej: `listaProductos`, `usuarioLogueado`).
2.  **Principio de Responsabilidad Única (SRP)**: Cada función debe hacer **una sola cosa**. Si una función tiene más de 20 líneas, probablemente deba dividirse.
3.  **Eliminar Código Muerto**: Si ESLint marca que una variable no se usa, bórrala.
4.  **DRY (Don't Repeat Yourself)**: Si ves lógica repetida (como los formateadores de precios), extráela a una función única.
5.  **Early Return**: Evitar los `if/else` anidados (pirámides). Si una condición falla, retorna inmediatamente.

### Modularización

El archivo `problema.js` debe dividirse en una estructura de carpetas lógica, por ejemplo:

- `/src/auth.js`: Lógica de login y registro.
- `/src/cart.js`: Gestión del carrito de compras.
- `/src/utils/helpers.js`: Funciones de formato y cálculos comunes.

---

## 3. Herramientas y Automatización

### ESLint & Prettier

- **ESLint**: Se utiliza para análisis estático (detectar `var`, variables no usadas, etc.).
- **Prettier**: Se utiliza para el formato visual (espacios, puntos y coma, comillas).
- **Uso**: Ejecutar `npm run lint:fix` antes de cada commit para asegurar la calidad.

### Pruebas Unitarias (Mocha)

- Se deben implementar al menos **10 pruebas unitarias**.
- Cada prueba debe verificar una función pura (entrada y salida esperada).
- Se permite el uso de IA únicamente para generar casos de prueba.

---

## 4. Configuración del Entorno local

Para que el proyecto funcione igual en todos los PCs:

1. Clonar el repo.
2. Ejecutar `npm install` (instala ESLint, Prettier y Mocha).
3. **No subir `node_modules`**: Asegurarse de que el archivo `.gitignore` esté configurado.
