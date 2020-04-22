export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'Delete'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'

export interface AxiosRequestConfig {
  url?: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?:XMLHttpRequestResponseType
  timeout?:number
  transformRequest?:AxiosTransformer |AxiosTransformer[]
  transformResponse?:AxiosTransformer |AxiosTransformer[]
  cancelToken?:CancelToken
  withCredentials?:boolean
  [propName:string]:any
}

export  interface AxiosResponse<T=any> {
  data:T
  status:number
  statusText:string
  headers:any
  config:AxiosRequestConfig
  request:any
}

export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>>{

}

export interface AxiosError extends Error{
  isAxiosError:boolean
  config:AxiosRequestConfig
  code?:string | null
  request?:any
  response?:AxiosResponse
}

export interface Axios {
  defaults:AxiosRequestConfig
  interceptors:{
    request:AxiosInterceptorManager<AxiosRequestConfig>,
    response:AxiosInterceptorManager<AxiosResponse>
  }
  request<T=any>(config:AxiosRequestConfig):AxiosPromise<T>

  get<T=any>(url:string,config?:AxiosRequestConfig):AxiosPromise<T>

  delete<T=any>(url:string,config?:AxiosRequestConfig):AxiosPromise<T>

  head<T=any>(url:string,config?:AxiosRequestConfig):AxiosPromise<T>

  options<T=any>(url:string,config?:AxiosRequestConfig):AxiosPromise<T>

  post<T=any>(url:string,data?:any,config?:AxiosRequestConfig):AxiosPromise<T>

  put<T=any>(url:string,data?:any,config?:AxiosRequestConfig):AxiosPromise<T>

  patch<T=any>(url:string,data?:any,config?:AxiosRequestConfig):AxiosPromise<T>

}

export interface AxiosInstance extends Axios{
  <T=any>(config:AxiosRequestConfig):AxiosPromise<T>

  <T=any>(url:string,config?:AxiosRequestConfig):AxiosPromise<T>
}

export interface AxiosStatic extends AxiosInstance {
  create(config?:AxiosRequestConfig):AxiosInstance
  CancelToken:CancelTokenStatic
  Cancel:CancelStatic
  isCancel:(value:any)=>boolean
}
/**
 * 对于 resolve 函数的参数
 * 请求拦截器是 AxiosRequestConfig 类型的
 * 而响应拦截器是 AxiosResponse 类型
 * 对于 reject 函数的参数类型则是 any 类型
 */
export interface AxiosInterceptorManager<T> {
  // 添加拦截器，返回拦截器的id编号
  use(resolved:ResolvedFn<T>, rejected?:RejectedFn):number
  // 删除拦截器的方法
  eject(id:number):void
}

/**
 * 返回类型为T时为同步逻辑
 * 返回类型为Promise时为异步逻辑
 */
export interface ResolvedFn<T>{
  (val:T): T | Promise<T>
}

export interface RejectedFn {
  (err:any):any
}

export interface AxiosTransformer {
  (data:any,headers?:any):any
}

export interface CancelToken {
  promise:Promise<Cancel>
  reason?:Cancel

  throwIfRequested():void
}

export interface Canceler {
  (message?:string):void
}

export interface CancelExecutor {
  (cancel:Canceler):void
}

export interface CancelTokenSource {
  token:CancelToken
  cancel:Canceler
}

export interface CancelTokenStatic {
  new(executor:CancelExecutor):CancelToken
  source():CancelTokenSource
}

export interface Cancel {
  message?:string
}

export interface CancelStatic{
  new(message?:string):Cancel
}


