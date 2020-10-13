<template>
  <v-flex sm6 offset-sm3>
    <v-card>
      <v-container fluid>
        <v-toolbar dark color="primary">
          <v-toolbar-title v-if="!showResponse">Get Quote</v-toolbar-title>
          <v-toolbar-title v-else-if="response.accepted">You are accepted!</v-toolbar-title>
          <v-toolbar-title v-else>Unlucky MF</v-toolbar-title>
        </v-toolbar>
        <v-form v-if="!showResponse">
          <v-layout>
            <v-flex sm8 offset-sm2>
              <v-text-field v-model="quote.amount" label="Amount" required></v-text-field>

              <v-select v-model="quote.term" :items="terms" label="Term" required></v-select>

              <v-text-field v-model="quote.income" label="Income" required></v-text-field>

              <v-text-field v-model="quote.age" label="Age" required></v-text-field>
            </v-flex>
          </v-layout>

          <v-flex sm8 offset-sm2>
            <v-btn @click="submit">Submit</v-btn>
          </v-flex>

          <br />
        </v-form>
        <div v-if="showResponse & response.accepted"  align="center" justify="center">
          <v-card-title>Congratulations you have been acepted!</v-card-title>
          <br/>
          <v-label>The Rate is : {{response.rate}} % APR</v-label>
          <br/>
          <v-label>Please quote the following ref:</v-label>
          <v-label>{{response.quoteid}}</v-label>
          <v-spacer></v-spacer>
          <v-btn to="/" class="ma-3">OK</v-btn>
        </div>
        <div v-if="showResponse & !response.accepted"  align="center" justify="center">
          <v-card-title>Unlucky Mate</v-card-title>
          <br/>
          <v-label>We dont want your custom!</v-label>
          <br/>
          <v-label>Please quote the following ref:</v-label>
          <v-label>{{response.quoteid}}</v-label>
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
      response: {
        accepted: true,
        rate: 0,
        quoteid: ""
      },
      terms: ["1", "3", "5", "10"],
      quote: {
        amount: "",
        term: "",
        income: "",
        age: ""
      }
    };
  },

  methods: {
    async submit() {
      this.response = await this.$store.dispatch("newQuote", this.quote);
      console.log("hi quote is :" + JSON.stringify(this.response));
      this.showResponse = true;
    }
  }
};
</script>