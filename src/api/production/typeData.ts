import request from './request'

export function getConfData(params: any) {
    return request({
      url: "/device/get",
      method: "get",
      params: params,
    });
  }
  
  export function updateConfData(payload: any) {
    return request({
      url: "/device/update",
      method: "put",
      data: payload,
    });
  }
  
  export function createConfData(payload: any) {
    return request({
      url: "/device/create",
      method: "post",
      data: payload,
    });
  }
  
  export function deleteConfData(_id, payload: any) {
    return request({
      url: "device/delete?_id=" + _id,
      method: "delete",
      data: payload,
    });
  }
  
  export function searchConfData(params: any) {
    return request({
      url: "device/getTypeId",
      method: "get",
      params: params,
    });
  }
  
  export function getTypeData(params: any) {
    return request({
      url: "deviceType/get",
      method: "get",
      params: params,
    });
  }
  
  export function createTypeData(payload: any) {
    return request({
      url: "/deviceType/create",
      method: "post",
      data: payload,
    });
  }
  
  export function updateTypeData(payload: any) {
    return request({
      url: "/deviceType/update",
      method: "put",
      data: payload,
    });
  }
  