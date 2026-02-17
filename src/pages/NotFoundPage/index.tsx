import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Result
        status="404"
        title="404"
        subTitle="Страница не найдена"
        extra={
          <Button
            type="primary"
            onClick={() => navigate('/users')}
            style={{ backgroundColor: '#1a3353', borderColor: '#1a3353' }}
          >
            На главную
          </Button>
        }
      />
    </Wrapper>
  );
};
