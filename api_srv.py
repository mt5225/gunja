# -*- coding: utf-8 -*-
import sqlite3
import logging
import sys
from flask import Flask
from flask_cors import CORS
from types import NoneType
import pandas as pd

_FIRE_STATUS = 'fire_recovery'
_GAS_STATUS = 'gas_recovery'

# innit flash app and backend db connection
app = Flask(__name__, static_url_path='', static_folder='static')

@app.route('/status', methods=['GET'])
def status():
    status_msg = "%s|%s"%(_FIRE_STATUS, _GAS_STATUS)
    app.logger.debug(status_msg)
    return status_msg, 200

@app.route('/fire_alarm', methods=['GET'])
def fire_alarm():
    global _FIRE_STATUS
    status_msg = "fire_alarm okey"
    _FIRE_STATUS = 'fire_alarm'
    app.logger.debug(status_msg)
    return status_msg, 200

@app.route('/fire_recovery', methods=['GET'])
def fire_recovery():
    global _FIRE_STATUS
    status_msg = "fire_recovery okey"
    _FIRE_STATUS = 'fire_recovery'
    app.logger.debug(status_msg)
    return status_msg, 200

@app.route('/gas_alarm', methods=['GET'])
def gas_alarm():
    global _GAS_STATUS
    status_msg = "gas_alarm okey"
    _GAS_STATUS = 'gas_alarm'
    app.logger.debug(status_msg)
    return status_msg, 200

@app.route('/gas_recovery', methods=['GET'])
def gas_recovery():
    global _GAS_STATUS
    status_msg = "gas_recovery okey"
    _GAS_STATUS = 'gas_recovery'
    app.logger.debug(status_msg)
    return status_msg, 200

@app.route('/reset', methods=['GET'])
def reset():
    global _FIRE_STATUS,_GAS_STATUS
    status_msg = "reset okey"
    _FIRE_STATUS = 'fire_recovery'
    _GAS_STATUS = 'gas_recovery'
    app.logger.debug(status_msg)
    return status_msg, 200

if __name__ == '__main__':
    LOG_FILENAME = './tel_api_srv.log'
    formatter = logging.Formatter(
        "[%(asctime)s] {%(pathname)s:%(lineno)d} %(levelname)s - %(message)s")
    handler = logging.StreamHandler(sys.stdout)
    handler.setLevel(logging.INFO)
    handler.setFormatter(formatter)
    app.logger.addHandler(handler)
    CORS(app)
    app.run(host='0.0.0.0', port=9006, debug=True)
