import * as React from 'react'
import { ButtonGroup, Button, Bell } from '@applique-ui/uikit'

const box = {
  padding: 16,
  display: 'flex',
  flexDirection: 'column' as const,
  gap: 20,
}

export const Default = () => (
  <div style={box}>
    <ButtonGroup>
      <Button type="primary">Check in</Button>
      <Button type="secondary">Reschedule</Button>
      <Button type="link">View record</Button>
    </ButtonGroup>
  </div>
)

export const Structures = () => (
  <div style={box}>
    <ButtonGroup structure="primary-group">
      <Button type="primary">Confirm</Button>
      <Button type="primary">Print slip</Button>
      <Button type="primary">Send SMS</Button>
    </ButtonGroup>
    <ButtonGroup structure="secondary-group">
      <Button type="secondary">Today</Button>
      <Button type="secondary">This week</Button>
      <Button type="secondary">This month</Button>
    </ButtonGroup>
    <ButtonGroup structure="link-group">
      <Button type="link">Dr. Mehta</Button>
      <Button type="link">Dr. Iyer</Button>
      <Button type="link">Dr. Kapoor</Button>
    </ButtonGroup>
  </div>
)

export const WithIconButton = () => (
  <div style={box}>
    <ButtonGroup>
      <Button type="primary">Book visit</Button>
      <Button type="secondary">Cancel</Button>
      <Button type="tertiary" icon={Bell} />
    </ButtonGroup>
  </div>
)
