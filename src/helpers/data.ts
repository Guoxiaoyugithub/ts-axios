import { isPlainObject } from './util'
import { cat } from 'shelljs'
/**
 * transformRequest函数接收index.ts传来的AxiosRequestConfig类型中的data属性
 * data如果是普通的对象(PlainObject),直接转化成JSON字符串
 * datar如果不是普通对象，比如流文件，就直接返回该类型
 */
export function transformRequest(data: any): any {

  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}

export  function transformRespons(data:any):any {
  if(typeof data === 'string'){
    try {
      data = JSON.parse(data)
    }catch(e){
      // do nothing
    }
  }
  return data
}
