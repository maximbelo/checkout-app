import { createApp } from "vue";

import App from "./App.vue";

// Base Components
import BaseButton from "./components/ui/BaseButton.vue";
import BaseCard from "./components/ui/BaseCard.vue";

const app = createApp(App);

app.component("base-button", BaseButton);
app.component("base-card", BaseCard);

app.mount("#app");
