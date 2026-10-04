import * as React from 'react'
import { Tabs } from '@applique-ui/uikit'

const Demo = ({ type }: any) => {
  const [i, setI] = React.useState(0)
  return (
    <div style={{ padding: 16, width: 520 }}>
      <Tabs type={type} activeIndex={i} onChange={setI}>
        <Tabs.Tab title="Upcoming (8)">
          Today: Ravi Kumar at 10:30 AM, Meera Shah at 11:15 AM.
        </Tabs.Tab>
        <Tabs.Tab title="Completed (24)">
          24 consultations completed this week.
        </Tabs.Tab>
        <Tabs.Tab title="Cancelled (3)">
          Three appointments were cancelled by patients.
        </Tabs.Tab>
      </Tabs>
    </div>
  )
}

export const Primary = () => <Demo type="primary" />
export const Secondary = () => <Demo type="secondary" />
