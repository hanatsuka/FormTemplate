<template>
    <div>
        <el-select v-model="ruleForm[formItem.key]"
            :multiple="Array.isArray(formItem.initVal) "
            :filterable="!formItem.options"
            clearable
            :remote="!formItem.options"
            placeholder="请输入关键词"
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
export default {
    name: '',
    props: {
        ruleForm: Object,
        formItem: Object,
        remoteMethod: Function
    },
    computed: {
        selectOptions () {
            const options = this.formItem.options
            if (options) {
                return options
            } else {
                //jiekouna
            }
        }
    },
    data () {
        return {
        }
    },

    methods: {}
}
</script>

<style >
</style>
