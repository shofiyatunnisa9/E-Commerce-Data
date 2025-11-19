import { Layout, Menu, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Authcontext";
import { HomeFilled, HomeOutlined, TeamOutlined } from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider breakpoint="lg" collapsedWidth="0">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TeamOutlined color="white" />
          <div
            style={{
              height: 35,
              margin: 16,
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: "bold",
            }}
          >
            Welcome {user?.name}
          </div>
        </div>
        <div style={{ justifyContent: "flex-start", alignItems: "flex-start" }}>
          <Menu theme="dark" mode="inline">
            <Menu.Item key="1">
              <Link to="/customers">Customers</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/packages">Packages</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/transactions">Transactions</Link>
            </Menu.Item>
          </Menu>
        </div>
      </Sider>

      <Layout>
        <Header
          style={{
            background: "#fff",
            padding: "0 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ gap: 10, display: "flex" }}>
            <HomeFilled />
            <h3 style={{ margin: 0 }}>Dashboard</h3>
          </div>

          <Button type="primary" danger onClick={handleLogout}>
            Logout
          </Button>
        </Header>

        <Content
          style={{ margin: "24px 16px", padding: 24, background: "#fff" }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
