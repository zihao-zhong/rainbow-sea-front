import { createApp } from 'vue';
import App from '@layouts/App.vue';
import initElement from '@/plugins/element';
import initRouter from '@/plugins/router';

import 'element-plus/dist/index.css';

const app = createApp(App);

// 注册插件
initElement(app);
initRouter(app);

app.mount('#app');
