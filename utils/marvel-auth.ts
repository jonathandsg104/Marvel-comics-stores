import md5 from "md5";

const publicKey = process.env.MARVEL_PUBLIC_KEY!;
const privateKey = process.env.MARVEL_PRIVATE_KEY!;

/**
 * Gera os parâmetros de autenticação para a API da Marvel
 * @returns { ts, apikey, hash }
 */
export function getMarvelAuthParams() {
  const ts = Date.now().toString();
  const hash = md5(ts + privateKey + publicKey);
  return { ts, apikey: publicKey, hash };
}
