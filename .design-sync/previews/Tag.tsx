import * as React from 'react'
import { Tag, CheckCircleSolid } from '@applique-ui/uikit'

const row = {
  display: 'flex',
  gap: 12,
  flexWrap: 'wrap' as const,
  alignItems: 'center',
  padding: 16,
}

export const Sampler = () => (
  <div style={{ padding: 16, display: 'grid', gap: 12 }}>
    <div style={row}>
      <Tag type="info">Diabetic</Tag>
      <Tag type="success">Insured</Tag>
      <Tag type="warning">Pending reports</Tag>
      <Tag type="error">Allergy: penicillin</Tag>
    </div>
    <div style={row}>
      <Tag type="info" variant="outlined">
        Cardiology
      </Tag>
      <Tag type="success" variant="outlined" icon={CheckCircleSolid}>
        Vaccinated
      </Tag>
      <Tag type="warning" size="small">
        Walk-in
      </Tag>
    </div>
  </div>
)
