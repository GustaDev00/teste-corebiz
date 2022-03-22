import React, { useEffect, useState } from 'react'
import { useModalStatus } from '../../../../context/useModalStatus'
import axios from 'axios'
import styles from '../../styles.css'

const mensage = () => {
  const { cepSeleted, SetCepSeleted, modalOpen, changeStep, openModal, stepModal } = useModalStatus()
  const [clima, setClima] = useState()
  const [valueClima, setValueClima] = useState()
  const [prod, setProd] = useState('')

  const connProd = () => {
    if(!prod){
      const search = clima == "Quente" ? "Cropped Iara - Off White" : "T-Shirt Vic - Carbono"
      const options: any = {
        method: 'GET',
        url: `/api/catalog_system/pub/products/search/${search}`
      };

      axios.request(options).then((response) => {
        console.log(response.data[0])
        setProd(response.data[0])
      }).catch((error) => {
        console.error(error);
      });
    }
  }
  const resposta = () => {
    connProd()

    return prod && (
    <>
      <header>
        <h2>Está muito {clima} né? </h2>
        <span onClick={() => modalOpen()}>X</span>
      </header>
      <main>
        <p>Que tal um {prod?.productName}</p>
      </main>
      <footer>
        <a href="#"  onClick={() => modalOpen()}>Não, valeu</a>
        <a href={prod?.link}>Opa, eu quero!</a>
      </footer>
    </>
    )
  }
  const attClima = () => {
    axios.get(`/weather-forecast/${cepSeleted}`).then(resp => {

      //Validação que vai transformar em numero para saber se está quente
      const tempe = resp?.data?.temperature // resp: +20 ºC
      if (tempe) {
        let validateTemp = tempe

        //Validação que vai tratar a resposta
        if (validateTemp.includes("+")) {
          //Se for aumentando
          validateTemp = validateTemp.split(" ")[0] //Removendo o espaço
          validateTemp = Number(validateTemp.split("+")[1]) // Removendo o caracter de +
        } else {
          validateTemp = validateTemp.split(" ")[0]
          validateTemp = Number(validateTemp.split("-")[1])
        }

        //Setandos os valores
        setClima(validateTemp > 15 ? "Quente" : "Frio") //quente ou frio
        setValueClima(tempe)
      }
    }).catch(error => {
      SetCepSeleted('')
    })

    setTimeout(() => {
      if (cepSeleted) {
        setProd('')
        attClima()
      }
    }, 3600000)

  }

  useEffect(() => {

    attClima() //Conectando a API
    changeStep('mensage') //Trocando o modal que vai abrir, bloquendo o primeiro
    modalOpen() // Abrindo o novo modal

    //Timeout de uma hora para não atualizarem
    setTimeout(() => {

      changeStep('cep')
    }, 3600000)

  }, [])

  return valueClima && clima ? (
    <>
      <p className={ styles.climaT }>
        {valueClima}
        {clima == "Quente" ? (
          <span className={styles.Quente}></span>
        ) : (
          <span className={styles.Frio}></span>
        )}
      </p>
      {openModal && stepModal == 'mensage' ? (
        <>
          <div className={styles.modal}>
            {resposta()}
          </div>
          <div className={styles.blackout} onClick={() => modalOpen()}></div>
        </>
      ) : ('')}
    </>
  ) : ('')
}

export default mensage
