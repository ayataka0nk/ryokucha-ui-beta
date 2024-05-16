import { useState } from 'react'
import { TimeField } from '../../lib/components/TimePicker/TimeField'
import { Button } from '../../lib/main'

export const TimePickers = () => {
  const [value, setValue] = useState('')
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e)
    setValue(e.target.value)
  }

  return (
    <div>
      <h1>TimePicker</h1>
      <div className="mt-4">
        <h2>Uncontrolled Time Field</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            const form = new FormData(e.currentTarget)
            const value = form.get('sample')
            console.log(value)
          }}
        >
          <TimeField label="uncontrolled" name="sample" />
          <Button type="submit">submit</Button>
        </form>
      </div>
      <div className="mt-4">
        <h2>Controlled Time Field</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            const form = new FormData(e.currentTarget)
            const value = form.get('sample2')
            console.log(value)
          }}
        >
          <TimeField
            label="controlled"
            name="sample2"
            value={value}
            onChange={handleChange}
          />
          <input type="text" value={value} onChange={handleChange} />
          <Button type="submit">button</Button>
        </form>
      </div>
      <div className="mt-4">
        <h2>Outlined Time Field</h2>
        <TimeField variant="outlined" label="uncontrolled" name="sample" />
      </div>
    </div>
  )
}
