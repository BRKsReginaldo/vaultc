import * as CryptoJS from 'crypto-js'

export default function crypto2 (password) {
  function encrypt (message) {
    return CryptoJS.AES.encrypt(message, password)
  }

  function decrypt (message) {
    return CryptoJS.AES.decrypt(message, password)
  }

  return {
    encrypt,
    decrypt,
    password
  }
}
