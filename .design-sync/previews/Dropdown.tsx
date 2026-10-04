import * as React from 'react'
import { Dropdown } from '@applique-ui/uikit'

const panel = {
  padding: 16,
  background: '#fff',
  boxShadow: '0 0 10px rgba(0,0,0,.25)',
  minWidth: 220,
}
const wrap = { minHeight: 260, padding: 16 }

const Content = () => (
  <div style={panel}>
    <strong>Dr. Anita Mehta</strong>
    <p style={{ margin: '8px 0 0' }}>Cardiology, Room 204</p>
    <p style={{ margin: '4px 0 0' }}>Next slot: 11:30 AM, fee ₹800</p>
  </div>
)

export const Open = () => (
  <div style={wrap}>
    <Dropdown isOpen trigger="Doctor details" down>
      <Content />
    </Dropdown>
  </div>
)

export const OpenRightAligned = () => (
  <div style={{ ...wrap, width: 520 }}>
    <Dropdown isOpen trigger="Appointment summary" right>
      <Content />
    </Dropdown>
  </div>
)

export const OpenAbove = () => (
  <div style={{ ...wrap, paddingTop: 140 }}>
    <Dropdown isOpen trigger="Billing notes" up>
      <div style={panel}>Advance of ₹500 collected at reception.</div>
    </Dropdown>
  </div>
)
