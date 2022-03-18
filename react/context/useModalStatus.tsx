import React, {createContext, useContext, useState} from 'react'
import axios from 'axios'

export const CepContext = createContext();

export const CepProvider = ({ children }: any) => {
  const [cepSeleted, SetCepSeleted] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const [stepModal, setStepModal] = useState('cep')

  const zipCode = receiveCep => {
    SetCepSeleted(receiveCep)
  }

  const changeStep = (value) => {
    setStepModal(value)
  }

  const regionSelector = (value) => {
    const cep = value.replace('-', '')
    let url = `https://viacep.com.br/ws/${cep}/json/`
    axios.get(url).then((resp) => {
      modalOpen()
      zipCode(resp.data.localidade)
      return false

    }).catch(error => {
      return true
    })

  }

  const modalOpen = () => {
    if(openModal == false){
      setOpenModal(true)
    }else{
      setOpenModal(false)
    }
  }

  return (
    <CepContext.Provider
      value={
        {
          cepSeleted,
          zipCode,
          modalOpen,
          openModal,
          changeStep,
          stepModal,
          SetCepSeleted,
          regionSelector
        }
      }
    >
      { children }
    </CepContext.Provider>
  )
}

export function useModalStatus() {
  const context = useContext(CepContext);

  if (!context) {
    throw new Error('useModalStatus must be used within an CepContext');
  }

  return context;
}
