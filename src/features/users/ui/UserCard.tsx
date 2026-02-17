import React from 'react';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { User } from '@features/users/api/usersApi';

const CardWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 24px;
  border-bottom: 1px solid #f0f0f0;
  background: #fff;
`;

const ClickableArea = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 12px;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #000;
`;

const UserDate = styled.span`
  font-size: 12px;
  color: #999;
`;

interface UserCardProps {
  user: User;
  onClick: (user: User) => void;
}

export const UserCard: React.FC<UserCardProps> = ({ user, onClick }) => {
  return (
    <CardWrapper>
      <ClickableArea onClick={() => onClick(user)}>
        <Avatar size={40} src={user.avatar} icon={<UserOutlined />} />
        <UserInfo>
          <UserName>{user.name}</UserName>
          <UserDate>Зарегистрирован {dayjs(user.createdAt).format('DD.MM.YYYY')}</UserDate>
        </UserInfo>
      </ClickableArea>
    </CardWrapper>
  );
};
