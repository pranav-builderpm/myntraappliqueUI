import * as React from 'react'
import { InputSelect, Bell } from '@applique-ui/uikit'

const col = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: 12,
  padding: 16,
  maxWidth: 340,
}

const doctors = [
  { value: 'priya', label: 'Dr. Priya Nair' },
  { value: 'rohan', label: 'Dr. Rohan Mehta' },
  { value: 'sana', label: 'Dr. Sana Khan' },
]

const Controlled = (props: any) => {
  const [value, setValue] = React.useState(props.initial)
  return (
    <InputSelect
      options={doctors}
      {...props}
      value={value}
      onChange={setValue}
    />
  )
}

export const Default = () => (
  <div style={col}>
    <Controlled initial="rohan" />
    <Controlled placeholder="Select doctor" />
  </div>
)

export const Variants = () => (
  <div style={col}>
    <Controlled initial="priya" variant="bordered" />
    <Controlled initial="priya" variant="standard" />
    <Controlled initial="sana" icon={Bell} />
    <Controlled initial={['priya', 'sana']} multiple />
  </div>
)

export const States = () => (
  <div style={col}>
    <Controlled initial="rohan" disabled />
    <Controlled initial="rohan" readOnly />
    <Controlled placeholder="Select doctor" error />
    <Controlled placeholder="Loading doctors" isLoading />
  </div>
)
