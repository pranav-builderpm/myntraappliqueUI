import * as React from 'react'
import { Stepper } from '@applique-ui/uikit'

const box = { padding: 16 }

export const Horizontal = () => (
  <div style={{ ...box, width: 640 }}>
    <Stepper orientation="horizontal">
      <Stepper.Step
        label="Registered"
        description="12 May; 09:10 AM"
        completed
      />
      <Stepper.Step
        label="Vitals taken"
        description="12 May; 09:25 AM"
        completed
      />
      <Stepper.Step label="Consultation" description="12 May; 09:40 AM" />
      <Stepper.Step label="Payment" />
    </Stepper>
  </div>
)

export const Vertical = () => (
  <div style={box}>
    <Stepper orientation="vertical">
      <Stepper.Step label="Booked" description="10 May; 04:00 PM" completed />
      <Stepper.Step
        label="Reminder sent"
        description="11 May; 08:00 AM"
        completed
      />
      <Stepper.Step label="Check-in" description="12 May; 09:00 AM" />
      <Stepper.Step label="Consultation" />
    </Stepper>
  </div>
)

export const WithErrorAndSmallSteps = () => (
  <div style={box}>
    <Stepper orientation="vertical">
      <Stepper.Step label="Lab order" description="12 May; 10:00 AM" completed>
        <Stepper.SmallStep
          label="Blood sample"
          description="12 May; 10:10 AM"
          showLabel
        />
        <Stepper.SmallStep
          label="Urine sample"
          description="12 May; 10:15 AM"
        />
      </Stepper.Step>
      <Stepper.Step label="Report upload" error />
      <Stepper.Step label="Doctor review" />
    </Stepper>
  </div>
)
