<template>
  <v-flex sm4 offset-sm4>
    <v-card>
      <v-container fluid>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Login</v-toolbar-title>
        </v-toolbar>
        <v-form v-if="!showResponse" @submit.prevent="login">
          <v-layout>
            <v-flex sm8 offset-sm2>
              <v-text-field v-model="user.username" label="UserName" type="text" required></v-text-field>
              <v-text-field v-model="user.password" label="Password" type="password" required></v-text-field>
            </v-flex>
          </v-layout>

          <v-flex sm8 offset-sm2>
            <v-btn type="submit" @click="login">Login</v-btn>
          </v-flex>

          <br />
        </v-form>

        <div v-if="showResponse"  align="center" justify="center">
          <v-card-title>Response</v-card-title>
          <br/>
          <v-label v-if="!this.response.data.id">{{JSON.stringify(this.response)}}</v-label>
          <v-label v-else>Login In Successfull</v-label>
          <br/>
          <v-spacer></v-spacer>
          <v-btn @click="OK" type="submit" class="ma-3">OK</v-btn>
        </div>

      </v-container>
    </v-card>
  </v-flex>
</template>

<script>

export default {
  data() {
    return {
      showResponse: false,
      user: {
        username: "",
        password: ""
      },
      response: {}
    };
  },


  methods: {
    async login() {

      console.log ("login clicked!" );

      this.response = await this.$store.dispatch('login', this.user);
      console.log("hi" + JSON.stringify(this.response));
      this.showResponse = true;
      ;
    },
    OK(){
        this.showResponse = false;
        this.$router.push('/Accounts');
    }
    
   }
};
</script>