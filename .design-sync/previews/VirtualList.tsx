import * as React from 'react'
import { VirtualList } from '@applique-ui/uikit'

const first = [
  'Ananya',
  'Rahul',
  'Priya',
  'Imran',
  'Kavita',
  'Arjun',
  'Sneha',
  'Vikram',
  'Meera',
  'Farhan',
]
const last = ['Iyer', 'Verma', 'Nair', 'Sheikh', 'Rao']
const patients = Array.from(
  { length: 50 },
  (_, i) => `${first[i % 10]} ${last[(i * 3) % 5]}`
)

export const Default = () => (
  <div style={{ padding: 16, width: 320 }}>
    <VirtualList
      itemCount={patients.length}
      viewportSize={240}
      estimatedItemSize={40}
      style={{ height: 240, border: '1px solid #ddd' }}
    >
      {({ index, style }: any) => (
        <div
          style={{
            ...style,
            left: 0,
            right: 0,
            padding: '10px 16px',
            boxSizing: 'border-box',
            borderBottom: '1px solid #eee',
          }}
        >
          {index + 1}. {patients[index]}
        </div>
      )}
    </VirtualList>
  </div>
)

export const PinnedFirstRow = () => (
  <div style={{ padding: 16, width: 320 }}>
    <VirtualList
      itemCount={patients.length}
      viewportSize={240}
      estimatedItemSize={40}
      fixedItemCountFromStart={1}
      style={{ height: 240, border: '1px solid #ddd' }}
    >
      {({ index, style }: any) => (
        <div
          style={{
            ...style,
            left: 0,
            right: 0,
            padding: '10px 16px',
            boxSizing: 'border-box',
            borderBottom: '1px solid #eee',
            background: index === 0 ? '#e8eef7' : '#fff',
            fontWeight: index === 0 ? 600 : 400,
          }}
        >
          {index === 0 ? 'Patient queue' : index + '. ' + patients[index]}
        </div>
      )}
    </VirtualList>
  </div>
)
