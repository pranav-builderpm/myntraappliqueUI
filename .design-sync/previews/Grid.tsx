import * as React from 'react'
import { Grid } from '@applique-ui/uikit'

const box = {
  background: '#e8eef7',
  padding: 12,
  borderRadius: 4,
  textAlign: 'center' as const,
  fontSize: 13,
}
const wrap = { padding: 16 }

export const Default = () => (
  <div style={wrap}>
    <Grid>
      <Grid.Column>
        <div style={box}>Patients</div>
      </Grid.Column>
      <Grid.Column>
        <div style={box}>Appointments</div>
      </Grid.Column>
      <Grid.Column>
        <div style={box}>Billing</div>
      </Grid.Column>
    </Grid>
  </div>
)

export const ColumnSizes = () => (
  <div style={wrap}>
    <Grid>
      <Grid.Column size={8}>
        <div style={box}>Schedule (8)</div>
      </Grid.Column>
      <Grid.Column size={4}>
        <div style={box}>Doctor info (4)</div>
      </Grid.Column>
    </Grid>
    <div style={{ height: 12 }} />
    <Grid>
      <Grid.Column size={4} offset={2}>
        <div style={box}>Offset 2, size 4</div>
      </Grid.Column>
      <Grid.Column size={6}>
        <div style={box}>Size 6</div>
      </Grid.Column>
    </Grid>
  </div>
)

export const GapsAndCentering = () => (
  <div style={wrap}>
    <Grid gap="large">
      <Grid.Column size={3}>
        <div style={box}>Large gap A</div>
      </Grid.Column>
      <Grid.Column size={3}>
        <div style={box}>Large gap B</div>
      </Grid.Column>
    </Grid>
    <div style={{ height: 12 }} />
    <Grid gapless hcentered>
      <Grid.Column size={3}>
        <div style={box}>Gapless</div>
      </Grid.Column>
      <Grid.Column size={3}>
        <div style={box}>Centered</div>
      </Grid.Column>
    </Grid>
  </div>
)
