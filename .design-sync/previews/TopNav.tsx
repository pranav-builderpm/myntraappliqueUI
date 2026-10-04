import * as React from 'react'
import { TopNav } from '@applique-ui/uikit'

const menu = (id: string, title: string, items: string[]) => ({
  id,
  title,
  type: 'MENU',
  hoverMenuColumnBucket: 0,
  config: items.map((t) => ({
    id: t,
    title: t,
    routingInfo: { path: '/' + t, type: t, meta: {} },
  })),
})

const config: any = {
  navigationConfig: {
    HOME: {
      label: 'Home',
      noHover: true,
      routingInfo: { path: '/Dashboard', type: 'Dashboard/HOME', meta: {} },
    },
    PATIENTS: {
      id: 'PATIENTS',
      label: 'Patients',
      config: [
        menu('REG', 'Registration', ['New patient', 'Patient search']),
        menu('REC', 'Records', ['Prescriptions', 'Lab reports']),
      ],
    },
    BILLING: {
      id: 'BILLING',
      label: 'Billing',
      config: [
        menu('FEES', 'Fees', ['Consultation fee Rs 600', 'Pending invoices']),
      ],
    },
  },
  quickLinks: [
    {
      renderFunction: () => (
        <ul>
          <li>Todays schedule</li>
          <li>Walk-in queue</li>
        </ul>
      ),
    },
  ],
  logo: <div style={{ width: 100, fontWeight: 600 }}>Doctor OS</div>,
  dispatchFunction: () => {},
}

export const Default = () => (
  <div style={{ position: 'relative', width: 900, minHeight: 200 }}>
    <TopNav
      navigationKey="path"
      currentNavigationValue="/Dashboard"
      dispatchFunction={() => {}}
      config={config}
    >
      <div style={{ padding: 16 }}>Reception dashboard content</div>
    </TopNav>
  </div>
)
