import { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, InputNumber, message } from "antd";
import {
  getPackages,
  createPackage,
  updatePackage,
  deletePackage,
} from "../../service/package";
import type { PackageData } from "../../types";

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
    form.setFieldsValue(record || { id: "", name: "", price: 0, quota: "" });
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

  const columns = [
    { title: "ID", dataIndex: "id" },
    { title: "Nama Paket", dataIndex: "name" },
    { title: "Harga", dataIndex: "price" },
    { title: "Kuota", dataIndex: "quota" },
    {
      title: "Action",
      render: (_: any, record: PackageData) => (
        <>
          <Button type="link" onClick={() => openModal(record)}>
            Edit
          </Button>
          <Button danger type="link" onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <h2>Daftar Packages</h2>

      <Button
        type="primary"
        style={{ marginBottom: 16 }}
        onClick={() => openModal()}
      >
        + Tambah Paket
      </Button>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={packages}
        loading={loading}
      />

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
        </Form>
      </Modal>
    </div>
  );
}
