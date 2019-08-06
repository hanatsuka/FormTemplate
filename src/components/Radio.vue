<template>
    <div>
        <el-radio v-model="ruleForm[formItem.key]"
            v-for="item in radioOptions"
            :key="item.value"
            :label="item.value">{{item.label}}</el-radio>
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
        radioOptions () {
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

<style lang='scss'>
</style>
