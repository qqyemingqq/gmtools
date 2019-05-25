const requestUrl = 'http://10.10.170.160:9998/';
const requests = function ( re, cb , data=null) {
    let request = new XMLHttpRequest();
    request.open(data?'POST':'GET', requestUrl + re, true);
    request.responseType = 'json';
    request.onload = function () {
        cb(request.response);
    };
    request.send(data?data:null);
};


const getCPAData =function (cb) {
   requests('minigamedata',(res)=>{
       cb(res);
    });
};
const addCpaData = function (data) {
    requests('addminigamedata',(res)=>{
        cb(res);
    },data);
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
