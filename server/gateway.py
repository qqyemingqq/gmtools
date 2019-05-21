#!/usr/bin/python
# -*- coding: utf-8 -*-


from flask import Flask,make_response
import json

app = Flask(__name__)

config = {
    'user': 'root',
    'password': 'LVS@071103',
    'host': '10.10.170.160',
    'database': 'minigame',
    'raise_on_warnings': True
    }

import database
import mysql.connector

@app.route("/")

def hello():
    return 'hello'

@app.route("/minigamedata")

def minigamedata():
    global config
    
    cnx = mysql.connector.connect(**config)
    cursor = cnx.cursor()
    cursor.execute('SELECT * FROM app_base;')
    collumn_name_list = [x[0] for x in cursor.description]
    datas = cursor.fetchall()
    result = []
    for data in datas:
        result.append([ d for d in data])
    rst = make_response(json.dumps([collumn_name_list]+result))
    rst.headers['Access-Control-Allow-Origin'] = '*'
    # cnx.close()
    return rst

@app.route("/addminigamedata")

def addminigamedata():
    
    global config

    error = None
    if request.method == 'POST':
        request.form['app_animation']
        request.form['app_appid']
        request.form['app_description']
        request.form['app_icon']
        request.form['app_id']
        request.form['app_name']
        request.form['app_owner']
        request.form['app_path']
        request.form['app_price']
        request.form['app_quantity']
        request.form['app_type']
        request.form['gm_account']
        request.form['gm_secret']
        request.form['gm_url']






            error = 'Invalid username/password'
    # the code below is executed if the request method
    # was GET or the credentials were invalid
    rst = make_response()
    rst.headers['Access-Control-Allow-Origin'] = '*'
    return render_template('login.html', error=error)
    return rst,error