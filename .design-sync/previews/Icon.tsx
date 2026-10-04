import * as React from 'react'
import {
  Icon,
  Bell,
  CalendarDay,
  CheckCircleSolid,
  InfoCircleSolid,
  SpinnerSolid,
  UserCircleSolid,
} from '@applique-ui/uikit'

const row = {
  display: 'flex',
  gap: 20,
  alignItems: 'center',
  padding: 16,
  flexWrap: 'wrap' as const,
}

export const Sizes = () => (
  <div style={row}>
    <Icon name={Bell} fontSize="small" title="Reminders" />
    <Icon name={Bell} fontSize="medium" title="Reminders" />
    <Icon name={Bell} fontSize="large" title="Reminders" />
  </div>
)

export const Colors = () => (
  <div style={row}>
    <Icon name={CalendarDay} fontSize="large" color="primary" />
    <Icon name={CheckCircleSolid} fontSize="large" color="success" />
    <Icon name={InfoCircleSolid} fontSize="large" color="warning" />
    <Icon name={InfoCircleSolid} fontSize="large" color="error" />
    <Icon name={UserCircleSolid} fontSize="large" color="disabled" />
    <Icon name={UserCircleSolid} fontSize="large" color="dark" />
  </div>
)

export const Spinning = () => (
  <div style={row}>
    <Icon
      name={SpinnerSolid}
      fontSize="large"
      color="primary"
      spin
      title="Loading appointments"
    />
  </div>
)
