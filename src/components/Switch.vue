<template>
    <div>
        <el-switch v-model="ruleForm[formItem.key]"
            active-color="#13ce66"
            :active-text="activeText"
            :inactive-text="inactive">
        </el-switch>
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
        activeText () {
            return this.formItem.activeText ? this.formItem.activeText : ''
        },
        inactive () {
            return this.formItem.inactive ? this.formItem.inactive : ''
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
