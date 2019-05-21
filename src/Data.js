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


const computeCPAData = function (testData) {
    let re = [];
    for (let i = 1; i < testData.length; i++) {
        const element = testData[i];
        let tempObj = {};
        for (let j = 0; j < element.length; j++) {
            tempObj[testData[0][j]] = element[j] ? element[j].toString() : element[j];
        }
        re.push(tempObj);
    }
    console.log(re);
    return re;
};

const getCPAData =function (cb) {
   requests('minigamedata',(res)=>{
       cb(computeCPAData(res));
    });
};

export default {
    getCPAData,
    requests
};
