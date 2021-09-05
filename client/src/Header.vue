<template>
    <div id="nav">
    <b-navbar variant="dark" type="dark">
        <b-container>
            <b-navbar-brand to="/">InterestHub</b-navbar-brand>
                <b-navbar-nav v-if="isLoggedIn">
                    <b-nav-item to="/communities">Сообщества</b-nav-item>
                    <b-nav-item to="/hub">Хаб</b-nav-item>
                    <b-nav-item-dropdown>
                        <b-dropdown-item to="/profile">Профиль</b-dropdown-item>
                        <b-dropdown-item>ЛС</b-dropdown-item>
                        <b-dropdown-divider/>
                        <b-dropdown-item @click="logout">Выйти</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
                <b-navbar-nav v-else>
                    <b-nav-item to="/" exact>Главная страница</b-nav-item>
                    <b-nav-item to="/login" exact>Войти</b-nav-item>
                    <b-nav-item to="/register" exact>Создать аккаунт</b-nav-item>
                </b-navbar-nav>
        </b-container>
    </b-navbar>
    </div>
</template>

<script>
export default {
    props: {
        isLoggedIn: Boolean,
        updateState: Function
    },
    name: 'Header',
    methods: {
        logout: function(){
            fetch('/logout');
            this.updateState();
            this.$router.push('/login');
        }
    },
}
</script>