# -*- coding: utf-8 -*-
import logging
import sys
from flask import Flask
from flask_cors import CORS
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

@app.route('/command/<status>')
def command(status):
    if 'fire' in status:
        _DB.set('fire', status)
    if 'gas' in status:
        _DB.set('gas', status)
    if 'reset' in status:
        _DB.set('fire', 'fire_recovery')
        _DB.set('gas', 'gas_recovery')
    return status, 200

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
