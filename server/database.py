#!/usr/bin/python
# -*- coding: utf-8 -*-




def getAllCPADatas():
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
    collumn_name_list = tuple([x[0] for x in cursor.description])
    datas = tuple(cursor.fetchall())
    # cnx.close()
    return collumn_name_list + datas

# print("Content-Type: text/html;charset=utf-8\n")
# print(getAllCPADatas())
