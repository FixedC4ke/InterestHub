<template>
    <b-card header="Регистрация" class="mt-3 mx-5">
        <b-form @submit.prevent="submitHandler">
            <b-alert variant="danger"></b-alert>
            <b-form-group 
                label="Имя пользователя" 
                class="mb-3">
                <b-form-input 
                    name="username"
                    id="username"
                    type="text"
                    placeholder="Введите имя пользователя"
                    required
                />
            </b-form-group>
            <b-form-group 
                label="Пароль" 
                class="mb-3">
                <b-form-input 
                    name="password"
                    id="password"
                    type="password"
                    placeholder="Введите пароль"
                    required
                />
            </b-form-group>
            <b-form-group 
                label="Подтверждение пароля" 
                class="mb-3">
                <b-form-input 
                    name="confirmpass"
                    id="confirmpass"
                    type="password"
                    placeholder="Введите пароль еще раз"
                    required
                />
            </b-form-group>
            <b-form-group 
                label="Электронная почта" 
                class="mb-3">
                <b-form-input 
                    name="email"
                    id="email"
                    type="email"
                    placeholder="Введите электронную почту"
                />
            </b-form-group>
            <b-form-group 
                label="Загрузите аватарку" 
                class="mb-3">
                <b-form-file 
                    name="avatar"
                    id="avatar"
                    placeholder="Выберите файл"
                />
            </b-form-group>
            <b-button variant="primary" type="submit">Зарегистрироваться</b-button>
        </b-form>
    </b-card>
</template>

<script>
export default {
    name: 'Register',
    methods: {
        submitHandler: function(e){
        let data = new FormData(e.target);

        fetch('/register', {
            method: 'post',
            body: data
        })
            .then(res=>res.json())
            .then(data=>{
                this.errorMsg=data.message;
                if (data.success){
                    this.$router.push('/login');
                }
            });
        }
    },
    data() {
        return {
            errorMsg: ''
        }
    }
}
</script>