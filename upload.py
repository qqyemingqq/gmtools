import paramiko
import os
 
def upload_action(filePath):
    try:
        terminal = paramiko.Transport('10.10.170.160', 22)
        terminal.connect(username='root', password='?root?')
        sftp = paramiko.SFTPClient.from_transport(terminal)

        sftp.put(filePath, "/data/webtools/"+filePath.replace('./',''))
        terminal.close()
    except Exception as e:
        print (e)
        raise
    return

file_list = []
for p,d,f in os.walk('.'):
    for ff in f:
        if 'upload.py' not in ff:
            file_list.append(os.path.join(p,ff))
for _file in file_list:
    _file = _file.replace('\\','/')
    print(_file)
    upload_action(_file)
# uploadfile(ftpConnectionWxGame,fileName)
