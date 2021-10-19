import { createApp } from 'vue';
import App from '@layouts/App.vue';
import initAntd from '@/plugins/antd';
import initRouter from '@/plugins/router';

const app = createApp(App);

// 注册插件
initAntd(app);
initRouter(app);

app.mount('#app');
