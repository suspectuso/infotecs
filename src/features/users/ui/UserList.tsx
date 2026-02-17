import React from 'react';
import { Spin } from 'antd';
import styled from 'styled-components';
import { useUsers } from '@features/users/model/useUsers';
import { UserCard } from '@features/users/ui/UserCard';
import { User } from '@features/users/api/usersApi';

const ListWrapper = styled.div`
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
`;

const SpinWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 48px;
`;

interface UserListProps {
  onUserClick: (user: User) => void;
}

export const UserList: React.FC<UserListProps> = ({ onUserClick }) => {
  const { data: users, isLoading } = useUsers();

  if (isLoading) {
    return (
      <SpinWrapper>
        <Spin size="large" />
      </SpinWrapper>
    );
  }

  return (
    <ListWrapper>
      {users?.map((user) => (
        <UserCard key={user.id} user={user} onClick={onUserClick} />
      ))}
    </ListWrapper>
  );
};
