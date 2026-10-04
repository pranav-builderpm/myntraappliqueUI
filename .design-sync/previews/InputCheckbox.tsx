import * as React from 'react'
import { InputCheckbox } from '@applique-ui/uikit'

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
      <InputCheckbox value={a} onChange={setA} title="Send SMS reminder" />
      <InputCheckbox value={b} onChange={setB} title="Patient has insurance" />
    </div>
  )
}

export const Dashbox = () => {
  const [a, setA] = React.useState(true)
  return (
    <div style={box}>
      <InputCheckbox
        boxtype="dashbox"
        value={a}
        onChange={setA}
        title="Select all appointments"
      />
    </div>
  )
}

export const States = () => (
  <div style={box}>
    <InputCheckbox value={true} disabled title="Disabled, checked" />
    <InputCheckbox value={false} disabled title="Disabled, unchecked" />
    <InputCheckbox value={true} readOnly title="Read only" />
  </div>
)
