#!/usr/bin/python
# -*- coding: utf-8 -*-


import mysql.connector
import database
from flask import Flask, make_response, request
import json

app = Flask(__name__)

config = {
    'user': 'root',
    'password': 'LVS@071103',
    'host': '10.10.170.160',
    'database': 'minigame',
    'raise_on_warnings': True
}


def checkAppId(appid):
    if appid[0:2] != "wx":
        return (False, "wx should be in front of appid")
    if len(appid[0:2]) != 18:
        return (False, "the length of appid should be 18")
    return True


def isEmpty(content):
    if content == "":
        return False
    else:
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
        result.append([d for d in data])
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
    if request.method == 'POST':
        app_animation = request.form['app_animation'] or ''
        app_appid = request.form['app_appid']
        app_description = request.form['app_description']
        app_icon = request.form['app_icon']
        app_id = request.form['app_id']
        app_name = request.form['app_name']
        app_owner = request.form['app_owner'] or 0
        app_path = request.form['app_path'] or ''
        app_price = request.form['app_price']
        app_quantity = request.form['app_quantity'] or 0
        app_type = request.form['app_type']
        gm_account = request.form['gm_account'] or ''
        gm_secret = request.form['gm_secret'] or ''
        gm_url = request.form['gm_url'] or ''
        if isEmpty(app_name):
            return make_response({"error": "app_name can't be empty"})
        if isEmpty(app_id):
            return make_response({"error": "app_id can't be empty"})
        if isEmpty(app_appid):
            return make_response({"error": "app_name can't be empty"})
        elif not checkAppId(app_appid):
            return make_response({"error": checkAppId(app_appid)[1]})
        if isEmpty(app_price):
            return make_response({"error": "app_price can't be empty"})
        if isEmpty(app_description):
            return make_response({"error": "app_description can't be empty"})
        if isEmpty(app_type):
            return make_response({"error": "app_type can't be empty"})
        if isEmpty(app_icon):
            return make_response({"error": "app_icon can't be empty"})
        cnx = mysql.connector.connect(**config)
        cursor = cnx.cursor()
        # cursor.execute('insert into app_base values ('+app_name+',' + app_id+',' + app_appid+',' + app_path+',' + app_price+',' + app_quantity +
                    #    ',' + gm_url+',' + gm_account+',' + gm_secret+',' + app_description+',' + app_type+',' + app_icon+',' + app_owner+',' + app_animation+');')
        # cursor.commint()
        # print(cursor.commint())

    rst = make_response('insert into app_base values ('+app_name+',' + app_id+',' + app_appid+',' + app_path+',' + app_price+',' + app_quantity +
                       ',' + gm_url+',' + gm_account+',' + gm_secret+',' + app_description+',' + app_type+',' + app_icon+',' + app_owner+',' + app_animation+');')
    rst.headers['Access-Control-Allow-Origin'] = '*'
    # return render_template('login.html', error=error)
    return rst
