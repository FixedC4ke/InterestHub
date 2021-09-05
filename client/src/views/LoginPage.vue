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
            <b-alert variant="danger" :show="errorMessage.length>0">{{errorMessage}}</b-alert>
            <b-button type="submit" variant="primary">Войти</b-button>
        </b-form>
    </b-card>
</template>

<script>
export default {
    name: "LoginPage",
    methods: {
        submitHandler: function(e){
            let data = new FormData(e.target);

            fetch('/login', { 
                method: 'post',
                body: data
            })
            .then(res=>res.json())
            .then(res=>{
                this.errorMessage = res.message;
                if (res.success){
                    this.$router.push('/hub');
                }
            });
            console.log(data.get('username'));
        }
    },
    data(){
        return{
            errorMessage: '',
        }
    }
}
</script>