# Establecer la imagen base
FROM node:22-alpine

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar archivos de configuración de Node.js
# Asegúrate de tener un .dockerignore para excluir node_modules y otros archivos no necesarios
COPY package.json package-lock.json ./

# Instalar las dependencias del proyecto
RUN npm install

# Copiar el resto del código del proyecto
COPY . .

# Construir la aplicación
RUN npm run build

# Exponer el puerto 3000
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]