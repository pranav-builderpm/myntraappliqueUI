import * as React from 'react'
import { Button, Grid, Bell, CheckCircle } from '@applique-ui/uikit'

const row = {
  display: 'flex',
  gap: 12,
  flexWrap: 'wrap' as const,
  alignItems: 'center',
  padding: 16,
}

export const Types = () => (
  <div style={row}>
    <Button type="primary">Book appointment</Button>
    <Button type="secondary">Reschedule</Button>
    <Button type="tertiary">View history</Button>
    <Button type="text">Cancel</Button>
    <Button type="link">Patient record</Button>
  </div>
)

export const Sizes = () => (
  <div style={row}>
    <Button type="primary" size="xs">
      Extra small
    </Button>
    <Button type="primary" size="small">
      Small
    </Button>
    <Button type="primary" size="regular">
      Regular
    </Button>
    <div style={{ width: 220 }}>
      <Button type="primary" size="large">
        Large
      </Button>
    </div>
  </div>
)

export const WithIcons = () => (
  <div style={row}>
    <Button type="primary" icon={CheckCircle}>
      Confirm visit
    </Button>
    <Button type="secondary" icon={Bell} notifications={3}>
      Reminders
    </Button>
    <Button type="tertiary" icon={Bell} />
  </div>
)

export const States = () => (
  <div style={row}>
    <Button type="primary" disabled>
      Disabled
    </Button>
    <Button type="primary" loading>
      Saving
    </Button>
    <Button type="secondary" disabled>
      Disabled
    </Button>
    <Button type="secondary" loading>
      Loading
    </Button>
  </div>
)
