import { GoCpu } from 'react-icons/go'
import { VscPulse } from 'react-icons/vsc'
import { FiBarChart2 } from 'react-icons/fi'
import { RiHeartPulseLine } from 'react-icons/ri'

import { Card } from '../Card'
import { Current } from '../Current'
import { Average } from '../Average'
import { Recovery } from '../Recovery'
import { Heavy } from '../Heavy'
import { Notification } from '../Notification'
import { useAverageCPULoad } from '../hooks/useAverageCPULoad'

import layout from '../styles/layout.module.css'

export function CPU() {
  const { data, status } = useAverageCPULoad()

  return (
    <>
      <section className={layout.notification}>
        <Notification status={status} data={data} />
      </section>
      <section className={layout.current}>
        <Card title='Current average load' Icon={GoCpu}>
          <Current data={data} />
        </Card>
      </section>
      <section className={layout.average}>
        <Card title='Average load' Icon={VscPulse}>
          <Average data={data} />
        </Card>
      </section>
      <section className={layout.recovery}>
        <Card title='Recovery summary' Icon={RiHeartPulseLine}>
          <Recovery data={data} />
        </Card>
      </section>
      <section className={layout.heavy}>
        <Card title='CPU heavy load' Icon={FiBarChart2}>
          <Heavy data={data} />
        </Card>
      </section>
    </>
  )
}
