import * as React from 'react'
import {
  Fab,
  Button,
  InfoCircleSolid,
  ChevronLeftSolid,
  ChevronRightSolid,
  ChevronUpSolid,
} from '@applique-ui/uikit'

// Fab reveals its children on click: open it once after mount so the card shows the expanded state.
const Stage = ({ height = 200, children }: any) => {
  const ref = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    const t = setTimeout(
      () => ref.current?.querySelector('button')?.click(),
      60
    )
    return () => clearTimeout(t)
  }, [])
  return (
    <div
      ref={ref}
      style={{
        height,
        position: 'relative',
        border: '1px dashed #ccc',
        margin: 8,
        width: 480,
      }}
    >
      {children}
    </div>
  )
}

const actions = (
  <>
    <Button icon={ChevronLeftSolid} label="Previous patient" />
    <Button icon={ChevronRightSolid} label="Next patient" />
    <Button icon={ChevronUpSolid} label="Back to queue" />
  </>
)

export const Default = () => (
  <Stage height={260}>
    <Fab
      icon={InfoCircleSolid}
      triggerOn="click"
      direction="up"
      position="right-bottom"
    >
      {actions}
    </Fab>
  </Stage>
)

export const Directions = () => (
  <div>
    <Stage>
      <Fab
        icon={InfoCircleSolid}
        triggerOn="click"
        direction="down"
        position="left-top"
      >
        {actions}
      </Fab>
    </Stage>
    <Stage>
      <Fab
        icon={InfoCircleSolid}
        triggerOn="click"
        direction="left"
        position="right-center"
      >
        {actions}
      </Fab>
    </Stage>
  </div>
)

export const Disabled = () => (
  <div
    style={{
      height: 120,
      position: 'relative',
      width: 480,
      margin: 8,
      border: '1px dashed #ccc',
    }}
  >
    <Fab icon={InfoCircleSolid} direction="up" position="left-bottom" disabled>
      <Button icon={ChevronUpSolid} label="Back to queue" />
    </Fab>
  </div>
)
