import * as React from 'react'
import { InputTextArea } from '@applique-ui/uikit'

const col = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: 12,
  padding: 16,
  maxWidth: 420,
}

const Controlled = (props: any) => {
  const [value, setValue] = React.useState(props.initial || '')
  return <InputTextArea {...props} value={value} onChange={setValue} />
}

export const Default = () => (
  <div style={col}>
    <Controlled
      initial="Patient reports mild tooth sensitivity on the lower left molar for two weeks."
      rows={4}
    />
    <Controlled placeholder="Add consultation notes" rows={3} />
  </div>
)

export const Variants = () => (
  <div style={col}>
    <Controlled
      initial="Prescribed Amoxicillin 500mg, 3 times a day for 5 days."
      variant="standard"
      rows={3}
    />
    <Controlled initial="Resize handle hidden." noResize rows={2} />
  </div>
)

export const States = () => (
  <div style={col}>
    <Controlled initial="Notes locked after billing." disabled rows={2} />
    <Controlled initial="Read only history entry, 12 Aug." readOnly rows={2} />
    <Controlled initial="" placeholder="Notes are required" error rows={2} />
  </div>
)
