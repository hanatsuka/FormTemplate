<template>
    <div class="formTemplate">
        <el-form @submit.native.prevent
            ref="formTep"
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
            <slot name="spe"></slot>
            <div v-if="showFootBtn"
                class="text-center">
                <el-button :class="['btn-primary m-t-4', btnClass]"
                    :loading="btnLoading"
                    @click="handleClick"
                    type="primary">{{footBtnLabel}}</el-button>
                <el-button class="btn"
                    @click="resetForm"
                    v-if="showFootReset">RESET</el-button>
                <el-button class="btn"
                    @click="clearForm"
                    v-if="showFootClear">CLEAR</el-button>
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
        data: {
            type: Object,
            default () {
                return {}
            }
        },
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
            default: 'SUBMIT'
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
        },
        btnLoading: {
            type: Boolean,
            default () {
                return false
            }
        },
        btnClass: String
    },
    data () {
        return {
            ruleForm: {},
        }
    },
    created () {
        this.init()
    },
    watch: {
        formBaseData: {
            handler () {
                this.init()
            },
            deep: true
        }
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
            this.$emit('submitLoading', true)
            this.$refs.formTep.validate((valid) => {
                // 校验
                if (valid) {
                    let formInfo = deepClone(this.ruleForm)
                    // 统一过滤表单
                    formatFormData(formInfo)
                    this.$emit('submitForm', formInfo)
                } else {
                    this.$emit('submitLoading', false)
                }
            })
        },
        resetForm () {
            // 初始化表单
            this.$refs.formTep.resetFields()
        },
        clearForm () {
            // 清空表单
            let p = new Promise((resolve) => {
                clearFormData(this.ruleForm)
                resolve()
            })
            p.then(() => {
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

<style lang="scss" scoped>
</style>
