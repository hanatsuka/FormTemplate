<template>
    <div>
        <el-input v-model="ruleForm[formItem.key]"
            :placeholder="placeholder"
            :type="inputType"
            rows="4"
            :maxlength="maxlength"
            show-word-limit
            :show-password="showPsd"
            clearable></el-input>
    </div>
</template>

<script>
export default {
    name: '',
    props: {
        ruleForm: Object,
        formItem: Object,
        showWordLimit: Boolean
    },
    computed: {
        placeholder () {
            const item = this.formItem
            return item.placeholder ? item.placeholder : `请输入${item.label}`
        },
        inputType () {
            const item = this.formItem
            return item.inputType ? item.inputType : `text`
        },
        maxlength () {
            const item = this.formItem
            return item.maxlength ? item.maxlength : null
        },
        showPsd () {
            return this.inputType === 'password' ? true : false
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
