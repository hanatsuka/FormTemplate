const jugeType = (obj) => {
    let getType = Object.prototype.toString
    return getType.call(obj)
}

export const isArr = (target) => {
    return jugeType(target) === '[object Array]'
}

export const isObj = (target) => {
    return jugeType(target) === '[object Object]'
}

export const isString = (target) => {
    return jugeType(target) === '[object String]'
}

export const isNumber = (target) => {
    return jugeType(target) === '[object Number]'
}

export const isBoolean = (target) => {
    return jugeType(target) === '[object Boolean]'
}

export const isUndefined = (target) => {
    return jugeType(target) === '[object Undefined]'
}

export const isNull = (target) => {
    return jugeType(target) === '[object Null]'
}

/**
 * 对象深拷贝
 */
export const deepClone = data => {
    let obj
    if (isArr(data)) {
        obj = []
        for (let i = 0, len = data.length; i < len; i++) {
            obj.push(deepClone(data[i]))
        }
    } else if (isObj(data)) {
        obj = {}
        for (let key in data) {
            obj[key] = deepClone(data[key])
        }
    } else {
        // 不再具有下一层次
        return data
    }
    return obj
}


/**
 * 获取深层次的数组
 * keyName需要为a.b.c 对应data[a][b][c]
 */
export const getDeepArr = (data, keyName) => {
    if (isUndefined(keyName) || isNull(keyName)) {
        // 没有对象数组键名
        // 直接返回data数组
        if (isArr(data)) return data
        throwError("the data is not an Array, please provide the keyName to match correct Array");
    } else {
        const keyList = keyName.split(',')
        let value = data
        for (const iterator of keyList) {
            if (!value.hasOwnProperty(iterator) || isUndefined(value)) {
                throwError("please check the keyName's level")
            }
            value = value[iterator]
        }
        if (isArr(value)) return value
        throwError("the data is not an Array, please provide the keyName to match correct Array");
    }

}

export const throwError = (msg) => {
    throw new ReferenceError(msg);
}