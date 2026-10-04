import * as React from 'react'
import { InputFile, Button } from '@applique-ui/uikit'

const col = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: 16,
  padding: 16,
  maxWidth: 420,
}

export const Default = () => (
  <div style={col}>
    <InputFile placeholder="Upload patient lab report (PDF)" />
  </div>
)

export const Variants = () => (
  <div style={col}>
    <InputFile variant="bordered" placeholder="Drop X-ray image here" />
    <InputFile variant="standard" placeholder="Attach prescription scan" />
  </div>
)

export const CustomActions = () => (
  <div style={col}>
    <InputFile
      placeholder="Insurance card photo"
      actions={(browse: () => void) => (
        <Button type="secondary" onClick={browse}>
          Choose file
        </Button>
      )}
    />
  </div>
)
