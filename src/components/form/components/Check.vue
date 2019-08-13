<template>
    <div>
        <el-checkbox-group v-model="ruleForm[formItem.key]">
            <el-checkbox v-for="item in checkOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"></el-checkbox>
        </el-checkbox-group>
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
        checkOptions () {
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
