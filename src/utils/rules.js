/**
 * 添加校验规则字典
 */
export const rules = {
    isRequired: i => {
        const readObj = i[0]
        const message = `请${readObj.keyType ? '选择' : '输入'}${readObj.keyName}`
        const trigger = readObj.keyType ? 'change' : 'blur'
        const result = [{
            required: true,
            trigger,
            message,
        }]
        return i.concat(result)
    },
    intNumber: i => {
        const result = [{
            trigger: 'change',
            message: '请输入正整数',
            pattern: /^[0-9]+$/,
        }]
        return i.concat(result)
    },
    doubleFloat: i => {
        const result = [{
            pattern: /^\d+(\.\d{0,2})?$/,
            message: '请输入可带两位小数的正数'
        }]
        return i.concat(result)
    }
}