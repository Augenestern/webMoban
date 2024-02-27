import Mock from 'mockjs'
import { MockParams } from './types.ts'
import api from './api.ts'

const mocks = [...api]
//设置模拟延迟时间
Mock.setup({
    timeout: '200-2000'
})

//接口拦截
export function mockRequest(){
    
}