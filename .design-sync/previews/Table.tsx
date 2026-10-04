import * as React from 'react'
import { Table } from '@applique-ui/uikit'

const appointments = [
  {
    id: 1,
    patient: 'Aarav Sharma',
    doctor: 'Dr. Mehta',
    time: '09:30',
    status: 'Confirmed',
    fee: 500,
  },
  {
    id: 2,
    patient: 'Priya Das',
    doctor: 'Dr. Mehta',
    time: '10:00',
    status: 'Waiting',
    fee: 500,
  },
  {
    id: 3,
    patient: 'Rohan Gupta',
    doctor: 'Dr. Iyer',
    time: '10:30',
    status: 'Confirmed',
    fee: 800,
  },
  {
    id: 4,
    patient: 'Sunita Verma',
    doctor: 'Dr. Iyer',
    time: '11:15',
    status: 'Cancelled',
    fee: 0,
  },
]

export const Basic = () => (
  <Table data={appointments}>
    <Table.Column label="Patient" key="patient" />
    <Table.Column label="Doctor" key="doctor" />
    <Table.Column label="Time" key="time" />
    <Table.Column label="Status" key="status" />
  </Table>
)

export const Striped = () => (
  <Table data={appointments} appearance="striped">
    <Table.Column label="Patient" key="patient" />
    <Table.Column label="Time" key="time" />
    <Table.Column
      label="Fee"
      key="fee"
      accessor={({ fee }: any) => '₹' + fee}
    />
  </Table>
)

export const GroupedColumns = () => (
  <Table data={appointments}>
    <Table.Column label="Patient" key="patient" />
    <Table.Column label="Visit" key="visit">
      <Table.Column label="Doctor" key="doctor" />
      <Table.Column label="Time" key="time" />
    </Table.Column>
    <Table.Column label="Status" key="status">
      {({ data }: any) => <strong>{data.status}</strong>}
    </Table.Column>
  </Table>
)
