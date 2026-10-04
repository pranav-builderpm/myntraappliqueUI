import * as React from 'react'
import { Form } from '@applique-ui/uikit'

const doctors = [
  { value: 'mehta', label: 'Dr. Anita Mehta (Cardiology)' },
  { value: 'iyer', label: 'Dr. Suresh Iyer (Orthopaedics)' },
  { value: 'kapoor', label: 'Dr. Neha Kapoor (Paediatrics)' },
]

export const Default = () => {
  const [name, setName] = React.useState('Ritu Sharma')
  const [doctor, setDoctor] = React.useState<any>('mehta')
  const [date, setDate] = React.useState<any>(new Date(2026, 9, 12))
  return (
    <div style={{ padding: 16 }}>
      <Form title="Book appointment" onSubmit={() => {}}>
        <Form.Text
          label="Patient name"
          value={name}
          onChange={setName}
          description="As on ID card"
        />
        <Form.Select
          label="Doctor"
          options={doctors}
          value={doctor}
          onChange={setDoctor}
        />
        <Form.Date label="Visit date" value={date} onChange={setDate} />
        <Form.Action>Reset</Form.Action>
        <Form.Action type="primary" htmlType="submit">
          Book
        </Form.Action>
      </Form>
    </div>
  )
}

export const SingleValue = () => {
  const [value, setValue] = React.useState<any>({
    name: 'Arjun Nair',
    fee: 800,
  })
  return (
    <div style={{ padding: 16 }}>
      <Form
        title="Billing"
        value={value}
        onChange={setValue}
        defaultFieldSize={6}
        actions="right"
      >
        <Form.Text name="name" label="Patient name" />
        <Form.Number name="fee" label="Consultation fee (₹)" />
        <Form.CheckBox
          name="paid"
          label="Payment"
          title="Collected at reception"
        />
        <Form.Action type="primary" htmlType="submit">
          Save
        </Form.Action>
      </Form>
    </div>
  )
}

export const Disabled = () => (
  <div style={{ padding: 16 }}>
    <Form
      title="Visit summary (locked)"
      disabled
      value={{ name: 'Meera Joshi' }}
    >
      <Form.Text name="name" label="Patient name" />
      <Form.Text name="notes" label="Notes" />
    </Form>
  </div>
)
