import * as React from 'react'
import {
  Page,
  NavBar,
  TopBar,
  Section,
  InfoCircleSolid,
  Bell,
} from '@applique-ui/uikit'

const box = {
  background: '#e8eef7',
  padding: 12,
  borderRadius: 4,
  fontSize: 13,
}

const topBar = () => (
  <TopBar title="Reception" user={{ email: 'reception@sunrisedental.in' }}>
    <TopBar.Item>Profile</TopBar.Item>
    <TopBar.Item>Logout</TopBar.Item>
  </TopBar>
)

const navBar = () => (
  <NavBar title="Sunrise Clinic">
    <NavBar.Item icon={InfoCircleSolid}>Appointments</NavBar.Item>
    <NavBar.Item icon={Bell}>Reminders</NavBar.Item>
  </NavBar>
)

export const Default = () => (
  <div style={{ height: 360, position: 'relative', overflow: 'hidden' }}>
    <Page renderTopBar={topBar}>
      <Section title="Today's appointments">
        <div style={box}>Ananya Sharma, 09:00, Dr. Priya Nair</div>
      </Section>
    </Page>
  </div>
)

export const WithNavBar = () => (
  <div style={{ height: 360, position: 'relative', overflow: 'hidden' }}>
    <Page renderNavBar={navBar} renderTopBar={topBar}>
      <Section title="Fee collection">
        <div style={box}>Collected today: ₹24,500</div>
      </Section>
    </Page>
  </div>
)
