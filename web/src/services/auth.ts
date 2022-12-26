import { v4 as uuid } from 'uuid';

type SignInRequestDataType = {
  email: string,
  password: string,
}

export async function signInRequest(data: SignInRequestDataType) {
  return {
    token: uuid(),
    user: {
      name: 'Bernardo Dias',
      email: 'bernardo.araujo.gif@gmail.com',
      avatar_url: 'https://github.com/ber-lucas.png'
    }
  }
}