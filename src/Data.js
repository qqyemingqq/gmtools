const requestUrl = 'http://10.10.170.160:9998/';
const requests = function (re, cb) {
    let request = new XMLHttpRequest();
    request.open('GET', requestUrl + re, true);
    request.responseType = 'json';
    request.onload = function () {
        cb(request.response);
    };
    request.send();
};


const getCPAData =function (cb) {
   requests('minigamedata',(res)=>{
       cb(res);
    });
};
const addCpaData = function (data) {
    requests('addminigamedata',(res)=>{
        cb(res);
    });
};

const modifyCpaData = function () {
    requests('modifyminigamedata',(res)=>{
        cb(res);
    });
};

export default {
    getCPAData,
    addCpaData,
    modifyCpaData
};
