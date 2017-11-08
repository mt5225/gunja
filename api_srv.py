# -*- coding: utf-8 -*-
import sqlite3
import logging
import sys
from flask import Flask
from flask_cors import CORS
from types import NoneType
import pandas as pd
import pickledb

# init key-value store
_DB = pickledb.load('alarm.db', False) 

# innit flash app and backend db connection
app = Flask(__name__, static_url_path='', static_folder='static')

@app.route('/status', methods=['GET'])
def status():
    status_msg = "%s|%s"%(_DB.get('fire'), _DB.get('gas'))
    app.logger.debug(status_msg)
    return status_msg, 200

@app.route('/fire_alarm', methods=['GET'])
def fire_alarm():
    status_msg = "fire_alarm okey"
    _DB.set('fire', 'fire_alarm')
    app.logger.debug(status_msg)
    return status_msg, 200

@app.route('/fire_recovery', methods=['GET'])
def fire_recovery():
    status_msg = "fire_recovery okey"
    _DB.set('fire', 'fire_recovery')
    app.logger.debug(status_msg)
    return status_msg, 200

@app.route('/gas_alarm', methods=['GET'])
def gas_alarm():
    status_msg = "gas_alarm okey"
    _DB.set('gas', 'gas_alarm')
    app.logger.debug(status_msg)
    return status_msg, 200

@app.route('/gas_recovery', methods=['GET'])
def gas_recovery():
    status_msg = "gas_recovery okey"
    _DB.set('gas', 'gas_recovery')
    app.logger.debug(status_msg)
    return status_msg, 200

@app.route('/reset', methods=['GET'])
def reset():
    status_msg = "reset okey"
    _DB.set('fire', 'fire_recovery')
    _DB.set('gas', 'gas_recovery')
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
    _DB.set('fire', 'fire_recovery')
    _DB.set('gas', 'gas_recovery')
    CORS(app)
    app.run(host='0.0.0.0', port=9006, debug=True, threaded=True)
