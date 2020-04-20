import { deepMerge, isPlainObject } from './util'
import { Method } from '../types'

function normalizeHeaderName(headers: any, normalizedName: string): void {
  if (!headers) {
    return
  }
  Object.keys(headers).forEach(name => {
    if (name !== normalizedName && name.toUpperCase() === normalizedName) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}

export function processHeaders(headers: any, data: any): any {
  normalizeHeaderName(headers, 'Content-Type')
  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}

export function parseHeaders(headers:string):any{
  let parsed = Object.create(null)
  if(!headers){
    return parsed
  }
  headers.split('\r\n').forEach((line)=>{
    let [key,val] = line.split(':')
    key = key.trim().toLowerCase()
    if(!key){
      return
    }
    if(val){
      val = val.trim()
    }
    parsed[key] = val
  })
  return parsed
}

/**
 * Headers属性扁平化
 * 通过 deepMerge 的方式把 common、post 的属性拷贝到 headers 这一级
 * 把多个对象的属性合在一个对象上
 */
export function flattenHeaders(headers: any, method: Method): any {
  if (!headers) {
    return headers
  }

  headers = deepMerge(headers.common || {}, headers[method] || {}, headers)
  return headers
}
