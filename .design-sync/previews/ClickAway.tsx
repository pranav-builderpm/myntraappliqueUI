import * as React from 'react'
import { ClickAway, Text } from '@applique-ui/uikit'

const Demo = () => {
  const ref = React.useRef<HTMLDivElement>(null)
  const [count, setCount] = React.useState(0)
  return (
    <div style={{ padding: 16, width: 360 }}>
      <ClickAway target={ref} onClickAway={() => setCount((c) => c + 1)} />
      <div
        ref={ref}
        style={{
          padding: 16,
          border: '2px solid #3b82f6',
          borderRadius: 8,
          background: '#eff6ff',
        }}
      >
        <Text.H4>Appointment: Ananya Iyer</Text.H4>
        <Text.P>
          Clicks inside this card are ignored. Click anywhere outside to trigger
          onClickAway.
        </Text.P>
      </div>
      <p>
        <Text color="dark">Outside clicks detected: {count}</Text>
      </p>
    </div>
  )
}
export const Default = () => <Demo />
