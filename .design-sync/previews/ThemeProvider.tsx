import * as React from 'react'
import { ThemeProvider, Button, Text } from '@applique-ui/uikit'

export const Default = () => (
  <ThemeProvider>
    <div style={{ padding: 16, width: 360 }}>
      <Text.H3>Today's schedule</Text.H3>
      <Text.P>12 appointments booked, 3 walk-ins pending.</Text.P>
      <Button type="primary">Book appointment</Button>
    </div>
  </ThemeProvider>
)
