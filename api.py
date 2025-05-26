from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import oct2py

# Crear la aplicación Flask
app = Flask(__name__)

# Habilitar CORS para permitir peticiones desde otros orígenes (por ejemplo, frontend en otro puerto)
CORS(app)

# Crear instancia de Oct2Py para ejecutar código Octave desde Python
oc = oct2py.Oct2Py()

# Ruta principal que renderiza la plantilla index.html
@app.route("/")
def index():
    return render_template("index.html")

# Endpoint para interpolar un valor dado (POST)
@app.route("/interpolate", methods=["POST"])
def interpolate():
    try:
        # Obtener datos JSON enviados en el cuerpo de la petición
        data = request.get_json()
        x = data['x']    # Punto a estimar
        X = data['X']    # Vector de puntos conocidos (eje X)
        Y = data['Y']    # Vector de valores conocidos (eje Y)

        # Validar que X e Y tengan igual longitud
        if len(X) != len(Y):
            raise ValueError("Los arrays X y Y deben tener la misma longitud.")

        # Llamar a la función IntLineal de Octave (definida en IntLineal.m) para interpolar
        resultado = oc.IntLineal(x, X, Y)

        # Devolver resultado en formato JSON
        return jsonify({'resultado': resultado})

    except Exception as e:
        # En caso de error, imprimir en consola y devolver error 500 con mensaje JSON
        print("Error en /interpolate:", e)
        return jsonify({'error': str(e)}), 500

# Ejecutar la aplicación en modo debug si se lanza directamente
if __name__ == "__main__":
    app.run(debug=True)
