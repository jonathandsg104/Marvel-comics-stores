import md5 from "md5";

const publicKey = "7a411749eb8a6e96f0f4163153bcb81c";
const privateKey = "822b17375264e10e27041b4fb12fea971c8f3dc9";

/**
 * Gera os parâmetros de autenticação para a API da Marvel
 * @returns { ts, apikey, hash }
 */
export function getMarvelAuthParams() {
  const ts = Date.now().toString();
  const hash = md5(ts + privateKey + publicKey);
  return { ts, apikey: publicKey, hash };
}
