import request from './request'

export function getRoleData(params: any) {
    return request({
      url: "/role/get",
      method: "get",
      params: params,
    });
  }
  
  export function updateRoleData(payload: any) {
    return request({
      url: "/role/update",
      method: "put",
      data: payload,
    });
  }
  
  export function createRoleData(payload: any) {
    return request({
      url: "/role/create",
      method: "post",
      data: payload,
    });
  }