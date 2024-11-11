# Usa una imagen de Node.js
FROM node:18-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY . .

# Compila la aplicación en modo producción
RUN npm run build

# Expone el puerto 3500
EXPOSE 3500

# Comando para iniciar la aplicación en modo producción
CMD ["npm", "start"]
