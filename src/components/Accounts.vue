<template>
  <v-flex sm10 offset-sm1>
    <v-card align="center" justify="center">
      <v-container fluid>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Accounts</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn to="/NewAccount/" class="ma-3">New Account</v-btn>
        </v-toolbar>
        <v-content></v-content>
        <v-container>
          <v-list>
            <v-list-item>
              <v-row>
                <v-col cols="5">
                  <strong>Account ID</strong>
                </v-col>
                <v-col>
                  <strong>Account #</strong>
                </v-col>
                <v-col>
                  <strong>Name</strong>
                </v-col>
                <v-col>
                  <strong>Balance</strong>
                </v-col>
              </v-row>
            </v-list-item>
          </v-list>

          <v-list>
            <v-list-item
              v-for="account in $store.state.accounts"
              :key="account.id"
              :to="/Account/+account.id"
            >
              <v-row>
                <v-col v-text="account.id" @click="rowClick(account)" cols="5"></v-col>
                <v-col>{{account.accountNumber}}</v-col>
                <v-col>{{account.friendlyName}}</v-col>
                <v-col>£{{account.balance}}</v-col>
              </v-row>
            </v-list-item>
          </v-list>
        </v-container>
      </v-container>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  async updated() {
    if (!this.$store.state.loggedIn) {
      this.$router.push("/Login");
    } else {
      this.$store.dispatch("getAccounts");
      console.log("Get All Accounts!");
    }
  },
  async created() {
    if (!this.$store.state.loggedIn) {
      this.$router.push("/Login");
    } else {
      this.$store.dispatch("getAccounts");
      console.log("Get All Accounts!");
    }
  },

  methods: {
    //async deleteAccount(quoteId) {
    //  await this.$store.dispatch("deleteAccount", accountId);
    //},
    async rowClick(account) {
      console.log("Clicked Account: " + account.id);
      this.$store.commit("selectAccount", account);
      await this.$router.push("/Account/" + account.id);
    }
  }
};
</script>