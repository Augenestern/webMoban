import request from './request'

export function getApiData(params: any) {
    return request({
      url: "/api/get",
      method: "get",
      params: params,
    });
  }

  export function updateApiData(payload: any) {
    return request({
      url: "/api/update",
      method: "put",
      data: payload,
    });
  }
  
  export function createApiData(payload: any) {
    return request({
      url: "/api/create",
      method: "post",
      data: payload,
    });
  }
  
  export function deleteApiData(_id, payload: any) {
    return request({
      url: "api/delete?_id=" + _id,
      method: "delete",
      data: payload,
    });
  }