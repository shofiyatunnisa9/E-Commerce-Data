import { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Select,
  Input,
  message,
  DatePicker,
} from "antd";
import { api } from "../../service/api";
import {
  getTransactions,
  updateTransaction,
  createTransaction,
  deleteTransaction,
} from "../../service/transaction";

import type { TransactionData } from "../../types";

export default function TransactionList() {
  const [transactions, setTransactions] = useState<TransactionData[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [packages, setPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingData, setEditingData] = useState<TransactionData | null>(null);

  const [form] = Form.useForm();

  const fetchData = async () => {
    setLoading(true);

    const [trxRes, usersRes, pkgRes] = await Promise.all([
      getTransactions(),
      api.get("/users"),
      api.get("/packages"),
    ]);

    setTransactions(trxRes.data);
    setUsers(usersRes.data);
    setPackages(pkgRes.data);

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openModal = (record?: TransactionData) => {
    setEditingData(record || null);

    form.setFieldsValue(
      record || {
        id: "",
        userId: "",
        packageId: "",
        date: "",
        status: "",
      }
    );

    setIsModalOpen(true);
  };

  const handleSubmit = async () => {
    const values = await form.validateFields();

    const payload = {
      ...values,
      date: values.date.format("YYYY-MM-DD"),
    };

    if (editingData) {
      await updateTransaction(editingData.id, payload);
      message.success("Transaction updated");
    } else {
      await createTransaction(payload);
      message.success("Transaction created");
    }

    setIsModalOpen(false);
    fetchData();
  };

  const handleDelete = async (id: string) => {
    await deleteTransaction(id);
    message.success("Transaction deleted");
    fetchData();
  };

  const columns = [
    { title: "ID", dataIndex: "id" },
    {
      title: "User",
      dataIndex: "userId",
      render: (id: string) => users.find((u) => u.id === id)?.name,
    },
    {
      title: "Package",
      dataIndex: "packageId",
      render: (id: string) => packages.find((p) => p.id === id)?.name,
    },
    { title: "Date", dataIndex: "date" },
    { title: "Status", dataIndex: "status" },
    {
      title: "Action",
      render: (_: any, record: TransactionData) => (
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
      <h2>Transactions</h2>

      <Button
        type="primary"
        onClick={() => openModal()}
        style={{ marginBottom: 16 }}
      >
        + Create Transaction
      </Button>

      <Table
        rowKey="id"
        dataSource={transactions}
        columns={columns}
        loading={loading}
      />

      <Modal
        title={editingData ? "Edit Transaction" : "Add Transaction"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleSubmit}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="ID" name="id" rules={[{ required: true }]}>
            <Input placeholder="T002" />
          </Form.Item>

          <Form.Item label="User" name="userId" rules={[{ required: true }]}>
            <Select placeholder="Pilih User">
              {users.map((u) => (
                <Select.Option key={u.id} value={u.id}>
                  {u.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Package"
            name="packageId"
            rules={[{ required: true }]}
          >
            <Select placeholder="Pilih Paket">
              {packages.map((p) => (
                <Select.Option key={p.id} value={p.id}>
                  {p.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Date" name="date" rules={[{ required: true }]}>
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item label="Status" name="status" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="success">Success</Select.Option>
              <Select.Option value="pending">Pending</Select.Option>
              <Select.Option value="failed">Failed</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
