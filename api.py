from flask import Flask, request, jsonify
from flask_cors import CORS
import oct2py

app = Flask(__name__)
CORS(app)

oc = oct2py.Oct2Py()

@app.route("/interpolate", methods=["POST"])
def interpolate():
    try:
        data = request.get_json()
        print(" Recibido:", data)

        x = data['x']
        X = data['X']
        Y = data['Y']

        print(f"Estimar en x={x}")
        print(f"Datos X: {X}")
        print(f"Datos Y: {Y}")

        if len(X) != len(Y):
            raise ValueError("Los arrays X y Y deben tener la misma longitud.")

        resultado = oc.IntLineal(x, X, Y)
        print(f"Resultado de la interpolación: {resultado}")

        return jsonify({'resultado': resultado})

    except Exception as e:
        print("Error en /interpolate:", e)
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
