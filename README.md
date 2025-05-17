# APP WEB PARA MONITOREO DE ENERGIA CONSUMIDA ⚡
Este proyecto está enfocado en el desarrollo de una app web, que permita hacer seguimiento del consumo energético en kWh que se hace por día en meses de un año y por medio de la interpolación lineal 
poder estimar consumos desconocidos entre intervalos de días que ya se conocen.

## 💡 Características
- Registro de consumo energético por fechas específicas del año.
- Estimación del consumo energético en días intermedios usando interpolación lineal.
- Interfaz intuitiva basada en calendario
- Backend ligero en Python con integración a Octave/MATLAB para el cálculo numérico.
  
## 🚀 Tecnologías usadas
- HTML/CSS/JavaScript (Frontend)
- Python (Backend / API)
- Flask (framework web para la API)
- Flask-CORS (manejo de CORS en la API)
- Oct2Py (ejecución de funciones Octave/MATLAB desde Python)
- Fetch API (comunicación entre frontend y backend)
- Octave / MATLAB (para los cálculos de interpolación lineal)

## ⚙️ Instalación y Comandos útiles

Todos los comandos se ejecutan desde la raíz del proyecto, en la terminal:

| Comando                                                    | Acción                                                                 |
|------------------------------------------------------------|------------------------------------------------------------------------|
| `git clone https://github.com/krlo-dev/Proyecto-de-modelamiento`      | Clona el repositorio a tu máquina local                               |
| `cd nombre-del-repo`                                       | Entra a la carpeta del proyecto                                       |
| `pip install flask flask-cors oct2py`                      | Instala las dependencias necesarias para ejecutar la API              |
| `python api.py`                                            | Inicia el servidor Flask en `http://localhost:5000/`                  |
| Abre `index.html` en el navegador                          | Accede a la interfaz web y comienza a usar la app                     |


