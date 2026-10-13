function Button({ children, type = 'button', variant = 'primary', onClick }) {
  return (
    <button type={type} className={`button ${variant}`} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
