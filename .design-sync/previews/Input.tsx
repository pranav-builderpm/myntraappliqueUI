import * as React from 'react'
import { Input, Bell } from '@applique-ui/uikit'

const box = {
  padding: 16,
  display: 'flex',
  flexDirection: 'column' as const,
  gap: 16,
  maxWidth: 340,
}

export const Default = () => {
  const [v, setV] = React.useState('')
  return (
    <div style={box}>
      <Input value={v} onChange={setV} placeholder="Search patient by name" />
      <Input value="Arjun Nair" readOnly />
      <Input value="Not editable" disabled />
    </div>
  )
}

export const Variants = () => (
  <div style={box}>
    <Input variant="bordered" value="Bordered" onChange={() => {}} />
    <Input variant="standard" value="Standard" onChange={() => {}} />
    <Input value="invalid@" error onChange={() => {}} />
  </div>
)

export const Adornments = () => (
  <div style={box}>
    <Input icon={Bell} placeholder="Reminder note" onChange={() => {}} />
    <Input adornment="₹" type="number" value={800} onChange={() => {}} />
    <Input
      adornment="+91"
      adornmentPosition="start"
      type="tel"
      value="9876543210"
      onChange={() => {}}
    />
    <Input
      adornment="mins"
      adornmentPosition="end"
      value="30"
      onChange={() => {}}
    />
  </div>
)
