function ErrorState({ title = 'Error', message, onRetry }) {
  return (
    <div style={{ padding: 16 }}>
      <h2>{title}</h2>
      <div style={{ marginTop: 12, padding: 12, border: '1px solid #ddd', borderRadius: 8 }}>
        <p style={{ margin: 0 }}>{message}</p>
        {onRetry && (
          <button style={{ marginTop: 10 }} onClick={onRetry}>
            Retry
          </button>
        )}
      </div>
    </div>
  )
}

export default ErrorState
