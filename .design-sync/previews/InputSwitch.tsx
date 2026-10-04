import * as React from 'react'
import { InputSwitch } from '@applique-ui/uikit'

const box = {
  padding: 16,
  display: 'flex',
  flexDirection: 'column' as const,
  gap: 14,
}

export const Default = () => {
  const [a, setA] = React.useState(true)
  const [b, setB] = React.useState(false)
  return (
    <div style={box}>
      <InputSwitch value={a} onChange={setA} title="Accepting walk-ins" />
      <InputSwitch value={b} onChange={setB} title="Doctor on leave" />
    </div>
  )
}

export const States = () => (
  <div style={box}>
    <InputSwitch value={true} disabled title="Disabled, on" />
    <InputSwitch value={false} disabled title="Disabled, off" />
    <InputSwitch value={true} readOnly title="Read only" />
  </div>
)
