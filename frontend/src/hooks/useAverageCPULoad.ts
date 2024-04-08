import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useLocalStorage } from './useLocalStorage'

import type { Load, ApiLoad } from '../types'

const fetchAverageLoad = () =>
  axios.get(`/cpu-monitoring/average-load`).then((res) => {
    return res.data
  })

const averageLoadAdapter = (data: ApiLoad) => {
  const { cpu } = data
  const { average, time } = cpu

  const load: Load = {
    average,
    time,
    formattedTime: new Date(time).toLocaleTimeString(),
  }

  return load
}

function loadIsLessThan10minOld(load?: Load) {
  return load && load.time > Date.now() - 600000
}

type UseAverageCPULoadRetun = {
  data: Load[]
  status: string
}

function useAverageCPULoad(): UseAverageCPULoadRetun {
  // load data from local storage
  const [storedData, setStoredData] = useLocalStorage<Load[]>({
    key: 'averageLoad',
    defaultValue: [],
  })

  // filter data that is more than 10 mins old data
  const recentData = storedData.filter(loadIsLessThan10minOld)

  // set initial state
  const [averageLoad, setAverageLoad] = useState<Load[]>(recentData)

  // fetch data from the server
  const { data, status } = useQuery({
    queryKey: ['averageLoad'],
    queryFn: fetchAverageLoad,
    select: (data: ApiLoad): Load => averageLoadAdapter(data),
    refetchInterval: 10000,
  })

  useEffect(() => {
    if (data) {
      // update state
      setAverageLoad((oldData) =>
        [...oldData, data].filter(loadIsLessThan10minOld),
      )
    }
  }, [data])

  useEffect(() => {
    // persist data in local storage
    setStoredData(averageLoad)
  }, [averageLoad, setStoredData])

  return {
    data: averageLoad,
    status,
  }
}
export { useAverageCPULoad }
