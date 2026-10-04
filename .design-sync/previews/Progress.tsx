import * as React from 'react'
import { Progress } from '@applique-ui/uikit'

const col = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: 16,
  padding: 16,
  width: 420,
}

export const Bars = () => (
  <div style={col}>
    <Progress type="bar" value={80} appearance="success" size="small" />
    <Progress type="bar" value={55} appearance="info" size="medium" />
    <Progress type="bar" value={35} appearance="warning" size="large" />
    <Progress type="bar" value={15} appearance="danger" size="medium" />
  </div>
)

export const Circles = () => (
  <div style={{ display: 'flex', gap: 24, padding: 16 }}>
    <Progress type="circle" value={25} appearance="danger" />
    <Progress type="circle" value={60} appearance="info" />
    <Progress type="circle" value={100} appearance="success" />
  </div>
)
