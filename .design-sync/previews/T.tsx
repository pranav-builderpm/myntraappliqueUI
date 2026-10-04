import * as React from 'react'
import { T } from '@applique-ui/uikit'

const box = { padding: 16, maxWidth: 480 }

export const Sampler = () => (
  <div style={box}>
    <T.H1>Dr. Mehta's clinic</T.H1>
    <T.H3>Walk-in patients</T.H3>
    <T.P>
      Reception can confirm or reschedule appointments from this screen.
    </T.P>
    <T.Caption>Last updated 10 minutes ago</T.Caption>
    <T color="success">Payment of ₹600 received</T>
  </div>
)
