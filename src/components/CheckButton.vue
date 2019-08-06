<template>
    <el-checkbox-group v-model="form[keyName]"
        style="display:inline-flex"
        :fill="fillColor"
        :text-color="textColor"
        :min="min"
        :max="max ? max : NaN"
        :disabled="disabled"
        :size="size"
        @change="groupChangeFns">
        <div v-if="buttonStyle"
            :style="inlineStyle ? 'display:inline-flex' : ''">
            <el-input v-if="!selectNid && options.length === 0"
                :placeholder="placeholder"
                clearable
                v-model="searchValue"
                @input="changeSearchValue"></el-input>
            <el-checkbox-button v-for="list in selectOptions"
                style="margin-right:2px"
                :label="list[dictValue]"
                :key="list.id ? list.id : list[dictValue]">{{list[dictName]}}</el-checkbox-button>
        </div>
        <div v-else>
            <el-checkbox v-if="indeterminateFlag"
                :indeterminate="isIndeterminate"
                @change="handleCheckAllChange">{{indeterminateTitle}}</el-checkbox>
            <el-checkbox v-for="list in selectOptions"
                style="margin-right:2px"
                :label="list[dictValue]"
                :key="list.id ? list.id : list[dictValue]">{{list[dictName]}}</el-checkbox>
        </div>
    </el-checkbox-group>
</template>

<script>
import { debounce } from '@/utils/public'
export default {
    name: 'checkBox',
    props: {
        label: {
            type: String,
            default: ''
        },
        prop: {
            type: String,
            default: ''
        },
        buttonStyle: {
            type: Boolean,
            default: true
        },
        inlineStyle: {
            type: Boolean,
            default: false
        },
        form: {
            type: Object
        },
        keyName: {
            type: String,
            default: ''
        },
        selectNid: {
            type: String,
            default: null
        },
        options: {
            type: Array,
            default () {
                return []
            }
        },
        dataUrl: { // 接口地址
            type: String,
            default: ''
        },
        dictName: { // 下拉显示的值
            type: String,
            default: 'dictName'
        },
        dictValue: { // 下拉的值
            type: String,
            default: 'dictValue'
        },
        queryKey: { // 查询key值
            type: String,
            default: 'dictName'
        },
        otherParams: { // 其他查询条件
            type: Object,
            default () {
                return {}
            }
        },
        fillColor: {
            type: String,
            default: '#439057'
        },
        min: {
            type: Number,
            default: 0
        },
        max: {
            type: Number,
            default: null
        },
        size: {
            type: String,
            default: 'mini'
        },
        disabled: {
            type: Boolean,
            default: false
        },
        textColor: {
            type: String,
            default: '#fff'
        },
        indeterminateFlag: {
            type: Boolean,
            default: false
        },
        indeterminateTitle: {
            type: String,
            default: '全选'
        },
        placeholder: {
            type: String,
            default: '输入查询条件'
        }
    },
    data () {
        return {
            searchValue: '',
            selectOptions: [],
            isIndeterminate: false
        }
    },
    created () {
        this.init()
    },
    computed: {
        optionValues () {
            let list = []
            for (const iterator of this.selectOptions) {
                list.push(iterator[this.dictValue])
            }
            return list
        }
    },
    methods: {
        init () {
            if (!this.selectNid && !this.dataUrl) { // 获取传递过来的数组
                this.getOptions()
            } else {
                this.loadDict()
            }
        },
        getOptions () {
            this.selectOptions = this.options
            if (this.selectOptions.length > 0) {
                return true
            } else {
                throw new ReferenceError("没传nid 没传dataUrl 没传下拉选项");
            }
        },
        loadDict () {
            if (this.selectNid) {
                // let options = {
                //     url: this.urlAdmin.getDictList,
                //     data: {
                //         nid: this.selectNid
                //     }
                // }
                // this.sendRequest(options).then(res => {
                //     this.loading = false
                //     this.selectOptions = res
                // }).catch(res => {
                //     this.loading = false
                // })
            } else {
                this.loadApiData()
            }
        },
        loadApiData () {
            let obj = Object.assign({}, this.otherParams)
            obj[this.queryKey] = this.searchValue
            let a = {
                url: this.dataUrl,
                data: obj
            }
            this.sendRequest(a).then(res => {
                this.loading = false
                this.selectOptions = res.records
                obj = null
            }).catch(res => {
                this.loading = false
                obj = null
            })
        },
        changeSearchValue () {
            this.loadApiData()
        },
        groupChangeFns (val) {
            // console.log(`group after changed ${val}`)
        },
        handleCheckAllChange (val) {
            this.form[this.keyName] = val ? this.optionValues : []
            this.isIndeterminate = !this.isIndeterminate
        }
    }
}
</script>

<style>
</style>
