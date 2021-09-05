<template>
    <b-card header="Авторизация" class="mt-3 mx-5">
        <b-form @submit.prevent="submitHandler">
            <b-form-group
                label="Имя пользователя"
                label-for="username"
                class="mb-3"
            >
                <b-form-input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Введите имя пользователя"
                    required/>
            </b-form-group>
            <b-form-group label="Пароль" label-for="password" class="mb-3">
                <b-form-input id="password" name="password" type="password" placeholder="Введите пароль" required/>
            </b-form-group>
            <b-alert variant="danger" :show="errorMsg.length>0">{{errorMsg}}</b-alert>
            <b-button type="submit" variant="primary">Войти</b-button>
        </b-form>
    </b-card>
</template>

<script>
export default {
    props: {
        updateState: Function
    },
    name: "Login",
    methods: {
        submitHandler: function(e){
            let data = new FormData(e.target);

            fetch('/login', { 
                method: 'post',
                body: data
            })
            .then(res=>res.json())
            .then(data=>{
                this.errorMsg = data.message;
                if (data.success){
                    this.updateState();
                    this.$router.push('/hub');
                }
            });
        }
    },
    data(){
        return{
            errorMsg: '',
        }
    }
}
</script>