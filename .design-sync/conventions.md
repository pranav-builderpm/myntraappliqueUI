# Appliqué UIKit — conventions for building with this design system

Everything is exposed on `window.Applique` (React components + 32 icon components). Load `styles.css` (it pulls in the base styles, the component styles and the Roboto / Noto Sans Devanagari / Noto Sans Bengali web fonts) and `_ds_bundle.js`, then render with React.

## Setup
- **No provider needed.** `ThemeProvider` exists but is a pass-through; wrapping is optional. Components inject their own CSS when the bundle loads.
- The bundle ships with React 18 for previews; the library itself is class-based React 16 code, so React warnings such as `defaultProps` / `findDOMNode` in the console are expected and harmless.
- Product context: a mobile-first clinic reception app (design at 360 × 800 first, desktop second). Keep tap targets large and copy short.

## Styling idiom: props, not classes
- **There are no utility classes and no CSS custom properties in this system.** Internal class names (`aui-<component>-<name>`) are not API — never write or invent class names, and never reference `var(--…)` tokens.
- The design language lives in props: `Button type="primary|secondary|tertiary|link|text"` and `size="xs|small|regular|large"`; `Text color="primary|success|warning|error|dark|light|gray"`, `emphasis="high|medium|disabled"`, `weight="bolder|lighter"`; `Grid gap="none|xx-small|x-small|small|base|large"`; `Layout gutter="none|small|medium|large|xl|xxl|xxxl"`.
- For layout glue use `Grid`/`Grid.Column`, `Layout`, `Section`, `Page`; for anything else a plain inline `style`.
- `Layout type="row"` gives each child its own row; `type="stack"` lays children out inline.

## Compound components (use exactly these members)
`Accordion.Item` · `BreadCrumb.Item` · `Form.Text/Select/Date/Number/Checkbox/Masked/Radio/TextArea/File/Action` · `Grid.Column` · `Modal.Layout` · `NavBar.Group/Item` · `Progress.Bar/Circle` · `Stepper.Step/SmallStep` · `Table.Column/Row/Filter` · `Tabs.Tab` · `Text.Title/H1/H2/H3/H4/Body/P/Caption` · `TopBar.Item`. `Alert`, `Tag`, `T`, `InputSwitch` are aliases of `Banner`, `Badge`, `Text`, `InputCheckbox` (`InputSwitch` renders as a checkbox).

## Icons
Icons are components passed to `icon` props (`<Button icon={Bell}>`). Only these exist: AtSolid, BarsSolid, Bell, BoxSolid, CalendarDay, CheckCircleSolid, CheckSolid, ChevronDownSolid, ChevronLeftSolid, ChevronRightSolid, ChevronUpSolid, ClockRegular, ClockSolid, CopyRegular, EllipsisVSolid, ExclamationCircleSolid, ExclamationTriangleSolid, FileAltSolid, InfoCircleSolid, PlaySolid, SignInAltSolid, SignOutAltSolid, SortDownSolid, SortSolid, SortUpSolid, SpinnerSolid, SyncSolid, TimesSolid, UserCircleSolid, UserSolid.

## Gotchas
- Inputs are controlled: pass `value` + `onChange`.
- `InputDate` / `Form.Date`: pass `Date` objects (ranges as `{ from, to }` with `range`). Custom format strings use date-fns tokens (`yyyy`, `dd`), never `YYYY`/`DD`, and an invalid format throws.
- `Dropdown`, `Tooltip` and `Fab` open on interaction; give them room (a container with height) so the open panel is visible. `Modal` renders through a Portal.
- Tables need `data` plus `Table.Column key="…"` children; `accessor` or a child function renders custom cells.

## Where the truth lives
Read `README.md`, then per component `components/<group>/<Name>/<Name>.d.ts` (typed props with docs) and `<Name>.prompt.md`; each `<Name>.html` is a verified, working composition to copy from.

## Example
```jsx
const { Section, Form, Banner } = window.Applique;

function BillingCard() {
  const [value, setValue] = React.useState({ name: 'Arjun Nair', fee: 800 });
  return (
    <Section>
      <Banner>Fee of ₹800 is yet to be collected.</Banner>
      <Form title="Billing" value={value} onChange={setValue} defaultFieldSize={6} actions="right">
        <Form.Text name="name" label="Patient name" />
        <Form.Number name="fee" label="Consultation fee (₹)" />
        <Form.Action type="primary" htmlType="submit">Save</Form.Action>
      </Form>
    </Section>
  );
}
```
