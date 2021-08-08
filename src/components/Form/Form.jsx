import React, { useState } from 'react'
import { Button, Wrapper, Label, Input } from './Form.style'

export default function Form({ onSubmit }) {
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.currentTarget

    switch (name) {
      case 'name':
        setName(value)
        break

      case 'number':
        setNumber(value)
        break
      default:
        console.log(`Такой тип поля не обрабатывается`)
        break
    }
  }

  const resetState = () => {
    setName('')
    setNumber('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    onSubmit({ name, number })

    resetState()
  }

  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <Label>
          Name
          <Input
            type="text"
            name="name"
            value={name}
            onChange={handleInputChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            required
          />
        </Label>
        <Label>
          Phone
          <Input
            type="tel"
            name="number"
            value={number}
            onChange={handleInputChange}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
            required
          />
        </Label>
        <Button type="submit">Add contact</Button>
      </form>
    </Wrapper>
  )
}
