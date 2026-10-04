import * as React from 'react'
import { Pagination } from '@applique-ui/uikit'

const Demo = (props: any) => {
  const [s, setS] = React.useState({
    page: props.page || 1,
    size: props.size || 10,
  })
  return (
    <div style={{ padding: 16, width: 640 }}>
      <Pagination
        {...props}
        page={s.page}
        size={s.size}
        onChange={(p: any) => setS(p)}
      />
    </div>
  )
}

export const Default = () => <Demo total={248} sizes={[10, 20, 50]} />
export const MiddlePage = () => (
  <Demo total={248} page={5} size={20} sizes={[10, 20, 50]} />
)
export const Compact = () => <Demo total={64} hideSize pageInputDisabled />
