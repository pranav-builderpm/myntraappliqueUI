import * as React from 'react'
import { InputNumber } from '@applique-ui/uikit'

const col = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: 12,
  padding: 16,
  maxWidth: 320,
}

const Controlled = (props: any) => {
  const [value, setValue] = React.useState(props.initial)
  return <InputNumber {...props} value={value} onChange={setValue} />
}

export const Default = () => (
  <div style={col}>
    <Controlled initial={750} placeholder="Consultation fee (₹)" />
    <Controlled initial="" placeholder="Enter age" />
  </div>
)

export const States = () => (
  <div style={col}>
    <Controlled initial={1500} disabled />
    <Controlled initial={42} readOnly />
    <Controlled initial={-5} error />
    <Controlled initial={30} variant="standard" />
  </div>
)
