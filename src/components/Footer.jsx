import { Link } from 'react-router-dom'
import logo from "../assets/plateshare_logo.png";


function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="px-4 py-6 bg-[#16a34a1a]">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-5 md:grid-cols-5">
          <div className="md:col-span-2">

            <div className='flex items-center '>
              <img src={logo} alt="plateshare logo" className='w-10 h-10' />
              <Link to='/' className='nav-logo text-3xl text-brand-gradient font-extrabold'>
                PlateShare
              </Link>
            </div>

            <p className="mt-1 max-w-md text-sm text-[var(--text-soft)] mb-6">
              Turn surplus into support. Share extra food with your community and reduce waste with request-based pickup.
            </p>

            <div className="mt-1 text-sm leading-none text-[var(--text-soft)]">
              Whatsapp: +880 1909912507
            </div>
            <div className="text-sm leading-none text-[var(--text-soft)]">
              Email: avishek2390@gmail.com
            </div>
          </div>

          <div className="grid gap-0 leading-none">
            <div className="text-sm font-extrabold text-[var(--text)]">Explore</div>
            <Link to="/" className="text-sm leading-none text-[var(--text-soft)] hover:underline">
              Home
            </Link>
            <Link to="/foods" className="text-sm leading-none text-[var(--text-soft)] hover:underline">
              Foods
            </Link>
            <Link to="/add-food" className="text-sm leading-none text-[var(--text-soft)] hover:underline">
              Donate
            </Link>
            <Link to="/my-requests" className="text-sm leading-none text-[var(--text-soft)] hover:underline">
              Requests
            </Link>
            <Link to="/donor-requests" className="text-sm leading-none text-[var(--text-soft)] hover:underline">
              Donation Requests
            </Link>
          </div>

          <div className="grid gap-0 leading-none">
            <div className="text-sm font-extrabold text-[var(--text)]">Support</div>
            <Link to="/about" className="text-sm leading-none text-[var(--text-soft)] hover:underline">
              About
            </Link>
            <Link to="/contact" className="text-sm leading-none text-[var(--text-soft)] hover:underline">
              Contact
            </Link>
            <Link to="/privacy" className="text-sm leading-none text-[var(--text-soft)] hover:underline">
              Privacy
            </Link>
            <Link to="/terms" className="text-sm leading-none text-[var(--text-soft)] hover:underline">
              Terms
            </Link>
          </div>

          <div className="flex gap-3 md:justify-end md:items-start justify-start items-center">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <img
                src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
                alt="facebook"
                className="h-5 w-5 opacity-70 hover:opacity-100 transition"
              />
            </a>

            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/X_logo_2023_original.svg"
                alt="x"
                className="h-5 w-5 opacity-70 hover:opacity-100 transition"
              />
            </a>

            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
                alt="instagram"
                className="h-5 w-5 opacity-70 hover:opacity-100 transition"
              />
            </a>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-2 border-t border-[var(--border)] pt-3 sm:flex-row sm:items-center">
          <div className="text-xs text-[var(--text-soft)]">
            © {year} PlateShare — Empowering communities.
          </div>

          <div className="sm:ml-auto flex flex-wrap gap-3 text-xs">
            <Link to="/privacy" className="text-[var(--text-soft)] hover:underline">
              Privacy
            </Link>
            <Link to="/terms" className="text-[var(--text-soft)] hover:underline">
              Terms
            </Link>
            <a href="mailto:avishek2390@gmail.com" className="text-[var(--text-soft)] hover:underline">
              avishek2390@gmail.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
