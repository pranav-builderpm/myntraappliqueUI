import * as React from 'react'
import { Banner } from '@applique-ui/uikit'

const col = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: 12,
  padding: 16,
  width: 520,
}

export const Colors = () => (
  <div style={col}>
    <Banner color="success">
      Appointment confirmed for Anita Deshmukh at 10:30 AM.
    </Banner>
    <Banner color="info">Dr. Rao is running 15 minutes late today.</Banner>
    <Banner color="warning">
      Payment of ₹1,200 is pending for Ravi Kumar.
    </Banner>
    <Banner color="error">Could not send SMS reminder to 98xxxxxx10.</Banner>
  </div>
)

export const WithTitleAndLink = () => (
  <div style={col}>
    <Banner
      color="warning"
      title="Insurance expired"
      link={{ href: '#', displayText: 'Update policy' }}
    >
      The policy on file for Meera Shah expired on 31 March.
    </Banner>
  </div>
)

export const Dismissible = () => {
  const [open, setOpen] = React.useState(true)
  return (
    <div style={col}>
      {open ? (
        <Banner color="info" onClose={() => setOpen(false)}>
          3 patients are waiting in the lobby.
        </Banner>
      ) : (
        <span>Dismissed</span>
      )}
    </div>
  )
}

export const NoIcon = () => (
  <div style={col}>
    <Banner color="info" icon={null}>
      Clinic closed on Sunday, 12 May.
    </Banner>
  </div>
)
