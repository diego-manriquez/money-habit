# Money Habit 💰

Una aplicación web para el control de ingresos y gastos personales, construida con Angular 19.

## 🚀 Características

- ✅ **Gestión de Transacciones**: Registra ingresos y gastos con descripción, monto, fecha y categoría
- 👥 **Múltiples Personas**: Asigna transacciones a diferentes personas para llevar control individual
- 🏷️ **Categorías Personalizadas**: Crea y gestiona tus propias categorías de gastos con iconos y colores
- 📊 **Dashboard Interactivo**: Visualiza tus transacciones en cards organizados y filtrados
- 📈 **Estadísticas Detalladas**: Analiza tus finanzas con reportes semanales, mensuales y anuales
- 💾 **Almacenamiento Local**: Los datos se guardan en localStorage (sin necesidad de backend por ahora)
- 📱 **Diseño Responsivo**: Funciona perfectamente en dispositivos móviles y escritorio

## 🎨 Características de la Interfaz

- Cards coloridos y modernos
- Navegación intuitiva
- Filtros de periodo (semana, mes, año, todos)
- Estadísticas visuales con barras de progreso
- Resumen de balance, ingresos y gastos
- Desglose por categoría y por persona

## 📦 Estructura del Proyecto

```
src/
├── app/
│   ├── components/
│   │   ├── transaction-form/       # Formulario para nuevas transacciones
│   │   ├── transaction-list/       # Lista de transacciones con filtros
│   │   ├── statistics/             # Estadísticas y reportes
│   │   ├── categories-manager/     # Gestión de categorías
│   │   └── people-manager/         # Gestión de personas
│   ├── models/
│   │   └── transaction.model.ts    # Interfaces y tipos
│   ├── services/
│   │   └── data.service.ts         # Servicio de datos con localStorage
│   ├── app.component.*             # Componente raíz con navegación
│   └── app.routes.ts               # Configuración de rutas
└── styles.css                      # Estilos globales
```

## 🛠️ Instalación y Uso

### Prerrequisitos

- Node.js (v18 o superior)
- npm (v9 o superior)

### Instalación

```bash
# Clonar el repositorio
git clone <repository-url>

# Navegar al directorio
cd money-habit

# Instalar dependencias
npm install
```

### Desarrollo

```bash
# Iniciar servidor de desarrollo
npm start

# La aplicación estará disponible en http://localhost:4200
```

### Compilación

```bash
# Compilar para producción
npm run build

# Los archivos compilados estarán en el directorio dist/
```

## 🎯 Uso de la Aplicación

### 1. Configuración Inicial

Al abrir la aplicación por primera vez, se crearán:
- Categorías predeterminadas (Comida, Ropa, Medicina, Viajes, etc.)
- Una persona predeterminada ("Yo")

### 2. Gestionar Personas

- Ve a la sección "Personas"
- Agrega nuevas personas con nombre y color personalizado
- Edita o elimina personas existentes

### 3. Gestionar Categorías

- Ve a la sección "Categorías"
- Crea categorías personalizadas con nombre, icono y color
- Edita o elimina categorías

### 4. Registrar Transacciones

- Ve a "Nueva Transacción"
- Selecciona el tipo (Ingreso o Gasto)
- Ingresa el monto y descripción
- Selecciona la persona y categoría
- Confirma la fecha
- Haz clic en "Agregar"

### 5. Ver Dashboard

- En la sección "Dashboard" verás todas tus transacciones
- Filtra por periodo (Semana, Mes, Año, Todas)
- Elimina transacciones si es necesario

### 6. Ver Estadísticas

- En "Estadísticas" encontrarás:
  - Resumen de ingresos, gastos y balance
  - Desglose de gastos por categoría
  - Resumen por persona
  - Gráficos visuales con porcentajes

## 🔮 Próximas Características (Planeadas)

- [ ] Integración con backend
- [ ] Base de datos para persistencia
- [ ] Exportación de datos (CSV, PDF)
- [ ] Gráficos más avanzados (charts.js o similar)
- [ ] Presupuestos y metas de ahorro
- [ ] Notificaciones y recordatorios
- [ ] Modo oscuro
- [ ] Autenticación de usuarios
- [ ] Sincronización entre dispositivos

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👨‍💻 Autor

Desarrollado con ❤️ usando Angular 19

---

**Nota**: Esta aplicación actualmente usa localStorage para el almacenamiento de datos. Los datos permanecerán en tu navegador hasta que limpies el cache. En futuras versiones se implementará un backend para persistencia real de datos.
