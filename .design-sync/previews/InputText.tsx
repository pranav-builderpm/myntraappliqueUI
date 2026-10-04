import * as React from 'react'
import { InputText, Bell } from '@applique-ui/uikit'

const col = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: 12,
  padding: 16,
  maxWidth: 360,
}

const Controlled = (props: any) => {
  const [value, setValue] = React.useState(props.initial || '')
  return <InputText {...props} value={value} onChange={setValue} />
}

export const Default = () => (
  <div style={col}>
    <Controlled initial="Ananya Sharma" />
    <Controlled initial="" placeholder="Search patient by name" type="search" />
  </div>
)

export const Types = () => (
  <div style={col}>
    <Controlled initial="reception@sunrisedental.in" type="email" />
    <Controlled initial="+91 98765 43210" type="tel" />
    <Controlled initial="secret123" type="password" />
  </div>
)

export const States = () => (
  <div style={col}>
    <Controlled initial="Dr. Rohan Mehta" disabled />
    <Controlled initial="Dr. Rohan Mehta" readOnly />
    <Controlled initial="ananya@" type="email" error />
    <Controlled initial="Follow-up visit" icon={Bell} variant="standard" />
  </div>
)
