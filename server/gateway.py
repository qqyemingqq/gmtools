#!/usr/bin/python
# -*- coding: utf-8 -*-


from flask import Flask,make_response,request
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

def checkAppId(appid):
    if appid[0:2] != "wx":
        return (False,"wx should be in front of appid")
    if len(appid[0:2]) != 18:
        return (False,"the length of appid should be 18")
    return True
@app.route("/")

def hello():
    return 'hello'

@app.route("/minigamedata")

def minigamedata():
    global config
    
    cnx = mysql.connector.connect(**config)
    cursor = cnx.cursor(dictionary=True)
    cursor.execute('SELECT * FROM app_base;')
    collumn_name_list = [x[0] for x in cursor.description]
    datas = cursor.fetchall()
    result = []
    for data in datas:
        result.append([ d for d in data])
    # rst = make_response(json.dumps([collumn_name_list]+result))
    # print(datas)
    rst = make_response(json.dumps(datas))
    rst.headers['Access-Control-Allow-Origin'] = '*'
    # cnx.close()
    return rst

@app.route("/addminigamedata")

def addminigamedata():
    global config
    error = None
    if request.method == 'GET':
        app_animation = request.form['app_animation']
        app_appid = request.form['app_appid']
        app_description = request.form['app_description']
        app_icon = request.form['app_icon']
        app_id = request.form['app_id']
        app_name = request.form['app_name']
        app_owner = request.form['app_owner']
        app_path = request.form['app_path']
        app_price = request.form['app_price']
        app_quantity = request.form['app_quantity']
        app_type = request.form['app_type']
        gm_account = request.form['gm_account']
        gm_secret = request.form['gm_secret']
        gm_url = request.form['gm_url']
        if app_name=="":
            return make_response({"error":"app_name can't be empty"})
        if app_id=="":
            return make_response({"error":"app_id can't be empty"})
        elif not checkAppId(app_id):
            return make_response({"error":checkAppId(app_id)[1]})
        app_appid: false
        app_price: false
        app_description: false
        app_type: false
        app_icon: false
        app_owner: false
        print(json.dumps(request.args))





    # the code below is executed if the request method
    # was GET or the credentials were invalid
    rst = make_response(json.dumps(request.args))
    rst.headers['Access-Control-Allow-Origin'] = '*'
    # return render_template('login.html', error=error)
    return rst