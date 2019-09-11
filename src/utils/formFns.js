import axios from 'axios'
import {
    rules
} from './rules' // 引入规则配置
import {
    isArr,
    isBoolean,
    isNumber,
    isString,
    isUndefined,
    getDeepArr
} from './index'
/**
 * 定义组件名
 */
export const transFormType = (typeNum) => {
    let componentName = ''
    switch (typeNum) {
        case 0:
            componentName = 'Input'
            break
        case 1:
            componentName = 'Select'
            break
        case 2:
            componentName = 'Check'
            break
        case 3:
            componentName = 'Date'
            break
        case 4:
            componentName = 'iSwitch'
            break
        case 5:
            componentName = 'Radio'
            break
        default:
            throwError("formType \"" + typeNum + "\" does not exist.open fn.js and add it");
    }
    return componentName
}

/**
 * 链式设置校验规则
 */
export const setRules = (function () {
    return function (keyName, keyType) {
        const fnStack = []
        const proxy = new Proxy({}, {
            get(target, fnName) {
                if (fnName === 'get') {
                    return fnStack.reduce((val, fn) => {
                        return fn(val)
                    }, [{
                        keyName,
                        keyType
                    }])
                }
                fnStack.push(rules[fnName])
                return proxy
            }
        })

        return proxy
    }
})()

/**
 * 格式化表单数据
 */
export const formatFormData = (obj, keys) => {
    for (const key of keys) {
        let value = obj[key]
        if (isArr(value)) {
            obj[key] = value.toString()
        }
        if (isBoolean(value)) {
            obj[key] = value ? 1 : 0
        }
        if (obj[key] === '' || isUndefined(value)) {
            obj[key] = null
        }
    }
}

/**
 * 清空表单数据
 */
export const clearFormData = (obj, keys) => {
    for (const key of keys) {
        let value = obj[key]
        if (isArr(value)) {
            obj[key] = []
        }
        if (isString(value)) {
            obj[key] = ''
        }
        if (isNumber(value)) {
            obj[key] = null
        }
        if (isBoolean(value)) {
            obj[key] = false
        }
    }
}

/**
 * 通过请求获取选项列表
 */
export const getOptionsByUrl = (urlOptions) => {
    const {
        url,
        method,
        keyName
    } = urlOptions
    const p = () => {
        return axios({
            url,
            method
        })
    }
    return p().then(res => {
        const data = res.data.data
        const result = getDeepArr(data, keyName)
        return result
    }).catch(err => {
        console.log(err)
    })
}