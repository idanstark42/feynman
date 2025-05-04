import { useEffect, useState, createContext, useContext } from 'react'
import { useStytch } from '@stytch/react'

import Lilo from './lilo'

import Loader from '../../components/loader'

const LiloContext = createContext()

export function LiloProvider({ children, settings }) {
  const stytch = useStytch()
  const [loading, setLoading] = useState([]) // an array of loading states for each collection
  const [data, setData] = useState({}) // an object to hold the data for each collection
  const [lilo, setLilo] = useState(null) // the Lilo instance

  useEffect(() => {
    setLilo(new Lilo(stytch, settings, data, setData, loading, setLoading))
  }, [])

  if (!lilo) {
    return <Loader />
  }

  return <LiloContext.Provider value={lilo}>{children}</LiloContext.Provider>
}

export function useLilo() {
  return useContext(LiloContext)
}
