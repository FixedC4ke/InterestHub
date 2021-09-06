<template>
  <div id="nav">
    <b-navbar variant="dark" type="dark">
      <b-container>
        <b-navbar-brand to="/">InterestHub</b-navbar-brand>
        <b-navbar-nav v-if="currentUser.isAuthenticated">
          <b-nav-item to="/communities">Сообщества</b-nav-item>
          <b-nav-item to="/hub">Хаб</b-nav-item>
          <b-nav-item-dropdown>
            <template #button-content>
              <img v-if="pfp" class="pfpImg" :src="pfp" alt="Profile picture" />
            </template>
            <b-dropdown-item to="/profile">Профиль</b-dropdown-item>
            <b-dropdown-item>ЛС</b-dropdown-item>
            <b-dropdown-divider />
            <b-dropdown-item @click="logout">Выйти</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
        <b-navbar-nav v-else>
          <b-nav-item to="/">Главная страница</b-nav-item>
          <b-nav-item to="/login">Войти</b-nav-item>
          <b-nav-item to="/register">Создать аккаунт</b-nav-item>
        </b-navbar-nav>
      </b-container>
    </b-navbar>
  </div>
</template>

<script>
export default {
  props: {
    currentUser: Object,
    updateState: Function,
  },
  name: "Header",
  data(){
      return{
          pfp: null
      }
  },
  methods: {
    logout: function() {
      fetch("/logout").then(() => {
        this.updateState();
        this.$router.push("/login");
      });
    },
    getImgUrl: async function(){
        let response = await fetch('/profilepicture');
        let blob = await response.blob();
        this.pfp = URL.createObjectURL(blob);
    }
  },
  updated(){
      if (this.currentUser.isAuthenticated){
          this.getImgUrl();
      }
  }
};
</script>

<style scoped>
.pfpImg {
  height: 1.2rem;
}
</style>
