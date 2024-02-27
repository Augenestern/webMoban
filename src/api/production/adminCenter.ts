import request from './request'

export function getUserData(params: any) {
    return request({
      url: "/user/get",
      method: "get",
      params: params,
    });
  }
  
  export function createUserData(payload: any) {
    return request({
      url: "/user/create",
      method: "post",
      data: payload,
    });
  }
  
  export function deleteUserData(_id, payload: any) {
    return request({
      url: "user/delete?_id=" + _id,
      method: "delete",
      data: payload,
    });
  }
  
  export function updateUserData(payload: any) {
    return request({
      url: "/user/update",
      method: "put",
      data: payload,
    });
  }
  export function resetRolePasswd(payload: any) {
    return request({
      url: "/user/resetPassword",
      method: "post",
      data: payload,
    });
  }