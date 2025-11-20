import { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, InputNumber, message } from "antd";
import {
  getPackages,
  createPackage,
  updatePackage,
  deletePackage,
} from "../../service/package";
import type { PackageData } from "../../types";
import { Card, Tag } from "antd";
import {
  GiftOutlined,
  EditOutlined,
  DeleteOutlined,
  DatabaseOutlined,
  DollarOutlined,
} from "@ant-design/icons";

export default function PackageList() {
  const [packages, setPackages] = useState<PackageData[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingData, setEditingData] = useState<PackageData | null>(null);

  const [form] = Form.useForm();

  const fetchData = async () => {
    setLoading(true);
    const res = await getPackages();
    setPackages(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openModal = (record?: PackageData) => {
    setEditingData(record || null);
    form.setFieldsValue(
      record || { id: "", name: "", price: 0, quota: "", active: "" }
    );
    setIsModalOpen(true);
  };

  const handleSubmit = async () => {
    const values = await form.validateFields();

    if (editingData) {
      await updatePackage(editingData.id, values);
      message.success("Package updated");
    } else {
      await createPackage(values);
      message.success("Package added");
    }

    setIsModalOpen(false);
    fetchData();
  };

  const handleDelete = async (id: string) => {
    await deletePackage(id);
    message.success("Package deleted");
    fetchData();
  };

  return (
    <div>
      <Button
        type="primary"
        style={{ marginBottom: 16 }}
        onClick={() => openModal()}
      >
        + Tambah Paket
      </Button>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "20px",
        }}
      >
        {packages.map((pkg) => (
          <Card
            key={pkg.id}
            hoverable
            style={{
              borderRadius: 12,
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
            cover={
              <div
                style={{
                  background: "#1677ff",
                  padding: "20px",
                  color: "white",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  borderTopLeftRadius: 12,
                  borderTopRightRadius: 12,
                }}
              >
                <GiftOutlined style={{ fontSize: 40, marginBottom: 8 }} />
                <h3 style={{ margin: 0, fontSize: 18 }}>{pkg.name}</h3>
              </div>
            }
            actions={[
              <EditOutlined onClick={() => openModal(pkg)} />,
              <DeleteOutlined
                style={{ color: "red" }}
                onClick={() => handleDelete(pkg.id)}
              />,
            ]}
          >
            <p style={{ marginBottom: 6 }}>
              <DatabaseOutlined /> <b>Quota:</b> {pkg.quota}
            </p>

            <p style={{ marginBottom: 10 }}>
              <DollarOutlined /> <b>Price:</b>{" "}
              <span style={{ color: "#1677ff", fontWeight: 600 }}>
                Rp {pkg.price.toLocaleString()}
              </span>
            </p>

            <Tag color="blue" style={{ borderRadius: 6 }}>
              Active: {pkg.active}
            </Tag>
          </Card>
        ))}
      </div>

      {/* Modal Create/Edit Package */}
      <Modal
        title={editingData ? "Edit Paket" : "Tambah Paket"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleSubmit}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="ID" name="id" rules={[{ required: true }]}>
            <Input placeholder="P005" />
          </Form.Item>

          <Form.Item
            label="Nama Paket"
            name="name"
            rules={[{ required: true }]}
          >
            <Input placeholder="Paket Harian 5GB" />
          </Form.Item>

          <Form.Item label="Harga" name="price" rules={[{ required: true }]}>
            <InputNumber
              min={0}
              style={{ width: "100%" }}
              placeholder="15000"
            />
          </Form.Item>

          <Form.Item label="Kuota" name="quota" rules={[{ required: true }]}>
            <Input placeholder="5GB" />
          </Form.Item>
          <Form.Item
            label="Masa Aktif"
            name="active"
            rules={[{ required: true }]}
          >
            <Input placeholder="7 Hari" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
