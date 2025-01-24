import React, { forwardRef } from 'react'
import { CalendarIcon } from '@sanity/icons'
import { Box, TextInput } from '@sanity/ui'
import { useCallback } from 'react'
import { set, unset } from 'sanity'

interface CustomDateInputProps {
  value?: string
  onChange: (patch: ReturnType<typeof set> | ReturnType<typeof unset>) => void
}

export const CustomDateInput = forwardRef<HTMLInputElement, CustomDateInputProps>((props, ref) => {
  const { value, onChange } = props

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const nextValue = event.target.value
      onChange(nextValue ? set(nextValue) : unset())
    },
    [onChange]
  )

  return (
    <Box>
      <TextInput
        ref={ref}
        icon={CalendarIcon}
        type="date"
        value={value || ''}
        onChange={handleChange}
      />
    </Box>
  )
})

CustomDateInput.displayName = 'CustomDateInput'
