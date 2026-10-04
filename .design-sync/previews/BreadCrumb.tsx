import * as React from 'react'
import { BreadCrumb } from '@applique-ui/uikit'

const box = { padding: 16 }

export const Default = () => (
  <div style={box}>
    <BreadCrumb>
      <BreadCrumb.Item>
        <a href="#">Home</a>
      </BreadCrumb.Item>
      <BreadCrumb.Item>
        <a href="#">Patients</a>
      </BreadCrumb.Item>
      <BreadCrumb.Item>
        <a>Anita Deshmukh</a>
      </BreadCrumb.Item>
    </BreadCrumb>
  </div>
)

export const Deep = () => (
  <div style={box}>
    <BreadCrumb>
      <BreadCrumb.Item>
        <a href="#">Dashboard</a>
      </BreadCrumb.Item>
      <BreadCrumb.Item>
        <a href="#">Appointments</a>
      </BreadCrumb.Item>
      <BreadCrumb.Item>
        <a href="#">Dr. Rao</a>
      </BreadCrumb.Item>
      <BreadCrumb.Item>
        <a href="#">Follow-up</a>
      </BreadCrumb.Item>
      <BreadCrumb.Item>
        <a>Reschedule</a>
      </BreadCrumb.Item>
    </BreadCrumb>
  </div>
)
