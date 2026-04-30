Persona 1 - Autenticación LEO (dev-auth-system)

Login con validación de credenciales
Cálculo de niveles (bronce/plata/oro/platino)
Manejo de bloqueo por intentos fallidos
Validadores para email y contraseña

Persona 2 - Productos Naederys (dev-products)

Búsqueda con query, categoría y rango de precio
Reemplazar bubble sort por algoritmo eficiente
Implementar paginación
Tests de filtrado y ordenamiento

Persona 3 Tomas- - Carrito (dev-cart-system)

Agregar/actualizar productos en carrito
Cálculo de totales y subtotales
Validación de stock
Formateo de precios

Persona 4 - Cupones + Notificaciones Cooler Benja (dev-coupons-notifications)

Validación y aplicación de códigos de descuento
Sistema de notificaciones (mock para testing)
Tipos de descuentos: porcentaje, cantidad fija, envío gratis
Integración con carrito

Persona 5 - Pago + Integración Benja (Crisxpy)(dev-payment-integration)

Procesar pagos y crear órdenes
Historial de transacciones
Estadísticas y reportes
Orquestar todos los módulos en index.js
Tests end-to-end (login → búsqueda → carrito → checkout)

Refactor-Proyect-Web-Mobile/
├── src/ # Todo el código fuente refactorizado
│ ├── auth/  
│ │ ├── authService.js # Lógica de login, registro y sesiones
│ │ └── users.js
│ ├── modules/ # Módulos principales de la aplicación
│ │ ├── products.js # Gestión de productos (search, render)
│ │ └── cart.js # Lógica de carrito
│ │ └── cupones.js # Lógica de cupones
│ │ └── notificaciones.js # notificaciones al comprador
│ │ └── paymnent.js # Lógica de proceso de pago
│ ├── utils/ # Funciones auxiliares y formateadores
│ │ ├── formatters.js # Aquí van fmtPrice, mostrarPrecio, etc.
│ │ └── validators.js # Validaciones de formularios
│ │ └── infogetter.js # funcion de obtencion de informacion
│ │ └── paginator.js # creador de paginadores
│ │ └── sorter.js # arreglador / Ordenador
│ ├── data/ # Archivos JSON o mocks de datos
│ │ └── database.json
│ └── index.js # Punto de entrada que orquesta todo
├── test/ # Aquí irán tus 10 pruebas unitarias para Mocha
│ ├── auth.test.js
│ ├── products.test.js
│ └── cart.test.js
├── .gitignore # node_modules y logs
├── .prettierrc # Configuración de formato
├── eslint.config.js # Tu configuración de ESLint 9
├── package.json # Scripts y dependencias
└── README.md # Documentación del proyecto
