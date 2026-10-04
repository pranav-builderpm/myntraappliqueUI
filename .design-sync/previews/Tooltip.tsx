import * as React from 'react'
import { Tooltip, Button } from '@applique-ui/uikit'

// Tooltip has no controlled "open" prop; the trigger is clicked once after mount to show it.
const Open = ({ position, dark }: any) => {
  const ref = React.useRef<any>(null)
  React.useEffect(() => {
    const el = ref.current && ref.current.querySelector('button, span, a')
    if (el) el.click()
  }, [])
  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        minHeight: 320,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Tooltip
        triggerOn="click"
        position={position}
        dark={dark}
        renderContent={() => (
          <div style={{ padding: 4 }}>Next slot: 11:15 AM with Dr. Iyer</div>
        )}
      >
        <Button type="secondary">Check availability</Button>
      </Tooltip>
    </div>
  )
}

export const Up = () => <Open position="up" />
export const DownDark = () => <Open position="down" dark />
export const Right = () => <Open position="right" />
