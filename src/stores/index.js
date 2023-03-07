import { createApp } from "vue";
import { createStore } from "vuex";

const store = createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {},
});

const app = createApp({});
app.use(store);
export default app;