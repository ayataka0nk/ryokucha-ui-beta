import { useRef } from 'react'
import { SearchFieldDefault } from '../../lib/templates/Search/SearchFieldDefault'
import { useSearchFieldDefaultState } from '../../lib/templates/Search/hooks'

export const SearchFieldPage = () => {
  const handleMenuClick = () => {
    console.log('menu clicked')
  }

  const ref = useRef<HTMLFormElement>(null)
  const {
    wrapperRef,
    inputRef,
    buttonRef,
    searchedValue,
    value,
    isViewOpen,
    history,
    handleClearClick,
    handleBackClick,
    handleInputValueItemClick,
    handleHistoryItemClick,
    handleFocus,
    handleChange,
    handleClick
  } = useSearchFieldDefaultState({
    historyKey: 'sample',
    searchedValue: 'searched value'
  })

  return (
    <div>
      <form ref={ref}>
        <SearchFieldDefault
          name="keyword"
          placeholder="hoge"
          bg="surface-container-highest"
          wrapperRef={wrapperRef}
          inputRef={inputRef}
          buttonRef={buttonRef}
          searchedValue={searchedValue}
          value={value}
          docked="md"
          isViewOpen={isViewOpen}
          history={history}
          onMenuClick={handleMenuClick}
          onClearClick={handleClearClick}
          onBackClick={handleBackClick}
          onInputValueItemClick={handleInputValueItemClick}
          onHistoryItemClick={handleHistoryItemClick}
          onFocus={handleFocus}
          onChange={handleChange}
          onClick={handleClick}
        />
      </form>
    </div>
  )
}
