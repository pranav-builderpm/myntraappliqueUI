import * as React from 'react'
import { Loader } from '@applique-ui/uikit'

const col = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: 20,
  padding: 16,
  width: 360,
}

export const Spinners = () => (
  <div style={col}>
    <div>
      <Loader type="inline" appearance="spinner" /> Loading patient list...
    </div>
    <div>
      <Loader type="inline" appearance="spinner" /> Fetching appointments
    </div>
    <div>
      <Loader type="inline" appearance="spinner" /> Generating invoice
    </div>
  </div>
)

export const Bars = () => (
  <div style={col}>
    <Loader type="inline" appearance="bar" text="Uploading lab report" />
    <Loader type="inline" appearance="bar" text="Syncing patient records" />
  </div>
)
