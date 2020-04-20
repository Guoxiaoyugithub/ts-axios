import { AxiosRequestConfig } from '../types'
import { isPlainObject,deepMerge} from '../helpers/util'

/**
 * 默认的合并策略，优先取val2中的值
 */
function defaultStrat(val1:any,val2:any):any{
  return typeof val2 !== 'undefined'? val2 :val1
}

/**
 * 只取val2中的值
 */
function fromVal2Strat(val1:any,val2:any):any {
  if(typeof val2 !== 'undefined'){
    return val2
  }
}

/**
 * 深度合并
 */
function deepMergeStrat(val1:any,val2:any):any{
  if(isPlainObject(val2)){
    return deepMerge(val1,val2)
  }else if(typeof val2 !== 'undefined'){
    return val2
  }else if (isPlainObject(val1)){
    return deepMerge(val1)
  }else if(typeof val1 !== 'undefined'){
    return val1
  }
}

const strats = Object.create(null)
const stratsKeysFromVal2 = ['url','params','data']
const stratsKeysDeepMerge = ['headers']

stratsKeysFromVal2.forEach(key=>{
  strats[key] = fromVal2Strat
})

stratsKeysDeepMerge.forEach(key=>{
  strats[key] = deepMergeStrat
})

/**
 * 合并请求的配置文件
 * @config1 默认的配置参数
 * @config2 传入的配置参数
 */
export default function mergeConfig(config1:AxiosRequestConfig,config2?:AxiosRequestConfig):AxiosRequestConfig {
  if(!config2){
    config2 = {}
  }

  const config = Object.create(null)

  for (let key in config2){
    mergeField(key)
  }

  for (let key in config1){
    if(!config2[key]){
      mergeField(key)
    }
  }

  function mergeField(key:string):void{
    const strat = strats[key] || defaultStrat
    config[key] = strat(config1[key],config2![key])
  }

  return config
}
