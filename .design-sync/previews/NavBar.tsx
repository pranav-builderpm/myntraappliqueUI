import * as React from 'react'
import {
  NavBar,
  Bell,
  BoxSolid,
  CalendarDay,
  UserSolid,
  ClockRegular,
} from '@applique-ui/uikit'

const Demo = ({ theme }: any) => {
  const [path, setPath] = React.useState('/appointments')
  const item = (to: string, icon: any, label: string, extra: any = {}) => (
    <NavBar.Item to={to} icon={icon} onClick={() => setPath(to)} {...extra}>
      {label}
    </NavBar.Item>
  )
  return (
    <div
      style={{
        position: 'relative',
        width: 360,
        height: 420,
        overflow: 'hidden',
      }}
    >
      <NavBar
        title="Doctor OS Reception"
        currentPath={path}
        needOverlay={false}
        isOpen
        theme={theme}
        renderLink={({ children }: any) => children}
      >
        {item('/appointments', CalendarDay, 'Appointments', {
          showUpdateBadge: true,
        })}
        {item('/patients', UserSolid, 'Patients')}
        <NavBar.Group title="Billing" icon={BoxSolid}>
          {item('/invoices', BoxSolid, 'Invoices')}
          {item('/reminders', Bell, 'Reminders')}
        </NavBar.Group>
        {item('/history', ClockRegular, 'Visit history')}
      </NavBar>
    </div>
  )
}

export const Light = () => <Demo theme="light" />
export const Dark = () => <Demo theme="dark" />
