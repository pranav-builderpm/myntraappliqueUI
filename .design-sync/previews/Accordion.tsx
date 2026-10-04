import * as React from 'react'
import { Accordion, Text } from '@applique-ui/uikit'

const box = { padding: 16, width: 420 }
const pad = { padding: '8px 16px 16px' }

export const Default = () => (
  <div style={box}>
    <Accordion>
      <Accordion.Item title="Patient details">
        <div style={pad}>
          <Text.P>Ananya Iyer, 34, F. Registered 12 Mar 2024.</Text.P>
        </div>
      </Accordion.Item>
      <Accordion.Item title="Upcoming appointments">
        <div style={pad}>
          <Text.P>Dr. Mehta, 10:30 AM, General consultation.</Text.P>
        </div>
      </Accordion.Item>
      <Accordion.Item title="Billing">
        <div style={pad}>
          <Text.P>Consultation fee ₹600. Lab charges ₹1,250.</Text.P>
        </div>
      </Accordion.Item>
    </Accordion>
  </div>
)

const Controlled = () => {
  const [active, setActive] = React.useState(0)
  return (
    <div style={box}>
      <Text.Caption>Last opened section index: {active}</Text.Caption>
      <Accordion active={active} onChange={(index: number) => setActive(index)}>
        <Accordion.Item title="Prescriptions">
          <div style={pad}>
            <Text.P>Paracetamol 500 mg, twice daily for 3 days.</Text.P>
          </div>
        </Accordion.Item>
        <Accordion.Item title="Lab reports">
          <div style={pad}>
            <Text.P>CBC and lipid profile ready for review.</Text.P>
          </div>
        </Accordion.Item>
      </Accordion>
    </div>
  )
}
export const WithOnChange = () => <Controlled />
