const toString = Object.prototype.toString
export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

export function isObject(val: any): val is Object {
  return val !== null && typeof val === 'object'
}

export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}

export function extend<T,U>(to:T,from:U):T&U{
  for (const key in from){
    (to as T & U)[key] = from[key] as any
  }
  return to as T&U
}

/**
 * 深度合并，把所有多个对象的属性全部拷在一个对象中
 */
export function deepMerge(...objs: any[]): any {
  const result = Object.create(null)
  objs.forEach(obj => {
    if (obj) {
      // 遍历obj中每一个属性
      Object.keys(obj).forEach(key => {
        const val = obj[key]
        if (isPlainObject(val)) {
          // 是对象，还要继续遍历
          // 这个属性是否已经存在
          if (isPlainObject(result[key])) {
            result[key] = deepMerge(result[key], val)
          } else {
            const secresult = deepMerge({}, val)
            Object.keys(secresult).forEach(seckey=>{
              result[seckey] = secresult[seckey]
            })
          }
        // 不是普通对象，直接赋值
        } else {
          // console.log(`result[${key}] = ${val}`)
          result[key] = val
        }
      })
    }
  })
  return result
}
