#!/usr/bin/python
# -*- coding: utf-8 -*-


from flask import Flask
import json

app = Flask(__name__)

@app.route("/")

def hello():
    return 'hello'

@app.route("/minigamedata")

def minigamedata():
    import database
    import mysql.connector
    config = {
    'user': 'root',
    'password': 'LVS@071103',
    'host': '10.10.170.160',
    'database': 'minigame',
    'raise_on_warnings': True
    }
    cnx = mysql.connector.connect(**config)
    cursor = cnx.cursor()
    cursor.execute('SELECT * FROM app_base;')
    collumn_name_list = [x[0] for x in cursor.description]
    datas = cursor.fetchall()
    result = []
    for data in datas:
        result.append([ d for d in data])
            
    # cnx.close()
    return json.dumps([collumn_name_list]+result)