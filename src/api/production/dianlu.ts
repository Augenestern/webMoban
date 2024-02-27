import request from './request'

export function dianluGetdata(params: any) {
    return request({
        url: "/getStoveData/get",
        method: "get",
        params: params,
    });
}
