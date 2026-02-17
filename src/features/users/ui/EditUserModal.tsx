import React, { useEffect } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import styled from 'styled-components';
import { useUpdateUser, useDeleteUser } from '@features/users/model/useUserMutations';
import { User } from '@features/users/api/usersApi';

const FooterWrapper = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-start;
`;

interface EditUserModalProps {
  open: boolean;
  user: User | null;
  onClose: () => void;
}

export const EditUserModal: React.FC<EditUserModalProps> = ({ open, user, onClose }) => {
  const [form] = Form.useForm();
  const updateMutation = useUpdateUser();
  const deleteMutation = useDeleteUser();
  const isLoading = updateMutation.isLoading || deleteMutation.isLoading;

  useEffect(() => {
    if (user && open) {
      form.setFieldsValue({
        id: user.id,
        name: user.name,
        avatar: user.avatar,
      });
    }
  }, [user, open, form]);

  const handleSave = () => {
    form.validateFields().then((values) => {
      if (!user) return;
      updateMutation.mutate(
        { id: user.id, data: { name: values.name, avatar: values.avatar } },
        {
          onSuccess: () => {
            onClose();
          },
        }
      );
    });
  };

  const handleDelete = () => {
    if (!user) return;
    deleteMutation.mutate(user.id, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title={<b>Редактирование пользователя</b>}
      open={open}
      closable={!isLoading}
      maskClosable={!isLoading}
      onCancel={handleCancel}
      footer={
        <FooterWrapper>
          <Button
            onClick={handleDelete}
            loading={deleteMutation.isLoading}
            disabled={updateMutation.isLoading}
            style={{ backgroundColor: '#1a3353', borderColor: '#1a3353', color: '#fff' }}
          >
            Удалить
          </Button>
          <Button
            onClick={handleSave}
            loading={updateMutation.isLoading}
            disabled={deleteMutation.isLoading}
            style={{ backgroundColor: '#1a3353', borderColor: '#1a3353', color: '#fff' }}
          >
            Сохранить
          </Button>
          <Button
            onClick={handleCancel}
            disabled={isLoading}
            style={{ backgroundColor: '#1a3353', borderColor: '#1a3353', color: '#fff' }}
          >
            Отмена
          </Button>
        </FooterWrapper>
      }
    >
      <Form form={form} layout="vertical">
        <Form.Item name="id" label="id">
          <Input disabled />
        </Form.Item>
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
