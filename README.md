# Refactor-Proyect-Web-Mobile
Proyecto para utilizar GitHub y Git de manera correcta, con las buenas practicas mostradas en WEBMOBILE. 
Refactor-Proyect-Web-Mobile/
├── src/                    # Todo el código fuente refactorizado
│   ├── auth/               # Lógica de login, registro y sesiones
│   │   └── authService.js
│   ├── modules/            # Módulos principales de la aplicación
│   │   ├── products.js     # Gestión de productos (search, render)
│   │   └── cart.js         # Lógica del carrito y cupones
│   ├── utils/              # Funciones auxiliares y formateadores
│   │   ├── formatters.js   # Aquí van fmtPrice, mostrarPrecio, etc.
│   │   └── validators.js   # Validaciones de formularios
│   ├── data/               # Archivos JSON o mocks de datos
│   │   └── database.json
│   └── index.js            # Punto de entrada que orquesta todo
├── test/                   # Aquí irán tus 10 pruebas unitarias para Mocha
│   ├── auth.test.js
│   ├── products.test.js
│   └── cart.test.js
├── .gitignore              # node_modules y logs
├── .prettierrc             # Configuración de formato
├── eslint.config.js        # Tu configuración de ESLint 9
├── package.json            # Scripts y dependencias
└── README.md               # Documentación del proyecto