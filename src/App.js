import React, { useState, useRef } from 'react'
import * as CryptoJS from 'crypto-js'
import getCrypto from './crypto2'
import { Button, Container, FormField, Label, PasswordContainer, Textarea } from './style'

function App (props) {
  const [password, setPassword] = useState('')
  const [encryptableText, setEncryptableText] = useState('')
  const [decryptableText, setDecryptableText] = useState('')
  const cipher = useRef(null)

  function generateCipher (ev) {
    ev.preventDefault()

    if (!password) return false

    cipher.current = getCrypto(password)
    setPassword('')

    return false
  }

  async function encryptData (ev) {
    ev.preventDefault()

    if (!encryptableText) return false

    const encrypted = await cipher.current.encrypt(encryptableText)

    console.log(encrypted.toString())

    const decrypted = await cipher.current.decrypt(encrypted.toString())

    console.log(decrypted.toString(CryptoJS.enc.Utf8))

    return false
  }

  async function decryptData (ev) {
    ev.preventDefault()

    if (!decryptableText) return false

    const decrypted = await cipher.current.decrypt(decryptableText)

    console.log(decrypted.toString(CryptoJS.enc.Utf8))

    return false
  }

  return (
    <div>
      <PasswordContainer onSubmit={generateCipher}>
        <label htmlFor="password" className="d-block">Password</label>
        <input type="text" onChange={ev => setPassword(ev.target.value)} value={password}/>
        {password && (!cipher.current || cipher.current.password !== password) && (
          <button type="submit">Generate Cipher</button>
        )}
      </PasswordContainer>

      <Container>
        <FormField onSubmit={encryptData}>
          <Label>
            Encryptable text
          </Label>
          <Textarea value={encryptableText} onChange={ev => setEncryptableText(ev.target.value)}/>
          {cipher.current && (
            <Button type="submit">Encrypt</Button>
          )}
        </FormField>

        <FormField onSubmit={decryptData}>
          <Label>
            Decryptable text
          </Label>
          <Textarea value={decryptableText} onChange={ev => setDecryptableText(ev.target.value)}/>
          {cipher.current && (
            <Button type="submit">Decrypt</Button>
          )}
        </FormField>

      </Container>
    </div>
  )
}

export default App
