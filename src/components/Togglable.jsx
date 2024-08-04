import { useState } from 'react'

export function Togglable({
  defaultVisible = false,
  openButtonLabel = 'open',
  closeButtonLabel = 'cancel',
  children,
}) {
  const [visible, setVisible] = useState(defaultVisible)

  const hideWhenVisible = { display: visible ? 'none' : undefined }
  const showWhenVisible = { display: visible ? undefined : 'none' }

  const toggleVisiblity = () => {
    setVisible((visible) => !visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button type="button" onClick={toggleVisiblity}>
          {openButtonLabel}
        </button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button type="button" onClick={toggleVisiblity}>
          {closeButtonLabel}
        </button>
      </div>
    </div>
  )
}
