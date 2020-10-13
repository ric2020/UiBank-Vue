<template>
  <v-flex sm6 offset-sm2>
    <v-card>
      <v-container fluid>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Register</v-toolbar-title>
        </v-toolbar>
        <v-form v-if="!showResponse">
          <v-layout>
            <v-flex sm8 offset-sm2>
              <v-select v-model="user.type" :items="type" label="Type" required></v-select>
              <v-text-field v-model="user.username" label="UserName" required></v-text-field>
              <v-text-field v-model="user.password" label="Password" required></v-text-field>
              <v-text-field v-model="user.firstName" label="First Name" required></v-text-field>
              <v-text-field v-model="user.lastName" label="Last Name" required></v-text-field>
              <v-text-field v-model="user.email" label="Email" required></v-text-field>
              <v-select v-model="user.title" :items="title" label="title" required></v-select>
              <v-select v-model="user.gender" :items="gender" label="Gender" required></v-select>
            </v-flex>
          </v-layout>

          <v-flex sm8 offset-sm2>
            <v-btn @click="register">Register</v-btn>
          </v-flex>

          <br />
        </v-form>

        <div v-if="showResponse"  align="center" justify="center">
          <v-card-title>Response</v-card-title>
          <br/>
          <v-label>{{JSON.stringify(this.response)}}</v-label>
          <br/>
          <v-spacer></v-spacer>
          <v-btn to="/" class="ma-3">OK</v-btn>
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
      gender: ["male", "female"],
      title: ["mr","mrs"],
      type: ["admin","customer"],
      user: {
        username: "",
        title: "",
        email: "",
        gender: "",
        age: "",
        title: "",
        password: ""
      },
      response: {}
    };
  },


  methods: {
    async register() {

      console.log ("register clicked!" );

      this.response = await this.$store.dispatch('register', this.user);
      console.log("hi" + JSON.stringify(this.response));

      this.showResponse = true;
    }
    
   }
};
</script>