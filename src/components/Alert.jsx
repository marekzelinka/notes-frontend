import PropTypes from 'prop-types'

export function Alert({ message }) {
  if (!message) {
    return null
  }

  return <div className="error">{message}</div>
}
Alert.propTypes = {
  message: PropTypes.string,
}
