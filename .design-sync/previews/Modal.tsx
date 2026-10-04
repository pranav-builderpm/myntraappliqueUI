import * as React from 'react'
import { Modal, Button } from '@applique-ui/uikit'

// Modal renders through a Portal, so the card layout (Modal.Layout) is shown standalone.
const Wrap = ({ children }: any) => (
  <div
    style={{
      position: 'relative',
      minHeight: 320,
      padding: 16,
      display: 'flex',
      justifyContent: 'center',
    }}
  >
    {children}
  </div>
)

export const Confirm = () => (
  <Wrap>
    <Modal.Layout
      title="Cancel appointment?"
      actions={
        <>
          <Button type="text">Keep</Button>
          <Button type="primary">Cancel appointment</Button>
        </>
      }
    >
      <p>
        Anita Deshmukh's visit with Dr. Rao on 12 May, 10:30 AM will be
        cancelled and a refund of ₹600 initiated.
      </p>
    </Modal.Layout>
  </Wrap>
)

export const ContentOnly = () => (
  <Wrap>
    <Modal.Layout title="Visit summary">
      <p>Diagnosis: seasonal flu. Follow-up in 5 days. Fee collected: ₹800.</p>
    </Modal.Layout>
  </Wrap>
)
