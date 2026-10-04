import * as React from 'react'
import { Portal, Text } from '@applique-ui/uikit'

// Portal appends its content to document.body, outside the preview's React root.
export const Default = () => (
  <div style={{ padding: 16 }}>
    <Text.P>
      This text is rendered in place. The banner below is rendered through
      Portal into the page body.
    </Text.P>
    <Portal>
      <div
        style={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          padding: '12px 16px',
          background: '#111827',
          color: '#fff',
          borderRadius: 8,
        }}
      >
        Reminder sent to Rahul Verma for 4:00 PM
      </div>
    </Portal>
  </div>
)
