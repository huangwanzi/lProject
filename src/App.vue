<template>
  <v-app>
    <v-app-bar app color="teal lighten-5" white>
      <div class="d-flex align-center">
        <v-img alt="Vuetify Logo" class="shrink mr-2" contain
          src="https://i.pinimg.com/236x/10/9c/67/109c674210afcf9fc56a19d2efb15a39.jpg"
          transition="scale-transition" width="50" />
      </div>

      <v-spacer></v-spacer>

      <v-btn icon to="/">
        <v-icon>mdi-home</v-icon>
      </v-btn>

      <v-btn icon to="/RegisterUser">
        <v-icon>mdi-account-plus-outline</v-icon>
      </v-btn>

      <v-btn icon to="/Login">
        <v-icon>mdi-login-variant</v-icon>
      </v-btn>
      <v-btn icon to="/ghat">
        <v-icon>mdi-clipboard-account</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>

export default {
  data: () => ({
    drawer: null,
    items: [
      { title: "Home", icon: "mdi-home", to: "/" },

      { title: "login", icon: "mdi-login", to: "/Login" },
      {
        title: "Register",
        icon: "mdi-registered-trademark",
        to: "/RegisterUser",
      },
      { title: "admin", icon: "mdi-laptop", to: "/about" },
    ],
  }),
};

</script>
