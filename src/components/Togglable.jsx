import PropTypes from 'prop-types'
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
        <div style={showWhenVisible} data-testid="togglable-content">
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
Togglable.propTypes = {
  defaultVisible: PropTypes.bool,
  openButtonLabel: PropTypes.string,
  closeButtonLabel: PropTypes.string,
}
