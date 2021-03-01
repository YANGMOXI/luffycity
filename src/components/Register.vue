<template>
    <div class="register">
        <div class="box">
            <i class="el-icon-close" @click="close_register"></i>
            <div class="content">
                <div class="nav">
                    <span class="active">新用户注册</span>
                </div>
                <el-form>
                    <el-input
                            placeholder="手机号"
                            prefix-icon="el-icon-phone-outline"
                            v-model="mobile"
                            clearable
                            @blur="check_mobile">
                    </el-input>
                    <el-input
                            placeholder="密码"
                            prefix-icon="el-icon-key"
                            v-model="password"
                            clearable
                            show-password>
                    </el-input>
                    <el-input
                            placeholder="验证码"
                            prefix-icon="el-icon-chat-line-round"
                            v-model="sms"
                            clearable>
                        <template slot="append">
                            <span class="sms" @click="send_sms">{{ sms_interval }}</span>
                        </template>
                    </el-input>
                    <el-button type="primary" @click="register">注册</el-button>
                </el-form>
                <div class="foot">
                    <span @click="go_login">立即登录</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Register",
        data() {
            return {
                mobile: '',
                password: '',
                sms: '',
                sms_interval: '获取验证码',
                is_send: false,
            }
        },
        methods: {
            close_register() {
                this.$emit('close', false)
            },
            go_login() {
                this.$emit('go')
            },
            check_mobile() {
                if (!this.mobile) return;
                // 字符串.match(/正则表达式/)
                if (!this.mobile.match(/^1[3-9][0-9]{9}$/)) {
                    this.$message({
                        message: '手机号不合法',
                        type: 'warning',
                        duration: 1500,
                        onClose: () => {
                            this.mobile = '';
                        }
                    });
                    return false;
                }
                // 发送axios请求
                this.$axios.get(
                    this.$settings.base_url + '/user/check_mobile/',
                    {params: {mobile: this.mobile}}
                ).then(res => {
                    console.log(res.data)
                    if (res.data.code) {
                        // 手机号存在，允许发送验证码
                        this.$message({
                            message: '该手机号已注册，快去登录吧',
                            type: 'warning',
                            duration: 1500,
                            onClose: () => {
                                this.go_login() // 跳转login窗口
                            }
                        });
                    } else { // 号码未注册，可发送验证码
                        this.is_send = true;
                    }
                }).catch(errors => {
                    console.log(errors)
                })
            },
            send_sms() {
                if (!this.is_send) return;
                this.is_send = false;
                let sms_interval_time = 60;
                this.sms_interval = "发送中...";
                // 发送验证码
                this.$axios.get(
                    this.$settings.base_url + '/user/send/',
                    {params: {mobile: this.mobile}}
                ).then(res => {
                    console.log(res.data);

                    if (res.data.code) {
                        this.$message({
                            message: '发送验证码成功',
                            type: 'success',
                            duration: 1000,
                        });
                    } else {
                        this.$message({
                            message: res.data.msg,
                            type: 'warning',
                            duration: 1000,
                        });
                    }
                }).catch(errors => {
                    console.log(errors)
                })

                let timer = setInterval(() => {
                    if (sms_interval_time <= 1) {
                        clearInterval(timer); // 时间<=1,清除定时器
                        this.sms_interval = "获取验证码";
                        this.is_send = true; // 重新回复点击发送功能的条件
                    } else {
                        sms_interval_time -= 1;
                        this.sms_interval = `${sms_interval_time}秒后再发`;
                    }
                }, 1000);
            },
            register() {
                if (this.mobile && this.password && this.sms) {
                    this.$axios.post(this.$settings.base_url + '/user/register/', {
                        mobile: this.moblie,
                        password: this.password,
                        code: this.sms
                    }).then(res => {
                        // 注册成功
                        if (res.data.code) {
                            this.$message({
                                message: '注册成功',
                                type: 'success',
                                duration: 1000,
                                onClose: () => {
                                    this.go_login() // 跳转login窗口
                                }
                            });
                        } else {
                            this.$message({
                                message: '注册失败，请稍后重试',
                                type: 'warning',
                                duration: 1000,
                                onClose: () => {
                                    this.mobile = ''
                                    this.sms = ''
                                    this.password = ''
                                }
                            });
                        }
                    }).catch(errors => {
                        console.log(errors)
                    })
                } else {
                    this.$message({
                        message: '您有未填写的信息',
                        type: 'error',
                        duration: 1500,
                    });
                }
            },
        }
    }
</script>

<style scoped>
    .register {
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 10;
        background-color: rgba(0, 0, 0, 0.3);
    }

    .box {
        width: 400px;
        height: 480px;
        background-color: white;
        border-radius: 10px;
        position: relative;
        top: calc(50vh - 240px);
        left: calc(50vw - 200px);
    }

    .el-icon-close {
        position: absolute;
        font-weight: bold;
        font-size: 20px;
        top: 10px;
        right: 10px;
        cursor: pointer;
    }

    .el-icon-close:hover {
        color: darkred;
    }

    .content {
        position: absolute;
        top: 40px;
        width: 280px;
        left: 60px;
    }

    .nav {
        font-size: 20px;
        height: 38px;
        border-bottom: 2px solid darkgrey;
    }

    .nav > span {
        margin-left: 90px;
        color: darkgrey;
        user-select: none;
        cursor: pointer;
        padding-bottom: 10px;
        border-bottom: 2px solid darkgrey;
    }

    .nav > span.active {
        color: black;
        border-bottom: 3px solid black;
        padding-bottom: 9px;
    }

    .el-input, .el-button {
        margin-top: 40px;
    }

    .el-button {
        width: 100%;
        font-size: 18px;
    }

    .foot > span {
        float: right;
        margin-top: 20px;
        color: orange;
        cursor: pointer;
    }

    .sms {
        color: orange;
        cursor: pointer;
        display: inline-block;
        width: 70px;
        text-align: center;
        user-select: none;
    }
</style>