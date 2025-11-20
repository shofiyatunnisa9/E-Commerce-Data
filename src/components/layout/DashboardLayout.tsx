import { Layout, Menu, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Authcontext";
import {
  AppstoreOutlined,
  HomeFilled,
  HomeOutlined,
  SwapOutlined,
  UserOutlined,
} from "@ant-design/icons";

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
      <Sider
        width={230}
        style={{
          minHeight: "100vh",
          background: "linear-gradient(180deg, #001529, #003b73)",
          paddingTop: 20,
        }}
      >
        <div
          style={{
            padding: "0 20px 20px",
            marginBottom: 30,
            borderBottom: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: "50%",
                background: "#1677ff",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#fff",
                fontWeight: 600,
                fontSize: "16px",
              }}
            >
              {user?.name?.charAt(0).toUpperCase()}
            </div>

            <div style={{ color: "white" }}>
              <div style={{ fontSize: 14, opacity: 0.8 }}>Welcome</div>
              <div style={{ fontSize: 16, fontWeight: "bold" }}>
                {user?.name}
              </div>
            </div>
          </div>
        </div>

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[window.location.pathname]}
          style={{
            background: "transparent",
            paddingLeft: 10,
            paddingRight: 10,
          }}
          items={[
            {
              key: "/",
              icon: <HomeOutlined />,
              label: <Link to="/">Dashboard</Link>,
            },
            {
              key: "/customers",
              icon: <UserOutlined />,
              label: <Link to="/customers">Customers</Link>,
            },
            {
              key: "/packages",
              icon: <AppstoreOutlined />,
              label: <Link to="/packages">Packages</Link>,
            },
            {
              key: "/transactions",
              icon: <SwapOutlined />,
              label: <Link to="/transactions">Transactions</Link>,
            },
          ]}
        />

        <div style={{ padding: 20, marginTop: "auto" }}>
          <Button
            danger
            type="primary"
            block
            style={{
              borderRadius: 6,
              fontWeight: 600,
            }}
            onClick={handleLogout}
          >
            Logout
          </Button>
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
