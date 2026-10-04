import * as React from 'react'
import { InputMonth } from '@applique-ui/uikit'

const col = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: 12,
  padding: 16,
  maxWidth: 320,
}

const Controlled = (props: any) => {
  const [value, setValue] = React.useState(props.initial)
  return <InputMonth {...props} value={value} onChange={setValue} />
}

export const Default = () => (
  <div style={col}>
    <Controlled initial={{ month: 7, year: 2026 }} />
    <Controlled />
  </div>
)

export const WithLimits = () => (
  <div style={col}>
    <Controlled
      initial={{ month: 3, year: 2026 }}
      minDate={new Date(2024, 0, 1)}
      maxDate={new Date(2027, 11, 31)}
    />
  </div>
)

export const States = () => (
  <div style={col}>
    <Controlled initial={{ month: 1, year: 2026 }} disabled />
    <Controlled initial={{ month: 1, year: 2026 }} error />
  </div>
)
