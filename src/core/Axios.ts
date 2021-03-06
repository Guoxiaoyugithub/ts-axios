import {
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
  RejectedFn,
  ResolvedFn
} from '../types'
import dispatchRequest from './dispatchRequest'
import InterceptorManager from './InterceptorManager'
import mergeConfig from './mergeConfig'

interface Interceptors {
  request: InterceptorManager<AxiosRequestConfig>
  response: InterceptorManager<AxiosResponse>
}

interface PromiseChain<T> {
  resolved:ResolvedFn<T> | ((config:AxiosRequestConfig)=>AxiosPromise),
  rejected?:RejectedFn,
}

export default class Axios {
  defaults:AxiosRequestConfig
  interceptors:Interceptors

  constructor(initConfig:AxiosRequestConfig) {
    this.defaults = initConfig
    this.interceptors = {
      request:new InterceptorManager<AxiosRequestConfig>(),
      response:new InterceptorManager<AxiosResponse>()
    }
  }

  request(url:any,config?:any):AxiosPromise{
    if(typeof url === 'string'){
      if(!config){
        config = {}
      }
      config.url = url
    }else{
      config = url
    }

    config = mergeConfig(this.defaults,config)

    const chain:PromiseChain<any>[] = [{
      resolved:dispatchRequest,
      rejected:undefined
    }]

    this.interceptors.request.forEach(interceptor=>{
      chain.unshift(interceptor)
    })

    this.interceptors.response.forEach(interceptor => {
      chain.push(interceptor)
    })

    let promise = Promise.resolve(config)

    while(chain.length){
      const {resolved,rejected} = chain.shift()!
      promise = promise.then(resolved,rejected)
    }

    return promise
  }

  get(url:string, config:AxiosRequestConfig):AxiosPromise{
    return this.__requestMethodWithoutData('get',url,config)
  }

  delete(url:string, config:AxiosRequestConfig):AxiosPromise{
    return this.__requestMethodWithoutData('delete',url,config)
  }

  head(url:string, config:AxiosRequestConfig):AxiosPromise{
    return this.__requestMethodWithoutData('head',url,config)
  }

  options(url:string, config:AxiosRequestConfig):AxiosPromise{
    return this.__requestMethodWithoutData('options',url,config)
  }

  post(url:string, config:AxiosRequestConfig, data:any):AxiosPromise{
    return this.__requestMethodWithData('post',url,config,data)
  }

  put(url:string, config:AxiosRequestConfig, data:any):AxiosPromise{
    return this.__requestMethodWithData('put',url,config,data)
  }

  patch(url:string, config:AxiosRequestConfig, data:any):AxiosPromise{
    return this.__requestMethodWithData('patch',url,config,data)
  }

  __requestMethodWithoutData(method:Method,url:string, config?:AxiosRequestConfig):AxiosPromise{
    return this.request(Object.assign(config||{},{
      method:method,
      url:url
    }))
  }

  __requestMethodWithData(method:Method,url:string, config?:AxiosRequestConfig,data?:any):AxiosPromise{
    return this.request(Object.assign(config||{},{
      method:method,
      url:url,
      data:data
    }))
  }
}
