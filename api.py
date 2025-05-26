from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from oct2py import Oct2Py
import os

app = Flask(__name__)
CORS(app)

# Asegurarse de que Octave vea los archivos .m
oc = Oct2Py()
oc.addpath(os.getcwd())  # Agrega el directorio actual donde está IntLineal.m

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/interpolate", methods=["POST"])
def interpolate():
    try:
        data = request.get_json()
        x = float(data['x'])
        X = [float(i) for i in data['X']]
        Y = [float(i) for i in data['Y']]

        if len(X) != len(Y):
            raise ValueError("Los arrays X y Y deben tener la misma longitud.")

        resultado = oc.IntLineal(x, X, Y)

        return jsonify({'resultado': float(resultado)})
    except Exception as e:
        print("Error en /interpolate:", e)
        return jsonify({'error': str(e)}), 500
