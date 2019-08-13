<template>
    <div class="formTemplate">
        <el-form ref="formTep"
            :inline="false"
            :label-position="labelPosition"
            :model="ruleForm"
            :rules="rules"
            :label-width="labelWidth">
            <slot name="form-item"></slot>
            <slot name="btn"></slot>
            <el-form-item class="formTemplate-item"
                v-for="formItem in formBaseData"
                :key="formItem.key"
                :prop="formItem.key"
                :label="formItem.label"
                :rules="formItem.rules">
                <components :is="transType(formItem.type)"
                    :ruleForm="ruleForm"
                    :formItem="formItem"></components>
            </el-form-item>
            <div v-if="showFootBtn">
                <el-button @click="handleClick"
                    type="primary">{{footBtnLabel}}</el-button>
                <el-button @click="resetForm"
                    v-if="showFootReset">重置</el-button>
                <el-button @click="clearForm"
                    v-if="showFootClear">清空</el-button>
            </div>
        </el-form>
    </div>
</template>

<script>
import Input from './components/Input'
import Select from './components/Select'
import Check from './components/Check'
import Date from './components/Date'
import iSwitch from './components/Switch'
import Radio from './components/Radio'
import { isUndefined, deepClone } from '@/utils'
import { transFormType, clearFormData, formatFormData, } from '@/utils/formFns'
export default {
    name: '',
    components: {
        Input, Select, Check, Date, iSwitch, Radio
    },
    props: {
        formBaseData: Array,
        rules: Object,
        showFootBtn: {
            type: Boolean,
            default () {
                return true
            }
        },
        footBtnLabel: {
            type: String,
            default: '提交'
        },
        labelPosition: {
            type: String,
            default: 'left'
        },
        labelWidth: {
            type: String,
            default: '100px'
        },
        showFootReset: {
            type: Boolean,
            default () {
                return true
            }
        },
        showFootClear: {
            type: Boolean,
            default () {
                return true
            }
        }
    },
    computed: {
        // ruleForm () {
        //     let obj = {}
        //     if (this.list.length > 0) {
        //         for (const iterator of this.list) {
        //             this.$set(obj, iterator.key, iterator.initVal || null)
        //         }
        //     }
        //     return obj
        //     // const handler = {
        //     //     get (target, property) {
        //     //         return target[property]
        //     //     },
        //     //     set (target, property, value) {
        //     //         target[property] = value
        //     //         return true
        //     //     }
        //     // }
        //     // return new Proxy(obj, handler)
        // }
    },
    data () {
        return {
            ruleForm: {},
        }
    },
    created () {
        this.init()
    },
    methods: {
        init () {
            // 初始化 绑定初始值
            if (this.formBaseData.length > 0) {
                for (const iterator of this.formBaseData) {
                    let initVal = iterator.initVal
                    if (isUndefined(initVal)) initVal = null
                    this.$set(this.ruleForm, iterator.key, initVal)
                }
            }
        },
        handleClick () {
            this.$refs.formTep.validate((valid) => {
                // 校验
                if (valid) {
                    let formInfo = deepClone(this.ruleForm)
                    // 统一过滤表单
                    formatFormData(formInfo)
                    console.log(formInfo)
                }
            })
        },
        resetForm () {
            // 初始化表单
            this.$refs.formTep.resetFields()
        },
        clearForm () {
            // 清空表单
            const p = () => {
                return new Promise((resolve, reject) => {
                    clearFormData(this.ruleForm)
                    resolve()
                })
            }
            p().then(() => {
                this.$refs.formTep.clearValidate()
            })
        },
        transType (value) {
            // 获取表单项类型
            return transFormType(value)
        }
    }
}
</script>

<style scoped>
.formTemplate-item {
    margin-right: 20px;
}
</style>
