import * as React from 'react'
import { Text } from '@applique-ui/uikit'

const box = { padding: 16, maxWidth: 520 }

export const Headings = () => (
  <div style={box}>
    <Text.Title>Today's appointments</Text.Title>
    <Text.H1>Dr. Mehta's clinic</Text.H1>
    <Text.H2>Morning session</Text.H2>
    <Text.H3>Walk-in patients</Text.H3>
    <Text.H4>Waiting room</Text.H4>
  </div>
)

export const BodyCopy = () => (
  <div style={box}>
    <Text.Body>
      Reception can confirm, reschedule or cancel any appointment from this
      screen. Patients are notified by SMS as soon as a change is saved.
    </Text.Body>
    <Text.P>
      Paragraph text sits below headings and uses the regular paragraph size.
    </Text.P>
    <Text.Caption>Last updated 10 minutes ago</Text.Caption>
  </div>
)

export const Colors = () => (
  <div style={box}>
    <Text color="primary">Primary: appointment confirmed</Text>
    <br />
    <Text color="success">Success: payment received</Text>
    <br />
    <Text color="warning">Warning: patient running late</Text>
    <br />
    <Text color="error">Error: slot already booked</Text>
    <br />
    <Text color="dark">Dark: reference number 4821</Text>
  </div>
)

export const Emphasis = () => (
  <div style={box}>
    <Text emphasis="high">High emphasis</Text>
    <br />
    <Text emphasis="medium">Medium emphasis</Text>
    <br />
    <Text emphasis="disabled">Disabled emphasis</Text>
    <br />
    <Text weight="bolder">Bolder weight</Text>
    <br />
    <Text weight="lighter">Lighter weight</Text>
  </div>
)
