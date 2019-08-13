<template>
    <div>
        <el-date-picker v-model="ruleForm[formItem.key]"
            :type="dateType"
            value-format="timestamp"
            placeholder="选择日期">
        </el-date-picker>
    </div>
</template>

<script>
export default {
    name: '',
    props: {
        ruleForm: Object,
        formItem: Object,
    },
    computed: {
        dateType () {
            return this.formItem.dateType ? this.formItem.dateType : 'date'
        }
    },
    data () {
        return {
        }
    },

    methods: {}
}
</script>

<style lang='scss'>
</style>
