const requestUrl = 'http://10.10.170.160:9998/';
const requests = function (re, cb, data = null) {
    let request = new XMLHttpRequest();
    request.open(data ? 'POST' : 'GET', requestUrl + re, true);
    request.responseType = 'json';
    request.onload = function () {
        cb(request.response);
    };
    request.send(data ? objToFormData(data) : null);
};

const objToFormData = function (obj) {
    let formData = new FormData();
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            formData.append(key, obj[key]);
        }
    }
    return formData;
};

const getCPAData = function (data, cb) {
    requests('minigamedata', (res) => {
        cb(res);
    }, data);
};
const addCpaData = function (data, cb) {
    requests('addminigamedata', (res) => {
        if (cb) cb(res);
    }, data);
};

const modifyCpaData = function (data, cb) {
    requests('changeminigamedata', (res) => {
        if (cb) cb(res);
    }, data);
};

const getCpaRecordOneDay = function (data, cb) {
    requests('getDaoLiang', (res) => {
        if (cb) cb(res);
    }, data);
};

const uploadCpaRecord = function (data, cb) {
    requests('uploadSavedCpaRecord', (res) => {
        if (cb) cb(res);
    }, data);
};
const getSavedCpaRecord = function (data, cb) {
    requests('getSavedCpaRecord', (res) => {
        if (cb) cb(res);
    }, data);
};
const fetchcparecord = function (cb) {
    requests('fetchcparecord', function (res) {
        if (cb) cb(res);
    });
};
const allappbase = function (cb) {
    requests('allappbase', function (res) {
        if (cb) cb(res);
    });
};

const CpaCpList = {
    '26':[26,35],
    '54':[54,33],
    '23':[23],
    '83':[83],
};

export default {
    getCPAData,
    addCpaData,
    modifyCpaData,
    getCpaRecordOneDay,
    uploadCpaRecord,
    getSavedCpaRecord,
    fetchcparecord,
    allappbase,
    CpaCpList
};
