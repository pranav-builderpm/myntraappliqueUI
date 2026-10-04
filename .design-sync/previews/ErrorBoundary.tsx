import * as React from 'react'
import { ErrorBoundary, Banner } from '@applique-ui/uikit'

const box = { padding: 16, width: 460 }

const Healthy = () => <div>Today: 12 patients in the queue, 3 walk-ins.</div>

// Throws on render because no patient is passed.
const Broken = ({ patient }: any) => <div>{patient.name}</div>

export const WithHealthyChild = () => (
  <div style={box}>
    <ErrorBoundary>
      <Healthy />
    </ErrorBoundary>
  </div>
)

export const WithFallback = () => (
  <div style={box}>
    <ErrorBoundary
      onErrorCatch={() => {}}
      renderFallback={() => (
        <Banner color="error" title="Something went wrong">
          Patient card could not be displayed.
        </Banner>
      )}
    >
      <Broken />
    </ErrorBoundary>
  </div>
)
