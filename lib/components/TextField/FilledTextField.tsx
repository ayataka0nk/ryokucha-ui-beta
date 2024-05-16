import { TextFieldProps } from './type'
import { Icon, IconType } from '../Icon'
import { forwardRef } from 'react'
import { getBackgroundStyle } from '../BackgroundColor'

export const FilledTextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      id,
      label,
      icon,
      error,
      supportingText,
      readOnly = false,
      className,
      bg = 'surface-container-highest',
      ...props
    },
    ref
  ) => {
    const labelStyles = getLabelStyles(icon, error, readOnly)
    const iconStyle = getIconStyle(error)
    const inputStyles = getInputStyles(icon, error, readOnly)
    const supportingTextStyles = getSupportingTextStyles(error)
    const inputWrapper = getInputWrapperStyles()
    const bgStyle = getBackgroundStyle(bg)
    return (
      <div className={`relative ${className}`}>
        {icon && <Icon variant="outline" type={icon} className={iconStyle} />}

        <div className={inputWrapper}>
          <input
            ref={ref}
            id={id}
            className={`${inputStyles} ${bgStyle}`}
            placeholder=""
            readOnly={readOnly}
            {...props}
          />
          {label && (
            <label htmlFor={id} className={labelStyles}>
              {label}
            </label>
          )}
        </div>
        <p className={supportingTextStyles}>
          {supportingText && supportingText} {error && error}
        </p>
      </div>
    )
  }
)

const getIconStyle = (error?: string) => {
  let styles = [
    'absolute',
    'left-4',
    'top-4',
    'w-6',
    'h-6',
    'z-[1]',

    'pointer-events-none'
  ]
  if (error) {
    styles = [...styles, 'text-error']
  } else {
    styles = [...styles, 'text-on-surface-variant']
  }
  return styles.join(' ')
}

const getLabelStyles = (
  icon?: IconType,
  error?: string,
  readOnly?: boolean
) => {
  let styles = [
    // 共通
    'absolute',
    'cursor-pointer',
    'pointer-events-none',
    // 入力値無し
    'peer-placeholder-shown:top-3.5',
    'peer-placeholder-shown:text-lg',
    // 入力値あり
    'top-2',
    'text-xs'
  ]
  if (!readOnly) {
    styles = [
      ...styles,
      // フォーカス
      'peer-focus:top-2',
      'peer-focus:text-xs'
    ]
  }

  if (icon) {
    styles = [
      ...styles,
      // 入力値無し
      'peer-placeholder-shown:left-13',
      // 入力値あり
      'left-13'
    ]
  } else {
    styles = [
      ...styles,
      // 入力値無し
      'peer-placeholder-shown:left-4',
      // 入力値あり
      'left-4'
    ]
  }

  if (error) {
    styles = [
      ...styles,
      // 入力値無し
      'peer-placeholder-shown:text-error',
      // 入力値あり
      'text-error'
    ]
    if (!readOnly) {
      styles = [
        ...styles,
        // フォーカス
        'peer-focus:text-error'
      ]
    }
  } else {
    styles = [
      ...styles,
      // 入力値無し
      'peer-placeholder-shown:text-on-surface-variant',
      // 入力値あり
      'text-on-surface-variant'
    ]
    if (!readOnly) {
      styles = [
        ...styles,
        // フォーカス
        'peer-focus:text-primary'
      ]
    }
  }

  return styles.join(' ')
}

const getInputStyles = (
  icon?: IconType,
  error?: string,
  readOnly?: boolean
) => {
  let styles = [
    // 共通
    'peer',
    'w-full',
    'block',
    'pr-4',
    'pt-6',
    'pb-2',
    'rounded-t',
    'outline-none',
    'placeholder-transparent',
    'shadow-underline-thin',
    'line-height-0',
    'cursor-pointer'
  ]
  if (!readOnly) {
    styles = [
      ...styles,
      // フォーカス
      'focus:shadow-underline-thick'
    ]
  }
  if (error) {
    styles = [
      ...styles,
      // エラーあり
      'shadow-error',
      'focus:shadow-error'
    ]
  } else {
    styles = [
      ...styles,
      // エラーなし
      'shadow-primary',
      'focus:shadow-primary'
    ]
  }

  if (icon) {
    styles.push('pl-13')
  } else {
    styles.push('pl-4')
  }

  return styles.join(' ')
}

const getSupportingTextStyles = (error?: string) => {
  const styles = [
    // 共通
    'text-xs',
    'mt-1',
    'leading-none',
    'pl-4',
    'h-4'
  ]

  if (error) {
    styles.push('text-error')
  } else {
    styles.push('text-on-surface-variant')
  }
  return styles.join(' ')
}

const getInputWrapperStyles = () => {
  return 'hover:after:full-width relative hover:after:pointer-events-none hover:after:absolute hover:after:inset-0 hover:after:bg-on-surface hover:after:opacity-8'
}
