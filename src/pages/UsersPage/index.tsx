import React, { useState } from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { removeToken } from '@shared/lib/auth';
import { UserList } from '@features/users/ui/UserList';
import { CreateUserModal } from '@features/users/ui/CreateUserModal';
import { EditUserModal } from '@features/users/ui/EditUserModal';
import { User } from '@features/users/api/usersApi';

const PageWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
`;

const Footer = styled.div`
  margin-top: 16px;
`;

export const UsersPage: React.FC = () => {
  const navigate = useNavigate();
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleLogout = () => {
    removeToken();
    navigate('/login', { replace: true });
  };

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    setEditModalOpen(true);
  };

  const handleEditClose = () => {
    setEditModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <PageWrapper>
      <Header>
        <Button
          onClick={handleLogout}
          style={{ backgroundColor: '#1a3353', borderColor: '#1a3353', color: '#fff' }}
        >
          Выход
        </Button>
      </Header>

      <UserList onUserClick={handleUserClick} />

      <Footer>
        <Button
          type="primary"
          onClick={() => setCreateModalOpen(true)}
          style={{ backgroundColor: '#1a3353', borderColor: '#1a3353' }}
        >
          Создать пользователя
        </Button>
      </Footer>

      <CreateUserModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
      />

      <EditUserModal
        open={editModalOpen}
        user={selectedUser}
        onClose={handleEditClose}
      />
    </PageWrapper>
  );
};
