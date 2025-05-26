FROM python:3.10-slim

# Instalar dependencias del sistema necesarias para Octave
RUN apt-get update && \
    apt-get install -y gnupg2 wget octave && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar todos los archivos del proyecto al contenedor
COPY . .

# Instalar las dependencias de Python necesarias
RUN pip install --no-cache-dir flask flask-cors oct2py

# Exponer el puerto en el que corre Flask
EXPOSE 5000

# Comando para ejecutar la aplicación
CMD ["python", "api.py"]
