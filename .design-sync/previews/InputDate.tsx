import * as React from 'react'
import { InputDate } from '@applique-ui/uikit'

const box = {
  padding: 16,
  display: 'flex',
  flexDirection: 'column' as const,
  gap: 16,
  maxWidth: 340,
}

// Values are Date objects; displayFormat uses date-fns tokens (yyyy, dd), not YYYY/DD.
export const Default = () => {
  const [v, setV] = React.useState<any>(new Date(2026, 9, 12))
  return (
    <div style={box}>
      <InputDate value={v} onChange={setV} />
    </div>
  )
}

export const Range = () => {
  const [v, setV] = React.useState<any>({
    from: new Date(2026, 9, 12),
    to: new Date(2026, 9, 18),
  })
  return (
    <div style={box}>
      <InputDate range value={v} onChange={setV} />
    </div>
  )
}

export const Disabled = () => (
  <div style={box}>
    <InputDate disabled value={new Date(2026, 9, 12)} onChange={() => {}} />
  </div>
)
