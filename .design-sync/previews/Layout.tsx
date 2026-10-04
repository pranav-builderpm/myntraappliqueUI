import * as React from 'react'
import { Layout } from '@applique-ui/uikit'

const box = {
  background: '#e8eef7',
  padding: 12,
  borderRadius: 4,
  fontSize: 13,
}
const wrap = { padding: 16 }

export const Stack = () => (
  <div style={wrap}>
    <Layout type="stack">
      <div style={box}>09:00 Ananya Sharma</div>
      <div style={box}>09:30 Vikram Rao</div>
      <div style={box}>10:00 Meera Iyer</div>
    </Layout>
  </div>
)

export const Row = () => (
  <div style={wrap}>
    <Layout type="row" space={[1, 2, 1]} gutter="large">
      <div style={box}>Waiting (1)</div>
      <div style={box}>In consultation (2)</div>
      <div style={box}>Completed (1)</div>
    </Layout>
  </div>
)

export const Gutters = () => (
  <div style={wrap}>
    <Layout type="row" gutter="small">
      <div style={box}>Small</div>
      <div style={box}>gutter</div>
    </Layout>
    <div style={{ height: 12 }} />
    <Layout type="row" gutter="xxl">
      <div style={box}>Extra large</div>
      <div style={box}>gutter</div>
    </Layout>
  </div>
)
