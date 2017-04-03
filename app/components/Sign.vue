<template id="login">
<div class="login-screen">
    <div class="login-form">
        <div class="control-group">
            <input type="text" class="form-control icon-input" v-model="name" :placeholder=" 'your_name' | msg " id="login-name">
            <label class="login-field-icon fui-user" for="login-name"></label>
        </div>

        <div class="control-group">
            <input type="password" class="form-control icon-input" v-model="password" :placeholder=" 'password' | msg " id="login-pass">
            <label class="login-field-icon fui-lock" for="login-pass"></label>
        </div>

        <button type="button" class="btn btn-primary btn-large btn-block sign-in-btn" disabled="disabled" @click="signIn">{{ 'sign_in' | msg }}</button>

        <input type="checkbox" checked data-toggle="switch" data-on-color="success" data-off-color="primary" id="sign_type" />
    </div>
    <!--<img src="../style/images/logo.png" />-->
</div>
</template>

<script>
import Toastr from '../plugin/toastr/toastr.min'
import Account from '../script/server/account.js'
import GlobalVue from '../script/globalVue.js'
import Message from '../script/message.js'

export default {
    data: function() {
        return {
            name: '',
            password: ''
        }
    },
    watch: {
        name: function(val, oldVal) {
            this.checkInput();
        },
        password: function(val, oldVal) {
            this.checkInput();
        }
    },
    methods: {
        checkInput: function() {
            if (this.password && this.name) {
                $(".sign-in-btn").removeAttr("disabled");
            } else {
                $(".sign-in-btn").attr("disabled", "disabled");
            }
        },
        signIn: function() {
            if ($("#sign_type").is(":checked")) {
                Account.signIn({
                    name: this.name,
                    password: this.password
                }, this.signCallback);
            } else {
                Account.signUp({
                    name: this.name,
                    password: this.password
                }, this.signCallback)
            }
            return false;
        },
        signCallback: function(res) {
            if (res.type === 'danger') {
                Toastr.error(Message.filters(res.content));
            } else if (res.type === 'success') {
                GlobalVue.instance.$router.push('index')
            }
        }
    },
    mounted: function() {
        Account.checkLogin();
        $(this.$el).find('[data-toggle="switch"]').bootstrapSwitch({
            onText: Message.filters("sign_in_switch"),
            offText: Message.filters("sign_up_switch"),
        });
    },
    filters: {
        msg: Message.filters
    }
}
</script>

<style scoped>
.login-screen {
    background: #ecf0f1;
    height: inherit;
    padding-top: 120px;
}

.login-form {
    width: 300px;
    margin: auto;
    background-color: #eceff1;
    border-radius: 6px;
    padding: 10px 10px;
    text-align: center;
}

.login-form .control-group {
    margin-bottom: 10px;
}

.sign-in-btn {
    margin-bottom: 10px;
}

.icon-input:focus+label {
    color: #1aba9c
}
</style>
