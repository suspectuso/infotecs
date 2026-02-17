import React from 'react';
import { Modal, Form, Input } from 'antd';
import { useCreateUser } from '@features/users/model/useUserMutations';

interface CreateUserModalProps {
  open: boolean;
  onClose: () => void;
}

export const CreateUserModal: React.FC<CreateUserModalProps> = ({ open, onClose }) => {
  const [form] = Form.useForm();
  const createMutation = useCreateUser();
  const isLoading = createMutation.isLoading;

  const handleOk = () => {
    form.validateFields().then((values) => {
      createMutation.mutate(values, {
        onSuccess: () => {
          form.resetFields();
          onClose();
        },
      });
    });
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title={<b>Создание пользователя</b>}
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Создать"
      cancelText="Отмена"
      confirmLoading={isLoading}
      closable={!isLoading}
      maskClosable={!isLoading}
      cancelButtonProps={{ disabled: isLoading }}
      okButtonProps={{ style: { backgroundColor: '#1a3353', borderColor: '#1a3353' } }}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Имя"
          rules={[{ required: true, message: 'Введите имя' }]}
        >
          <Input disabled={isLoading} />
        </Form.Item>
        <Form.Item
          name="avatar"
          label="Ссылка на аватарку"
          rules={[
            { required: true, message: 'Введите ссылку' },
            { type: 'url', message: 'Введите корректную ссылку' },
          ]}
        >
          <Input disabled={isLoading} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
