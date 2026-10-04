import * as React from 'react'
import { VirtualGrid } from '@applique-ui/uikit'

const doctors = [
  'Dr. Mehta',
  'Dr. Kulkarni',
  'Dr. Banerjee',
  'Dr. Fernandes',
  'Dr. Menon',
]
const slots = [
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
]

export const Default = () => (
  <div style={{ padding: 16 }}>
    <VirtualGrid
      rows={50}
      columns={5}
      width={440}
      height={240}
      estimatedCellWidth={140}
      estimatedCellHeight={48}
    >
      {({ style, rowIndex, columnIndex }: any) => (
        <div
          style={{
            ...style,
            width: 140,
            height: 48,
            boxSizing: 'border-box',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 13,
            border: '1px solid #e5e7eb',
            background: (rowIndex + columnIndex) % 2 ? '#f9fafb' : '#fff',
          }}
        >
          {doctors[columnIndex]} · {slots[rowIndex % slots.length]}
        </div>
      )}
    </VirtualGrid>
  </div>
)

export const FixedFirstColumn = () => (
  <div style={{ padding: 16 }}>
    <VirtualGrid
      rows={50}
      columns={8}
      width={440}
      height={240}
      estimatedCellWidth={110}
      estimatedCellHeight={40}
      fixedColumnsFromStart={1}
    >
      {({ style, rowIndex, columnIndex }: any) => (
        <div
          style={{
            ...style,
            width: 110,
            height: 40,
            boxSizing: 'border-box',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 13,
            border: '1px solid #e5e7eb',
            background: columnIndex === 0 ? '#eef2ff' : '#fff',
          }}
        >
          {columnIndex === 0
            ? `Patient ${rowIndex + 1}`
            : `₹${(columnIndex * 150 + rowIndex * 10).toLocaleString('en-IN')}`}
        </div>
      )}
    </VirtualGrid>
  </div>
)
