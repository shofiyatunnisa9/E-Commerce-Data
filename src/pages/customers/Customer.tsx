import { useEffect, useState } from "react";
import { Card, Avatar } from "antd";
import { api } from "../../service/api";
import { UserOutlined, MailOutlined } from "@ant-design/icons";
import type { UserData } from "../../types";

export default function CustomerList() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    const res = await api.get("/users");
    setUsers(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h2 style={{ marginBottom: 20 }}>
        {" "}
        <UserOutlined /> Customers
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 20,
        }}
      >
        {users.map((u) => (
          <Card
            key={u.id}
            loading={loading}
            hoverable
            style={{
              borderRadius: 12,
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <Avatar
                size={64}
                style={{
                  backgroundColor: "#1677ff",
                  fontSize: 24,
                }}
              >
                {u.name.charAt(0).toUpperCase()}
              </Avatar>

              <h3 style={{ marginTop: 12 }}>{u.name}</h3>
              <p
                style={{
                  color: "gray",
                  marginBottom: 0,
                  display: "flex",
                  gap: 3,
                }}
              >
                <MailOutlined /> {u.email}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
