import { createApp } from 'vue';
import App from './App.vue';
import RegisterComponents from './helpers/RegisterComponents';
import router from './router';
import store from './store';

const app = createApp(App).use(store).use(router);
// Register logic components
const register = new RegisterComponents(app);
register.setComponents();
register.setLayouts();

// Mount App
app.mount('#app');
