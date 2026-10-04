import * as React from 'react'
import { SchemaForm } from '@applique-ui/uikit'

const schema = {
  title: 'Patient registration',
  type: 'object',
  properties: {
    name: { title: 'Full name', type: 'string' },
    age: { title: 'Age', type: 'integer' },
    visitType: {
      title: 'Visit type',
      enum: ['New consultation', 'Follow-up', 'Lab report review'],
    },
    insured: { title: 'Has health insurance', type: 'boolean' },
  },
}

export const Default = () => {
  const [value, setValue] = React.useState<any>({
    name: 'Ritu Sharma',
    age: 34,
    visitType: 'Follow-up',
    insured: true,
  })
  return (
    <div style={{ padding: 16 }}>
      <SchemaForm
        schema={schema}
        value={value}
        onChange={setValue}
        defaultFieldSize={6}
      />
    </div>
  )
}

export const Empty = () => {
  const [value, setValue] = React.useState<any>({})
  return (
    <div style={{ padding: 16 }}>
      <SchemaForm
        schema={schema}
        value={value}
        onChange={setValue}
        defaultFieldSize={6}
      />
    </div>
  )
}
