<!--父子组件传值 操纵模态框 弹出、关闭-->

<template>
    <div class="login">
        <span @click="close_login"> x </span>
    </div>
</template>

<script>
    export default {
        name: "Login_0",
        methods: {
            close_login() {
            // 子传父组件 this.emit
                this.$emit("close")  // 对应父组件event
            }
        }
    }
</script>

<style scoped>
    .login {
        width: 100vw;
        height: 100vw;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 666;
        background-color: rgba(0,0,0,0.3);
    }

    span {
        font-size: 30px;
        cursor: pointer;
    }

</style>