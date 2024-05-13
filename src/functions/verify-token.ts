import { jwtVerify } from 'jose';

export default async function verifyToken(token: string): Promise<boolean> {
  if (!token) return false;
  // Exemplo de como utilizar:
  try {
    // await jwtVerify(
    //   token,
    //   new TextEncoder().encode(
    //     'Aqui eu colocaria a string de segurança do meu plugin.',
    //   ),
    //   {
    //     algorithms: ['HS256'],
    //   },
    // );
    return true;
  } catch (error) {
    return false;
  }
}
