# Gestión Educativa - Frontend

Este repositorio contiene la aplicación frontend para un sistema integral de gestión educativa.

## Funcionalidades

### Invitado

- **Inicio de sesión:** Los usuarios pueden iniciar sesión en la plataforma utilizando sus credenciales (correo electrónico y contraseña).
- **Registro como estudiante:** Los estudiantes pueden registrarse en la plataforma completando un formulario con detalles como nombre, apellido, correo electrónico, cédula, fecha de nacimiento, dirección, número de teléfono y contraseña.
- **Recuperación de contraseña:** Los usuarios pueden recuperar su contraseña a través de correo electrónico.
- **Validación de certificados:** Cualquier persona puede verificar la autenticidad de un certificado introduciendo su código de validación.

### Administrador, Coordinador, Funcionario y Estudiante

- **Cerrar sesión:** Los usuarios pueden cerrar sesión en la plataforma.
- **Editar perfil:** Los usuarios pueden modificar detalles secundarios de su perfil como foto, teléfono y dirección (excepto cédula, nombre, apellido, correo electrónico y fecha de nacimiento).

### Coordinador y Estudiante

- **Listar plan de estudios:** Permite visualizar el plan de estudios de una carrera específica.

### Administrador

- **Gestión de usuarios:** Los administradores pueden crear cuentas para Coordinadores y Funcionarios.
- **Listar usuarios:** Proporciona un listado completo de usuarios registrados con capacidades de búsqueda, filtrado y ordenamiento.
- **Desactivar cuenta de usuario:** Los administradores pueden desactivar cuentas de Coordinadores y Funcionarios.
- **Resumen de actividad de usuario:** Los administradores pueden generar y visualizar un informe de actividad de un usuario, mostrando acciones como inicio de sesión, inscripciones a cursos y exámenes, entre otras.

### Coordinador

- **Gestión de carreras:** Permite agregar y editar detalles de carreras.
- **Gestión de asignaturas:** Permite agregar y editar asignaturas dentro de una carrera.
- **Registro de plan de estudios:** Permite registrar un plan de estudios para una carrera.

### Funcionario

- **Gestión de cursos y exámenes:** Permite registrar cursos, períodos de exámenes, horarios de cursos y calificaciones.
- **Gestión de estudiantes:** Permite gestionar inscripciones de estudiantes y registros académicos.

### Estudiante

- **Inscripción en carreras:** Permite a los estudiantes inscribirse en carreras disponibles.
- **Inscripción en cursos y exámenes:** Permite inscribirse en cursos y exámenes relacionados con las carreras inscritas.
- **Solicitudes académicas:** Permite solicitar certificados, escolaridades y títulos.

## Instalación

Sigue estos pasos para configurar el proyecto localmente:

1. Clona el repositorio:

   ```bash
   git clone https://github.com/ritaiglesias-96/gest-edu-front.git
   cd gest-edu-front
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Inicia la aplicación:

   ```bash
   npm run dev
   ```
