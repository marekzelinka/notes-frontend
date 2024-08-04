import { forwardRef, useImperativeHandle, useState } from 'react'

export const Togglable = forwardRef(
  (
    {
      defaultVisible = false,
      openButtonLabel = 'open',
      closeButtonLabel = 'cancel',
      children,
    },
    ref,
  ) => {
    const [visible, setVisible] = useState(defaultVisible)

    const hideWhenVisible = { display: visible ? 'none' : undefined }
    const showWhenVisible = { display: visible ? undefined : 'none' }

    const toggleVisiblity = () => {
      setVisible((visible) => !visible)
    }

    useImperativeHandle(ref, () => {
      return {
        toggleVisiblity,
      }
    })

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
  },
)
Togglable.displayName = 'Togglable'
