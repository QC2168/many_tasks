export const outType = (value) => {
    switch (value) {
        case 0:
            return "未处理";
        case 1:
            return "已处理";
        case 2:
            return "异常";
        default:
            return "未知"
    }
};
export const dyTaskOrder = (value) => {
    switch (value) {
        case 0:
            return "审核中";
        case 1:
            return "完成";
        case 2:
            return "未通过";
        case 3:
            return "自主取消";
        default:
            return "未知任务状态"
    }
};
export const taskOrder = (value) => {
    switch (value) {
        case 0:
            return "审核中";
        case 1:
            return "完成";
        case 2:
            return "未通过";
        case 3:
            return "自主取消";
        case 4:
            return "得提交数据";
        default:
            return "未知任务状态";
    }
};

export const taskStatus = (value) => {
    switch (value) {
        case 0:
            return "下架";
        case 1:
            return "展示中";
        case 2:
            return "优先置顶";
        default:
            return "未知状态"
    }
};

export const feedbackState = (value) => {
    switch (value) {
        case "0":
            return "未处理";
        case "1":
            return "已处理";
        default:
            return "未知";
    }
};
export const formatDate = (time, fmt) => {
    let date = new Date(parseInt(time, ) * 1000)
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
}

function padLeftZero(str) {
    return ('00' + str).substr(str.length)
}
export const numFilter=(value,number=2)=> {
    return parseFloat(value).toFixed(number)
}
