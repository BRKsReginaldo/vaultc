import styled from 'styled-components'

export const PasswordContainer = styled.form`
  display: block;
  text-align: center;
`

export const Container = styled.div`
  display: flex;
  justify-content: space-around;
`

export const FormField = styled.form`
  background: #cecece;
  width: 100%;
  max-width: 500px;
  margin-top: 20px;
  padding: 15px;
  border: 1px solid black
`

export const Label = styled.label`
  display: block;
  font-weight: bold;
  text-transform: capitalize;
`

export const Textarea = styled.textarea`
  width: 100%;
  min-height: 150px;
`

export const Button = styled.button`
  display: block;
  margin-left: auto;
  padding: 5px 10px;
  text-transform: uppercase;
`
