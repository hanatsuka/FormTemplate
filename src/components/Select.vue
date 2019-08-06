<template>
    <div>
        <el-select v-model="ruleForm[formItem.key]"
            :multiple="isArray(formItem.initVal) "
            :filterable="!formItem.options"
            clearable
            :remote="!formItem.options"
            :placeholder="placeholder"
            :remote-method="remoteMethod">
            <el-option v-for="item in selectOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
        </el-select>
    </div>
</template>

<script>
import { isArr, getOptionsByUrl } from '@/utils'
export default {
    name: '',
    props: {
        ruleForm: Object,
        formItem: Object,
        remoteMethod: Function
    },
    computed: {
        selectOptions () {
            const { options, urlOptions } = this.formItem
            if (!options && !urlOptions) throw new ReferenceError("options or urlOptions\" does not exist.open fn.js and add it");
            if (options) {
                return options
            } else {
                const data = getOptionsByUrl(urlOptions)
                return data
                //jiekouna
            }
        },
        placeholder () {
            const item = this.formItem
            return item.placeholder ? item.placeholder : `请输入${item.label}`
        }
    },
    data () {
        return {
        }
    },

    methods: {
        isArray (value) {
            return isArr(value)
        }
    }
}
</script>

<style >
</style>
