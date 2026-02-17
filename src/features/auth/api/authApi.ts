import axios from 'axios';

interface LoginParams {
  login: string;
  password: string;
}

const fakeLogin = (params: LoginParams): Promise<string> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (params.login === 'admin' && params.password === 'admin') {
        resolve('fake-jwt-token-abc123');
      } else {
        reject(new Error('Неверный логин или пароль'));
      }
    }, 2000);
  });
};

export const loginRequest = async (params: LoginParams): Promise<string> => {
  const token = await fakeLogin(params);
  return token;
};
