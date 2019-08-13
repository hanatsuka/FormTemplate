<template>
    <div>
        <el-input-number v-model="ruleForm[formItem.key]"
            :precision="2"
            :step="step"
            :max="max"
            :min="min"></el-input-number>
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
        step () {
            return this.formItem.step ? this.formItem.step : 1
        },
        max () {
            return this.formItem.max ? this.formItem.max : Infinity
        },
        min () {
            return this.formItem.min ? this.formItem.min : -Infinity
        },
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
