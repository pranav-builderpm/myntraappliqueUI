import * as React from 'react'
import {
  TopBar,
  BreadCrumb,
  UserSolid,
  SignOutAltSolid,
} from '@applique-ui/uikit'

const Wrap = ({ children }: any) => (
  <div style={{ position: 'relative', width: 600, minHeight: 80 }}>
    {children}
  </div>
)

export const Default = () => (
  <Wrap>
    <TopBar title="Doctor OS Reception" />
  </Wrap>
)

export const WithUserAndItems = () => (
  <Wrap>
    <TopBar
      title="Doctor OS Reception"
      user={{ name: 'Priya Nair', email: 'priya@clinic.in' }}
    >
      <BreadCrumb>
        <BreadCrumb.Item>Home</BreadCrumb.Item>
        <BreadCrumb.Item>Appointments</BreadCrumb.Item>
        <BreadCrumb.Item>Today</BreadCrumb.Item>
      </BreadCrumb>
      <TopBar.Item icon={UserSolid}>Profile</TopBar.Item>
      <TopBar.Item icon={SignOutAltSolid}>Logout</TopBar.Item>
    </TopBar>
  </Wrap>
)
