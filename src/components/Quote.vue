<template>
  <v-flex sm6 offset-sm2>
    <v-card>
      <v-container fluid>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Quote - {{$store.state.quotes[0].id}}</v-toolbar-title>
        </v-toolbar>
        <v-form >
          <v-layout>
            <v-flex sm8 offset-sm2>
              <v-checkbox v-model="$store.state.quotes[0].accepted" label="Accepted" required></v-checkbox>
              <v-text-field v-model="$store.state.quotes[0].amount" label="Amount" required></v-text-field>
              <v-select v-model="$store.state.quotes[0].term" :items="terms" label="Term" required></v-select>
              <v-text-field v-model="$store.state.quotes[0].income" label="Income" required></v-text-field>
              <v-text-field v-model="$store.state.quotes[0].age" label="Age" required></v-text-field>
            </v-flex>
          </v-layout>

          <v-flex sm8 offset-sm2>
            <v-btn class="ma-3" @click="updateQuote($store.state.quotes[0])">Update</v-btn>
            
            <v-btn class="ma-3" @click="deleteQuote($store.state.quotes[0].id)">Delete</v-btn>
          </v-flex>

          <br />
        </v-form>
      </v-container>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  data() {
    return {
      showResponse: false,
      terms: [1,3,5,10],
      response: {
        accepted: true,
        rate: 0,
        quoteid: ""
      },
      quote: {
        amount: "",
        term: "",
        income: "",
        age: ""
      }
    };
  },

  created(){
    this.$store.dispatch("getQuote", this.$route.params.id);
    this.quote = this.$store.state.quotes[0];
    console.log("Get Quote!");
  },
  methods: {
    async deleteQuote(quoteId) {
      await this.$store.dispatch("deleteQuote", quoteId);
      this.$router.push("/");
    },
    async updateQuote(quote) {
      await this.$store.dispatch("updateQuote", this.$store.state.quotes[0]);
      this.$router.push("/");
    }
  },
  };
</script>