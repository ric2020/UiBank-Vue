<template>
  <v-flex sm10 offset-sm1>
    <v-card align="center" justify="center">
      <v-container fluid>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Quotes</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn to="/NewQuote/" class="ma-3">New Quote</v-btn>
        </v-toolbar>

        <v-container >
          <v-list>
            <v-list-item>
              <v-row >
                <v-col cols="4"><strong>Reference #</strong></v-col>
                <v-col><strong>Amount</strong></v-col>
                <v-col><strong>APR</strong></v-col>
                <v-col><strong>Term</strong></v-col>
              </v-row>
            </v-list-item>
          </v-list>

          <v-list>
            <v-list-item
              v-for="quote in $store.state.quotes"
              :key="quote.id"
              :to="/Quote/+quote.id"
            >
              <v-row>
                <v-col v-text="quote.id" @click="rowClick(quote.id)" cols="4"></v-col>
                <v-col>£ {{quote.amount}}</v-col>
                <v-col>{{quote.rate}} %</v-col>
                <v-col>{{quote.term}} yrs</v-col>
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
    this.$store.dispatch("getQuotes");
    console.log("Get All Quotes!");
  },

  methods: {
    async deleteQuote(quoteId) {
      await this.$store.dispatch("deleteQuote", quoteId);
    },
    async rowClick(id) {
      console.log("hi" + id);
      await this.$router.push("/Quote/" + id);
    }
  }
};
</script>