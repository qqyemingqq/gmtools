const requestUrl = 'http://10.10.170.160:9998/';
const requests = function (re, cb, data = null) {
    let request = new XMLHttpRequest();
    request.open(data ? 'POST' : 'GET', re.indexOf("http") !== -1 ? re : (requestUrl + re), true);
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

const getappdata = function (data,cb) {
    data.ed = data.ed || '';
    data.sd = data.sd || '';
    data.ai = data.ai || 54;
    requests('getappdata', function (res) {
        if (cb) cb(res);
    },data);
};

const CpaCpList = {
    '26': [26, 35],
    '54': [54, 33],
    '23': [23],
    '83': [83],
    '80': [80],
    '82': [82],
};

// 接口  https://gm-sddh.leshu.com/api.php?fs=3001  post请求
//
// 参数
// start_time  开始时间 格式 2018-12-07
// stop_time  结束时间 格式 2018-12-07
// channel_id   渠道id
// gid   产品id  （比如赛道大亨为26）

const getGmData = function (data, cb) {
    data = data || {};
    // data.start_time = '';
    // data.stop_time = '';
    // data.channel_id = '';
    // data.gid = 26;
    requests('getGmData', function (res) {
        if (cb) cb(res);
    }, data);
};

const gameIdToGMId = function (gameId) {

};
const gmIdList = [
    {app_id: '54', name: '心动练习生'},
    {app_id: '26', name: '赛道大亨'},
    {app_id: '23', name: '王者泡泡龙'},
    {app_id: '83', name: '垃圾分类'},
    {app_id: '82', name: '极速战神'}
];
const modifyappbase = function (data) {
    data.op = 'modify';
    requests('modifyappbase', function (res) {
        if (cb) cb(res);
    }, data);
};
const addappbase = function (data,cb) {
    data.op = 'add';
    requests('modifyappbase', function (res) {
        if (cb) cb(res);
    }, data);
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
    CpaCpList,
    getGmData,
    gmIdList,
    getappdata,
    addappbase,
    modifyappbase
};
