import { AxiosPromise, AxiosRequestConfig, Method } from '../types'
import dispatchRequest from './dispatchRequest'

export default class Axios {
  // request(config:AxiosRequestConfig):AxiosPromise{
  //   return dispatchRequest(config)
  // }
  request(url:any,config?:any):AxiosPromise{
    if(typeof url === 'string'){
      if(!config){
        config = {}
      }
      config.url = url
    }else{
      config = url
    }
    return dispatchRequest(config)
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
