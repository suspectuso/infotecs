import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from '@features/users/api/usersApi';

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });
};
