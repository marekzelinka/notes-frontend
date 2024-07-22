export function Alert({ message }) {
  if (!message) {
    return null
  }

  return <div className="error">{message}</div>
}
