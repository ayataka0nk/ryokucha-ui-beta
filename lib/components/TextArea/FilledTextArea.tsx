import {
  FormEventHandler,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef
} from 'react'
import { TextAreaProps } from './type'
import { Icon, IconType } from '../Icon'

export const FilledTextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    { id, label, icon, error, supportingText, className, ...props },
    forwardedRef
  ) => {
    const labelStyles = getLabelStyles(icon, error)
    const inputStyles = getInputStyles(icon, error, true)
    const supportingTextStyles = getSupportingTextStyles(error)
    const inputWrapper = getInputWrapperStyles()
    const ref = useRef<HTMLTextAreaElement>(null)
    useImperativeHandle(forwardedRef, () => ref.current as HTMLTextAreaElement)
    const autoresize: FormEventHandler<HTMLTextAreaElement> = useCallback(
      (event) => {
        const textarea = event.target as HTMLTextAreaElement
        textarea.style.height = 'auto'
        textarea.style.height = `${textarea.scrollHeight}px`
      },
      []
    )

    useEffect(() => {
      const textarea = ref.current as HTMLTextAreaElement
      textarea.style.height = 'auto'
      textarea.style.height = `${textarea.scrollHeight}px`
    }, [props.defaultValue])

    return (
      <div className={`relative ${className}`}>
        {icon && (
          <Icon
            variant="outline"
            type={icon}
            className="absolute left-4 top-4 w-6 h-6 z-[1] text-on-surface-variant pointer-events-none"
          />
        )}
        <div className={inputWrapper}>
          <textarea
            ref={ref}
            id={id}
            className={inputStyles}
            placeholder=""
            rows={1}
            onInput={autoresize}
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

const getLabelStyles = (icon?: IconType, error?: string) => {
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
    'text-xs',
    // フォーカス
    'peer-focus:top-2',
    'peer-focus:text-xs'
  ]
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
      'text-error',
      // フォーカス
      'peer-focus:text-error'
    ]
  } else {
    styles = [
      ...styles,
      // 入力値無し
      'peer-placeholder-shown:text-on-surface-variant',
      // 入力値あり
      'text-on-surface-variant',
      // フォーカス
      'peer-focus:text-primary'
    ]
  }
  return styles.join(' ')
}

const getInputStyles = (
  icon?: IconType,
  error?: string,
  multiline?: boolean
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
    'bg-surface-container-highest',
    'outline-none',
    'placeholder-transparent',
    'shadow-underline-thin',
    'focus:shadow-underline-thick',
    'line-height-0',
    'cursor-pointer'
  ]
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
  if (multiline) {
    styles.push('resize-none')
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
