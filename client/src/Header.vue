<template>
    <div id="nav">
    <b-navbar variant="dark" type="dark">
        <b-container>
        <b-navbar-brand to="/">InterestHub</b-navbar-brand>
            <b-navbar-nav>
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
    name: 'Header'
}
</script>