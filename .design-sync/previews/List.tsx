import * as React from 'react'
import { List, Text } from '@applique-ui/uikit'

const patients = [
  'Ananya Iyer',
  'Rahul Verma',
  'Priya Nair',
  'Imran Sheikh',
  'Kavita Rao',
]
const box = { padding: 16, width: 320 }

export const Default = () => (
  <div style={box}>
    <List items={patients}>{({ item }: any) => <Text>{item}</Text>}</List>
  </div>
)

const Single = () => {
  const [value, setValue] = React.useState<any>('Priya Nair')
  return (
    <div style={box}>
      <List items={patients} value={value} onChange={setValue}>
        {({ item }: any) => <Text>{item}</Text>}
      </List>
    </div>
  )
}
export const SingleSelect = () => <Single />

const Multi = () => {
  const [value, setValue] = React.useState<any>(['Ananya Iyer', 'Imran Sheikh'])
  return (
    <div style={box}>
      <List
        multiple
        items={patients}
        value={value}
        onChange={setValue}
        isItemDisabled={(p: string) => p === 'Kavita Rao'}
      >
        {({ item }: any) => <Text>{item}</Text>}
      </List>
    </div>
  )
}
export const MultiSelect = () => <Multi />
