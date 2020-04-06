<template>
  <v-flex sm10 offset-sm1>
    <v-card align="center" justify="center">
      <v-container fluid>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Account {{this.$route.params.id}}</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-content>
        </v-content>
        <v-container >
          <v-list>
            <v-list-item>
              <v-row >
                <v-col cols="5"><strong>type</strong></v-col>
                <v-col><strong>Description</strong></v-col>
                <v-col><strong>Amount</strong></v-col>
                <v-col><strong>Balance</strong></v-col>
              </v-row>
            </v-list-item>
          </v-list>

          <v-list>
            <v-list-item
              v-for="transaction in this.$store.state.transactions"
              :key="transaction.id"
              :to="/Transaction/+transaction.id"
            >
              <v-row>
                <v-col v-text="transaction.type" @click="rowClick(transaction)" cols="5"></v-col>
                <v-col>{{transaction.description}}</v-col>
                <v-col>{{transaction.amount}}</v-col>
                <v-col>£{{transaction.balance}}</v-col>
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
  async created() {
    if(!this.$store.state.loggedIn){
      this.$router.push('/Login');
    }
    else{
    await this.$store.dispatch("getTransactions", this.$route.params.id );
    console.log("Get All Transaction for accout !" + this.$route.params.id);
  }
  },

  methods: {
    //async deleteAccount(quoteId) {
    //  await this.$store.dispatch("deleteAccount", accountId);
    //},
    async rowClick(transaction) {
      console.log("Clicked Account: " + transaction.id);
      this.$store.commit('selectTranaction', transaction);
      await this.$router.push("/Transaction/" + Transaction.id);
    }
  }
};
</script>