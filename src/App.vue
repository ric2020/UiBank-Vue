<template>
  <v-app>
    <v-app-bar app color="blue" dense dark shrink-on-scroll src="https://picsum.photos/id/104/1920/1080?random" scroll-target="#scrolling-techniques-2">
      <v-toolbar-title>UiBank Bank</v-toolbar-title>
      <v-btn to="/Quotes" class="ma-3">Loan Quotes</v-btn>
      <v-btn to="/Accounts" class="ma-3">Accounts</v-btn>
      <v-
      <v-spacer></v-spacer>

      <div v-if="!this.$store.state.loggedIn">
      <v-btn to="/Register" class="ma-3">Register</v-btn>
      <v-btn to="/Login" >Login</v-btn>
      </div>
      <div v-else>
        <v-label>Hi {{this.$store.state.user.username}}    </v-label>
      <v-btn v-if="this.$store.state.loggedIn" @click="logout" >Logout</v-btn>
      </div>
            <v-menu bottom left>
        <template v-slot:activator="{ on }">
          <v-btn dark icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(item, i) in items" :key="i" @click>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
 
    </v-app-bar>
    <br />
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import Accounts from "./components/Accounts";
import Account from "./components/Account";
import Quotes from "./components/Quotes";
import NewQuote from "./components/NewQuote";
import Quote from "./components/Quote";
import Register from "./components/Register";
import Login from "./components/Login";

export default {
  name: "App",

  components: {
    Account,
    Accounts,
    Quote,
    Quotes,
    NewQuote,
    Register,
    Login
  },

  data() {
    return {
      items: [{ title: 'Hi'},{title:'Bye'}]
    };
  },

  methods: {
    async logout() {

      console.log ("logout clicked!" );
      await this.$store.dispatch('logout');
    }
    
   }
};
</script>
