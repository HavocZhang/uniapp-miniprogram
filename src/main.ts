import { createSSRApp } from "vue";
import "uno.css";
import pinia from "./store";
import App from "./App.vue";
export function createApp() {
  const app = createSSRApp(App);
  app.use(pinia);
  return {
    app,
  };
}
