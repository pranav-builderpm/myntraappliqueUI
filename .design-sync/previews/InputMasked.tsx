import * as React from 'react'
import { InputMasked, CalendarDay } from '@applique-ui/uikit'

const col = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: 12,
  padding: 16,
  maxWidth: 320,
}

const Controlled = (props: any) => {
  const [value, setValue] = React.useState(props.initial || '')
  return <InputMasked {...props} value={value} onChange={setValue} />
}

export const Default = () => (
  <div style={col}>
    <Controlled
      pattern={'dd"/"dd"/"dddd'}
      initial="12082026"
      placeholder="DD/MM/YYYY"
    />
    <Controlled
      pattern={'dd"/"dd"/"dddd'}
      placeholder="Date of birth"
      icon={CalendarDay}
    />
  </div>
)

export const IncludeMaskChars = () => (
  <div style={col}>
    <Controlled includeMaskChars pattern={'dddddddddd'} initial="9876543210" />
    <Controlled
      includeMaskChars
      pattern={'dddd"-"dddd"-"dddd'}
      initial="1234-5678-9012"
    />
  </div>
)

export const States = () => (
  <div style={col}>
    <Controlled pattern={'dd"/"dd"/"dddd'} initial="01011990" disabled />
    <Controlled pattern={'dd"/"dd"/"dddd'} initial="01011990" readOnly />
  </div>
)
