import * as React from 'react'
import { Avatar, Text } from '@applique-ui/uikit'

const row = {
  display: 'flex',
  gap: 24,
  alignItems: 'center',
  padding: 16,
  flexWrap: 'wrap' as const,
}

export const Sizes = () => (
  <div style={row}>
    <Avatar name="Ananya Iyer" size="small" />
    <Avatar name="Ananya Iyer" size="medium" />
    <Avatar name="Ananya Iyer" size="large" />
  </div>
)

export const Names = () => (
  <div style={row}>
    {['Dr. Rohan Mehta', 'Priya Nair', 'Imran Sheikh', 'Kavita'].map((n) => (
      <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Avatar name={n} size="medium" />
        <Text>{n}</Text>
      </div>
    ))}
  </div>
)
