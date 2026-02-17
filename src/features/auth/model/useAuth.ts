import { useMutation } from '@tanstack/react-query';
import { loginRequest } from '@features/auth/api/authApi';
import { setToken } from '@shared/lib/auth';

export const useLogin = () => {
  return useMutation({
    mutationFn: loginRequest,
    onSuccess: (token: string) => {
      setToken(token);
    },
  });
};
