import * as React from 'react'
import {
  Badge,
  CheckCircleSolid,
  ClockSolid,
  ExclamationTriangleSolid,
} from '@applique-ui/uikit'

const row = {
  display: 'flex',
  gap: 12,
  flexWrap: 'wrap' as const,
  alignItems: 'center',
  padding: 16,
}

export const Types = () => (
  <div style={row}>
    <Badge type="info">Scheduled</Badge>
    <Badge type="success">Paid</Badge>
    <Badge type="warning">Awaiting payment</Badge>
    <Badge type="error">No-show</Badge>
  </div>
)

export const Variants = () => (
  <div style={{ padding: 16, display: 'grid', gap: 12 }}>
    <div style={row}>
      <Badge type="success" variant="solid">
        Checked in
      </Badge>
      <Badge type="warning" variant="solid">
        Running late
      </Badge>
      <Badge type="error" variant="solid">
        Cancelled
      </Badge>
    </div>
    <div style={row}>
      <Badge type="success" variant="outlined">
        Checked in
      </Badge>
      <Badge type="warning" variant="outlined">
        Running late
      </Badge>
      <Badge type="error" variant="outlined">
        Cancelled
      </Badge>
    </div>
    <div style={row}>
      <Badge size="small" type="info">
        Small
      </Badge>
      <Badge size="regular" type="info">
        Regular
      </Badge>
    </div>
  </div>
)

export const WithIconAndClose = () => (
  <div style={row}>
    <Badge type="success" icon={CheckCircleSolid}>
      Confirmed
    </Badge>
    <Badge type="info" icon={ClockSolid}>
      10:30 AM
    </Badge>
    <Badge type="warning" icon={ExclamationTriangleSolid}>
      Fee due ₹850
    </Badge>
    <Badge type="info" onClose={() => {}}>
      Follow-up
    </Badge>
  </div>
)
