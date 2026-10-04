import * as React from 'react'
import { Field, Input } from '@applique-ui/uikit'

const box = {
  padding: 16,
  display: 'flex',
  flexDirection: 'column' as const,
  gap: 20,
  maxWidth: 360,
}

export const Default = () => {
  const [v, setV] = React.useState('Ritu Sharma')
  return (
    <div style={box}>
      <Field title="Patient name" description="As printed on the ID card">
        <Input value={v} onChange={setV} placeholder="Full name" />
      </Field>
    </div>
  )
}

export const Required = () => {
  const [v, setV] = React.useState('')
  return (
    <div style={box}>
      <Field
        title="Mobile number"
        description="We send appointment reminders here"
        required
      >
        <Input
          type="tel"
          value={v}
          onChange={setV}
          placeholder="10-digit number"
        />
      </Field>
    </div>
  )
}

export const ErrorAndDisabled = () => (
  <div style={box}>
    <Field title="Email" error="Enter a valid email address" required>
      <Input type="email" value="ritu.sharma@" error onChange={() => {}} />
    </Field>
    <Field title="Consultation fee" description="Set by the doctor" disabled>
      <Input value="₹800" disabled />
    </Field>
  </div>
)
