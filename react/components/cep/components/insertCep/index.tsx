import React, { useState } from 'react'

import style from './style.css'
import { useModalStatus } from '../../../../context/useModalStatus'

const insertCep = () => {
  const { modalOpen, zipCode, regionSelector } = useModalStatus()
  const [value, setValue] = useState('')
  const [invalid, setInvalid] = useState(false)

  const validateRegion = () => {
    const error = regionSelector(value)
    setInvalid(error)
  }

  return <>
    <header className={style.titleModal}>
      <h2>Qual a sua cidade?</h2>
      <span onClick={() => modalOpen()}>X</span>
    </header>
    <main>
      <label>
        <input type="text" value={value} onChange={(e) => setValue(e.target.value)} placeHolder="Insira sua cidade" />
        <button onClick={() => validateRegion()}>Enviar</button>
      </label>
      {invalid && (<p>CEP invalido!</p>)}
    </main>
  </>
}

export default insertCep
