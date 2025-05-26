FROM python:3.10-slim

# Instalar Octave y dependencias necesarias
RUN apt-get update && \
    apt-get install -y gnupg2 wget octave && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Crear carpeta de trabajo
WORKDIR /app

# Copiar todos los archivos del proyecto
COPY . .

# Instalar dependencias de Python
RUN pip install --no-cache-dir flask flask-cors oct2py gunicorn

# Exponer el puerto de Flask
EXPOSE 5000

# Ejecutar con Gunicorn
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "api:app"]
