from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import oct2py

app = Flask(__name__)
CORS(app)

oc = oct2py.Oct2Py()

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/interpolate", methods=["POST"])
def interpolate():
    try:
        data = request.get_json()
        x = data['x']
        X = data['X']
        Y = data['Y']

        if len(X) != len(Y):
            raise ValueError("Los arrays X y Y deben tener la misma longitud.")

        resultado = oc.IntLineal(x, X, Y)

        return jsonify({'resultado': resultado})

    except Exception as e:
        print("Error en /interpolate:", e)
        return jsonify({'error': str(e)}), 500
