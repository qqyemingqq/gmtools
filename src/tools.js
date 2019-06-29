



const formatTime = function(date,split=null) {
    split = split || '-';
    return date.getFullYear() + split + addZero(date.getMonth() + 1) + split + addZero(date.getDate());
};
const addZero = function(str,num=2){
    if(str.toString().length!==num){
        return '0'+str;
    }else {
        return str;
    }
};
const checkToday = function (date) {
    return formatTime(date) === formatTime(new Date());
};


export default {
    formatTime,
    checkToday
};
