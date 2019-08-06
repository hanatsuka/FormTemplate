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
            throw new ReferenceError("formType \"" + typeNum + "\" does not exist.open fn.js and add it");
    }
    return componentName
}

export const formatFormData = (obj) => {
    for (const key in obj) {
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
    return obj
}

export const clearFormData = (obj) => {
    for (const key in obj) {
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
    return obj
}

export const jugeType = (obj) => {
    let getType = Object.prototype.toString
    return getType.call(obj)
}

export const isArr = (target) => {
    return jugeType(target) === '[object Array]'
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