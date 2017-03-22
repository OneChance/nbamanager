<template id="login">
<div class="login-screen">
    <div class="login-form">
        <div class="control-group">
            <input type="text" class="form-control" v-model="name" placeholder="Enter your name">
            <label class="login-field-icon fui-man-16" for="login-name"></label>
        </div>

        <div class="control-group">
            <input type="password" class="form-control" v-model="password" placeholder="Password">
            <label class="login-field-icon fui-lock-16" for="login-pass"></label>
        </div>

        <button type="button" class="btn btn-primary btn-large btn-block" id="login-btn" disabled="disabled">Login</button>
    </div>
</div>
</template>

<script>
import toastr from '../plugin/toastr/toastr.min'
import Account from '../script/server/account.js'
import GlobalVue from '../script/globalVue.js'

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
                $("#login-btn").removeAttr("disabled");
            } else {
                $("#login-btn").attr("disabled", "disabled");
            }
        }
    },
    mounted: function() {
        $("#login-btn").on('click', (e) => {
            Account.login({
                name: this.name,
                password: this.password
            }, (res) => {
                if (res.type === 'danger') {
                    toastr.error(res.content);
                } else if (res.type === 'success') {
                    GlobalVue.instance.$router.push('index')
                }
            });
            return false;
        });
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
}
</style>
