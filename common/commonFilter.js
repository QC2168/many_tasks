export const outType=(value)=> {
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
export const dyTaskOrder=(value)=> {
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
export const taskOrder=(value)=> {
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
            return "未知任务状态"
    }
};
export const taskStatus=(value)=> {
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
