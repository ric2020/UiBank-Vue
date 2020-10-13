import Vue from 'vue';
import Vuex from "vuex";
import axios from "axios";
import { ServerResponse } from 'http';
const querystring = require("querystring");

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        quotes: [],
        accounts: [],
        transactions: [],
        accessToken: "",
        user: {},
        account: {},
        loggedIn: false
    },
    mutations: {
        //Accounts
        updateAccounts(state, accounts) {
            state.accounts = accounts;
        },
        selectAccount(state, account){
            state.account = account;
        },
        updateTransactions(state, transactions){
            state.transactions = transactions;
        },

        //Quotes
        updateQuotes(state, quotes) {
            state.quotes = quotes;
        },

        //Auth Stuff
        updateAccessToken(state, accessToken) {
            state.accessToken = accessToken;
        },
        updateUser(state, user) {
            state.user = user;
        },
        loggedIn(state, YesNO) {
            state.loggedIn = YesNO;
        },
    },
    actions: {
        //Accounts
        async getAccounts({ commit }) {
            var filter = '{"where":{"userId": "' + this.state.user.id +'"}}';
            commit('updateAccounts', (await axios.get("https://uibank-api.azurewebsites.net/api/accounts" + 
            "?filter=" + filter +
            "&access_token=" + 
            this.state.accessToken)).data);
        },

        //Trnasactions
        async getTransactions({ commit } ,accountId) {
            commit('updateTransactions', (await axios.get("https://uibank-api.azurewebsites.net/api/accounts/" + accountId +
            "/transactions?access_token=" + 
            this.state.accessToken)).data);
        },

        //Quotes
        async getQuotes({ commit }) {
            commit('updateQuotes', (await axios.get("https://uibank-api.azurewebsites.net/api/quotes?filter[order]=date%20DESC&filter[limit]=20")).data);
        },
        async newQuote({ commmit }, quote) {
            //post new quote
            let res = (await axios.post("https://uibank-api.azurewebsites.net/api/quotes/newquote/", querystring.stringify(quote)));

            this.commit('updateQuotes', (await axios.get("https://uibank-api.azurewebsites.net/api/quotes?filter[order]=date%20DESC&filter[limit]=20")).data);

            return res.data;
        },
        async getQuote({ commit }, id) {
            commit('updateQuotes', [(await axios.get('https://uibank-api.azurewebsites.net/api/quotes/' + id)).data]);
        },
        async deleteQuote({ commit }, id) {
            let res = (await axios.delete('https://uibank-api.azurewebsites.net/api/quotes/' + id)).data
            commit('updateQuotes', (await axios.get("https://uibank-api.azurewebsites.net/api/quotes?filter[order]=date%20DESC&filter[limit]=20")).data);
        },
        async updateQuote({ commit }, quote) {
            let res = (await axios.post("https://uibank-api.azurewebsites.net/api/quotes/" + quote.id + "/replace", querystring.stringify(quote)));
        },

        async register({ commmit }, user) {
            return (await axios.post("https://uibank-api.azurewebsites.net/api/users/", user).catch(function (error) {
                if (error.response) {
                    // Request made and server responded
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                    return (error.response);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.log(error.request);
                    return (error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                    return error.message
                }
            }
            )
            )
        },
        async login({ commmit }, user) {
            let response = (await axios.post("https://uibank-api.azurewebsites.net/api/users/login", user).catch(function (error) {
                if (error.response) {
                    // Request made and server responded
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                    return (error.response);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.log(error.request);
                    return (error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                    return error.message
                }
            }
            )
            )

            //login?
            if (response.data.id) {
                console.log("logged in OK");
                this.commit('updateAccessToken', response.data.id);
                this.commit('loggedIn', true);
                //get userdetails
                this.commit('updateUser', (await axios.get('https://uibank-api.azurewebsites.net/api/users/' + response.data.userId + "?access_token=" + 
                response.data.id)).data);
                //this.commit('updateUserName', "rick");
                
            }
            else {
                console.log("failed login");
                this.commit('loggedIn', false);
            }

            return response;
        },
        async logout({ commmit }) {
            let response = (await axios.post("https://uibank-api.azurewebsites.net/api/users/logout" + "?access_token=" + this.state.accessToken).catch(function (error) {
                if (error.response) {
                    // Request made and server responded
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                    return (error.response);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.log(error.request);
                    return (error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                    return error.message
                }
            }
            )
            )

            //logout ok
            if (response.status == 204) {
                console.log("logout  OK");
                this.commit('updateAccessToken', "");
                this.commit('updateUser', "");
                this.commit('loggedIn', false);
                this.commit('updateAccounts',[]);
                this.commit('updateTransactions',[]);
            }
            else{
                console.log("logout  error");
            }
        }
    }
})