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
    const lilo = new Lilo(stytch, settings, data, setData, loading, setLoading)
    setLilo(lilo)

    ;(async () => {
      await lilo.init()
    }) ()
  }, [])

  if (!lilo) {
    return <Loader />
  }

  console.log('data', data)

  return <LiloContext.Provider value={{ lilo, data }}>{children}</LiloContext.Provider>
}

export function useLilo() {
  return useContext(LiloContext)
}
