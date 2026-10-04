import * as React from 'react'
import { InputRadio } from '@applique-ui/uikit'

const wrap = { padding: 16 }

const Controlled = (props: any) => {
  const [value, setValue] = React.useState(props.initial)
  return <InputRadio {...props} value={value} onChange={setValue} />
}

const payment = [
  { value: 'cash', label: 'Cash' },
  { value: 'upi', label: 'UPI' },
  { value: 'card', label: 'Card' },
  { value: 'insurance', label: 'Insurance' },
]

export const Default = () => (
  <div style={wrap}>
    <Controlled options={payment} initial="upi" />
  </div>
)

export const Unselected = () => (
  <div style={wrap}>
    <Controlled
      options={[
        { value: 'first', label: 'First visit' },
        { value: 'follow', label: 'Follow-up' },
      ]}
    />
  </div>
)

export const Disabled = () => (
  <div style={wrap}>
    <Controlled options={payment} initial="cash" disabled />
  </div>
)

export const CustomOption = () => (
  <div style={wrap}>
    <Controlled
      options={[
        { value: 'a', label: 'Dr. Priya Nair (Dentist)' },
        { value: 'b', label: 'Dr. Rohan Mehta (Ortho)' },
      ]}
      initial="a"
      renderOption={(o: any) => (
        <strong style={{ marginLeft: 6 }}>{o.title}</strong>
      )}
    />
  </div>
)
