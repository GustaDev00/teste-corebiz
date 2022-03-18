import React, { useState, useEffect, useCallback } from 'react'
import { useModalStatus } from '../../context/useModalStatus'
import InsertCep from './components/insertCep'
import Mensage from './components/mensage'
import styles from "./styles.css";

const modalCep = () => {
  const { zipCode, cepSeleted, modalOpen, openModal, block, stepModal } = useModalStatus()
  const [stepHtml, setStepHTML] = useState()


  return (
    <>
      {!block && (
        <button onClick={() => modalOpen()}>Insira seu CEP</button>
      )}

      {openModal && stepModal == 'cep' ? (
        <>
          <div className={styles.modal}>
            <InsertCep />
          </div>
          <div className={styles.blackout} onClick={() => modalOpen()}></div>
        </>
      ): ('')}

      {cepSeleted && (
        <Mensage />
      )}

    </>
  )
}

export default modalCep
