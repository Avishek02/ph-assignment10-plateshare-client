import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div
      style={{
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        textAlign: 'center'
      }}
    >
      <img
        src='https://i.ibb.co/Y4cX6zyG/404-not-found.jpg'
        alt='Page not found'
        style={{ maxWidth: '320px', width: '100%', marginBottom: '16px' }}
      />
      <h2 className='text-2xl font-bold '>Page not found</h2>
      <p>The page you are looking for does not exist or may have been moved.</p>
      <Link to='/'>
        <button className='bg-[var(--primary)] text-white rounded-full px-4 py-2 font-semibold' style={{ marginTop: 12 }}>Back to Home</button>
      </Link>
    </div>
  )
}

export default NotFound
