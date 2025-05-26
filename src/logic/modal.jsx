import { useState, createContext, useContext } from 'react'

import { LiloProvider } from './lilo'

const ModalContext = createContext()

export function ModalProvider({ children, liloSettings }) {
  const [modal, setModal] = useState(null)

  const openModal = modal => setModal(modal)
  const closeModal = () => setModal(null)

  return <ModalContext.Provider value={{ modal, openModal, closeModal }}>
    {children}
    {modal ? <div className='modal container' onClick={closeModal}>
      <LiloProvider settings={liloSettings}>{modal}</LiloProvider>
    </div> : ''}
  </ModalContext.Provider>
}

export function useModal() {
  return useContext(ModalContext)
}
