import * as React from 'react'
import { Image } from '@applique-ui/uikit'

const svg = (bg: string, label: string) =>
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="160"><rect width="240" height="160" fill="${bg}"/><text x="120" y="86" font-family="sans-serif" font-size="18" text-anchor="middle" fill="#fff">${label}</text></svg>`
  )

const row = { display: 'flex', gap: 16, padding: 16, flexWrap: 'wrap' as const }

export const Default = () => (
  <div style={row}>
    <Image
      src={svg('#3b82f6', 'Dr. Mehta')}
      width={240}
      height={160}
      lazy={false}
      alt="Dr. Mehta"
    />
  </div>
)

export const Sizes = () => (
  <div style={row}>
    <Image
      src={svg('#16a34a', 'Waiting room')}
      width={120}
      height={80}
      lazy={false}
      alt="Waiting room"
    />
    <Image
      src={svg('#d97706', 'Pharmacy')}
      width={180}
      height={120}
      lazy={false}
      alt="Pharmacy"
    />
    <Image
      src={svg('#7c3aed', 'Lab')}
      width={240}
      height={160}
      lazy={false}
      alt="Lab"
    />
  </div>
)
