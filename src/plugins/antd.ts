import { App } from 'vue';
import { message, Button, Layout, Table, Form, Tabs, Input, Menu, Row, Col } from 'ant-design-vue';

const components = [Button, Layout, Table, Form, Tabs, Input, Menu, Row, Col];

export default function initAntd(app: App): void {
  // 按需注册 antd 的组件
  components.forEach((component) => {
    app.use(component);
  });

  // app.component(TabPane.name, TabPane);

  // 注册 messgae 消息提示
  app.config.globalProperties.$message = message;
}
