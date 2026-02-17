import React from 'react';
import { Form, Input, Button, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLogin } from '@features/auth/model/useAuth';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f5f5f5;
`;

const FormCard = styled.div`
  width: 400px;
  padding: 32px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  margin-bottom: 24px;
  font-size: 20px;
  font-weight: 500;
`;

interface LoginFormValues {
  login: string;
  password: string;
}

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const loginMutation = useLogin();

  const onFinish = (values: LoginFormValues) => {
    loginMutation.mutate(values, {
      onSuccess: () => {
        navigate('/users', { replace: true });
      },
      onError: (error: unknown) => {
        const msg = error instanceof Error ? error.message : 'Произошла ошибка';
        notification.error({
          message: 'Ошибка авторизации',
          description: msg,
        });
      },
    });
  };

  return (
    <Wrapper>
      <FormCard>
        <Title>Авторизация</Title>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="login"
            rules={[{ required: true, message: 'Введите логин' }]}
          >
            <Input placeholder="Логин" size="large" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Введите пароль' }]}
          >
            <Input.Password placeholder="Пароль" size="large" />
          </Form.Item>
          <Form.Item style={{ textAlign: 'right', marginBottom: 0 }}>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={loginMutation.isLoading}
              style={{ backgroundColor: '#1a3353', borderColor: '#1a3353' }}
            >
              Войти
            </Button>
          </Form.Item>
        </Form>
      </FormCard>
    </Wrapper>
  );
};
