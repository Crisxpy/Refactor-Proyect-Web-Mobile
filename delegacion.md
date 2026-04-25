Persona 1 - Autenticación (dev-auth-system)

Login con validación de credenciales
Cálculo de niveles (bronce/plata/oro/platino)
Manejo de bloqueo por intentos fallidos
Validadores para email y contraseña


Persona 2 - Productos (dev-products)

Búsqueda con query, categoría y rango de precio
Reemplazar bubble sort por algoritmo eficiente
Implementar paginación
Tests de filtrado y ordenamiento


Persona 3 - Carrito (dev-cart-system)

Agregar/actualizar productos en carrito
Cálculo de totales y subtotales
Validación de stock
Formateo de precios


Persona 4 - Cupones + Notificaciones (dev-coupons-notifications)

Validación y aplicación de códigos de descuento
Sistema de notificaciones (mock para testing)
Tipos de descuentos: porcentaje, cantidad fija, envío gratis
Integración con carrito


Persona 5 - Pago + Integración (dev-payment-integration)

Procesar pagos y crear órdenes
Historial de transacciones
Estadísticas y reportes
Orquestar todos los módulos en index.js
Tests end-to-end (login → búsqueda → carrito → checkout)

