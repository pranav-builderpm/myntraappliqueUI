import * as React from 'react'
import { Measure, Text } from '@applique-ui/uikit'

export const Default = () => (
  <div style={{ padding: 16, width: 380 }}>
    <Measure>
      {({ ref, content }: any) => (
        <div
          ref={ref}
          style={{ padding: 16, border: '1px dashed #6b7280', borderRadius: 8 }}
        >
          <Text.H4>Waiting room status</Text.H4>
          <Text.P>6 patients waiting, average wait 18 minutes.</Text.P>
          <Text color="dark">
            Measured: {Math.round(content?.bounds?.width ?? 0)} x{' '}
            {Math.round(content?.bounds?.height ?? 0)} px
          </Text>
        </div>
      )}
    </Measure>
  </div>
)
