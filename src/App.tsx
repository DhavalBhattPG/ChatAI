import { Layout, Typography, theme } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Home from "./components/Home";
const { Text } = Typography;

function App() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#bed5ea",
        }}
      >
        <Text type="secondary">Ant Design (secondary)</Text>
      </Header>
      <Content style={{ padding: "0 48px", margin: "16px 0" }}>
        <Layout
          style={{
            padding: "24px 0",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            <Home />
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Created By Content Matters
      </Footer>
    </Layout>
  );
}

export default App;
