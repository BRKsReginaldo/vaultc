// we have to know all of these properties before calling the encryption method
const hash = 'SHA-256'
const salt = 'SALT'
// const password = 'PASSWORD'
const iteratrions = 1000
const keyLength = 48

export default function getCrypto (password) {
  async function getDerivation (hash, salt, password, iterations, keyLength) {
    const textEncoder = new TextEncoder('utf-8')
    const passwordBuffer = textEncoder.encode(password)
    const importedKey = await crypto.subtle.importKey('raw', passwordBuffer, 'PBKDF2', false, ['deriveBits'])

    const saltBuffer = textEncoder.encode(salt)
    const params = { name: 'PBKDF2', hash: hash, salt: saltBuffer, iterations: iterations }
    return await crypto.subtle.deriveBits(params, importedKey, keyLength * 8)
  }

  async function getKey (derivation) {
    const ivlen = 16
    const keylen = 32
    const derivedKey = derivation.slice(0, keylen)
    const iv = derivation.slice(keylen, keylen + ivlen)
    const importedEncryptionKey = await crypto.subtle.importKey(
      'raw',
      derivedKey,
      { name: 'AES-CBC' },
      false,
      ['encrypt', 'decrypt']
    )

    return {
      key: importedEncryptionKey,
      iv: iv
    }
  }

  async function encrypt (text, keyObject) {
    const textEncoder = new TextEncoder('utf-8')
    const textBuffer = textEncoder.encode(text)
    return await crypto.subtle.encrypt({
      name: 'AES-CBC',
      iv: keyObject.iv
    }, keyObject.key, textBuffer)
  }

  async function decrypt (encryptedText, keyObject) {
    const textDecoder = new TextDecoder('utf-8')
    const decryptedText = await crypto.subtle.decrypt(
      { name: 'AES-CBC', iv: keyObject.iv },
      keyObject.key,
      encryptedText
    )

    return textDecoder.decode(decryptedText)
  }

  async function encryptData (text) {
    const derivation = await getDerivation(hash, salt, password, iteratrions, keyLength)
    const keyObject = await getKey(derivation)
    return await encrypt(JSON.stringify(text), keyObject)
  }

  async function decryptData (encryptedObject) {
    const derivation = await getDerivation(hash, salt, password, iteratrions, keyLength)
    const keyObject = await getKey(derivation)
    return await decrypt(encryptedObject, keyObject)
  }

  return {
    encryptData,
    decryptData,
    password
  }
}
