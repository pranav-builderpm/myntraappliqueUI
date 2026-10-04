import * as React from 'react'
import { Section, Button } from '@applique-ui/uikit'

const box = {
  background: '#e8eef7',
  padding: 12,
  borderRadius: 4,
  fontSize: 13,
}
const wrap = { padding: 16 }

export const Default = () => (
  <div style={wrap}>
    <Section title="Today's appointments">
      <div style={box}>12 patients scheduled, 3 walk-ins expected.</div>
    </Section>
  </div>
)

export const WithActions = () => (
  <div style={wrap}>
    <Section title="Patient records">
      <Button type="secondary">Export</Button>
      <Button type="primary">Add patient</Button>
      <div style={box}>Ananya Sharma, Vikram Rao, Meera Iyer</div>
    </Section>
  </div>
)

export const NoPadding = () => (
  <div style={wrap}>
    <Section title="Outstanding fees" noPadding>
      <div style={box}>Total pending: ₹18,450 across 7 invoices.</div>
    </Section>
  </div>
)
