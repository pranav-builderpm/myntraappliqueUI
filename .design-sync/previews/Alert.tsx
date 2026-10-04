import * as React from 'react'
import { Alert } from '@applique-ui/uikit'

const col = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: 12,
  padding: 16,
  width: 520,
}

export const Types = () => (
  <div style={col}>
    <Alert type="success">Prescription sent to the pharmacy.</Alert>
    <Alert type="info">
      Next available slot with Dr. Iyer is tomorrow, 11:00 AM.
    </Alert>
    <Alert type="warning">Fee of ₹800 is yet to be collected.</Alert>
    <Alert type="error">Patient record could not be saved.</Alert>
  </div>
)

export const WithTitle = () => (
  <div style={col}>
    <Alert type="error" title="Booking failed">
      Slot 10:30 AM is already taken. Please pick another time.
    </Alert>
  </div>
)
