import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select } from 'antd'; // Assuming Ant Design is used
import { getMachinerySales, addMachinerySale, updateMachinerySale, deleteMachinerySale } from '../../../services/machinerySalesService'; // Adjust path as needed

const MachinerySalesPage = () => {
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingSale, setEditingSale] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchSales();
    }, []);

    const fetchSales = async () => {
        setLoading(true);
        try {
            const data = await getMachinerySales();
            setSales(data);
        } catch (error) {
            console.error('Error fetching sales:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = () => {
        setEditingSale(null);
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleEdit = (sale) => {
        setEditingSale(sale);
        form.setFieldsValue(sale);
        setIsModalVisible(true);
    };

    const handleDelete = async (id) => {
        try {
            await deleteMachinerySale(id);
            fetchSales();
        } catch (error) {
            console.error('Error deleting sale:', error);
        }
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            if (editingSale) {
                await updateMachinerySale(editingSale.id, values);
            } else {
                await addMachinerySale(values);
            }
            setIsModalVisible(false);
            fetchSales();
        } catch (error) {
            console.error('Error saving sale:', error);
        }
    };

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Machinery', dataIndex: 'machinery', key: 'machinery' },
        { title: 'Buyer', dataIndex: 'buyer', key: 'buyer' },
        { title: 'Sale Date', dataIndex: 'saleDate', key: 'saleDate' },
        { title: 'Amount', dataIndex: 'amount', key: 'amount' },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <>
                    <Button onClick={() => handleEdit(record)}>Edit</Button>
                    <Button danger onClick={() => handleDelete(record.id)}>Delete</Button>
                </>
            ),
        },
    ];

    return (
        <div>
            <h1>Machinery Sales</h1>
            <Button type="primary" onClick={handleAdd}>Add Sale</Button>
            <Table
                columns={columns}
                dataSource={sales}
                loading={loading}
                rowKey="id"
            />
            <Modal
                title={editingSale ? 'Edit Sale' : 'Add Sale'}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={() => setIsModalVisible(false)}
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="machinery" label="Machinery" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="buyer" label="Buyer" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="saleDate" label="Sale Date" rules={[{ required: true }]}>
                        <Input type="date" />
                    </Form.Item>
                    <Form.Item name="amount" label="Amount" rules={[{ required: true }]}>
                        <Input type="number" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default MachinerySalesPage;