import CryptoJS from 'crypto-js'
import { encode } from 'url-safe-base64'

export default class EncryptionService {
  encryptWaitingId = (encryptClientKey, waitingId) => {
    const key = CryptoJS.enc.Base64.parse(encryptClientKey)
    const iv = CryptoJS.lib.WordArray.random(key.sigBytes)
    const mode = CryptoJS.mode.CTR
    const encrypted = CryptoJS.AES.encrypt(waitingId.toString(), key, {
      iv,
      mode,
    })
    const ab = encode(iv.toString(CryptoJS.enc.Base64)).replace(/\./g, '=')
    const encryptedWaitingId = encode(
      encrypted.ciphertext.toString(CryptoJS.enc.Base64),
    ).replace(/\./g, '=')
    return { encryptedWaitingId, ab }
  }
}
