import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import api from '../lib/api'

function Home() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['featured-foods'],
    queryFn: async () => {
      const res = await api.get('/foods/featured')
      return res.data
    }
  })

  return (
    <div className=" bg-[var(--bg-main-layout)]">
      <section className="px-4 py-14 ">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
          <div>
            <motion.h1
              className="text-4xl font-extrabold text-[var(--text)]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              Turn surplus into support with{' '}
              <span className="text-[var(--accent)] text-brand-gradient">PlateShare</span>
            </motion.h1>

            <motion.p
              className="mt-4 text-lg text-[var(--text-soft)]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              Share extra food with your community instead of wasting it. Publish donations in minutes
              and let people in need request what they truly need.
            </motion.p>

            <motion.div
              className="mt-6 flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.2 }}
            >
              <Link
                to="/foods"
                className="rounded-3xl bg-[var(--primary)] px-6 py-3 font-bold text-white shadow-[0_14px_26px_rgba(22,163,74,.18)]"
              >
                View All Foods
              </Link>
              <Link
                to="/add-food"
                className="rounded-3xl border bg-white px-6 py-3 font-bold text-[var(--primary)] shadow-[0_10px_24px_rgba(2,6,23,.08)]"
              >
                Donate Food
              </Link>
            </motion.div>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full border border-[var(--border)] bg-white px-4 py-2 text-sm font-semibold text-[var(--text-soft)]">
                No wasted food
              </span>
              <span className="rounded-full border border-[var(--border)] bg-white px-4 py-2 text-sm font-semibold text-[var(--text-soft)]">
                Secure request-based sharing
              </span>
            </div>
          </div>

          <motion.div
            className="p-6 sm:p-10 lg:p-12 border-t lg:border-t-0 "
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >

            <div
              className="rounded-2xl border shadow-sm"
              style={{ borderColor: "#e6f4ea", background: "var(--bg-surface-soft)" }}
            >
              <div className="p-6 space-y-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm font-semibold" style={{ color: "var(--text)" }}>
                      Live Snapshot
                    </div>
                    <div className="mt-1 text-xs" style={{ color: "var(--text-secondary)" }}>
                      See donations today, plates saved, and donors at a glance.
                    </div>
                  </div>

                  <span
                    className="inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-semibold"
                    style={{
                      borderColor: "var(--all-badge-border)",
                      background: "var(--all-badge-bg)",
                      color: "var(--all-badge-color)",
                    }}
                  >
                    Q1 Snapshot
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center">
                  <div
                    className="rounded-xl border border-[#dbe7ff] bg-[#eef5ff] p-4"
                  >
                    <div className="text-[11px] uppercase tracking-wide text-[#3358a4]">
                      Donations today
                    </div>
                    <div className="mt-1 text-2xl font-semibold" style={{ color: "var(--text)" }}>
                      24
                    </div>
                  </div>

                  <div
                    className="rounded-xl border border-[#d6f3e1] bg-[#eafaf0] p-4"
                  >
                    <div className="text-[11px] uppercase tracking-wide text-[#1e7e34]" >
                      Plates saved
                    </div>
                    <div className="mt-1 text-2xl font-semibold" style={{ color: "var(--text)" }}>
                      120+
                    </div>
                  </div>

                  <div
                    className="rounded-xl border border-[#ffe7c2] bg-[#fff4e5] p-4"

                  >
                    <div className="text-[11px] uppercase tracking-wide text-[#b26a00]" >
                      Active donors
                    </div>
                    <div className="mt-1 text-2xl font-semibold" style={{ color: "var(--text)" }}>
                      65
                    </div>
                  </div>
                </div>

                <div className="h-px w-full" style={{ background: "var(--divider)" }} />

                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold" style={{ color: "var(--text)" }}>
                    Saving Foods Worldwide
                  </span>
                  <span
                    className="rounded-full border px-3 py-1.5 text-xs font-semibold"
                    style={{
                      borderColor: "var(--all-badge-border)",
                      background: "var(--all-badge-bg)",
                      color: "var(--all-badge-color)",
                    }}
                  >
                    In progress
                  </span>
                </div>
              </div>
            </div>




          </motion.div>
        </div>
      </section>

      <section className="px-4 pb-10 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex items-center text-center justify-between">
            <div className=' w-full'>
              <h2 className="text-3xl font-extrabold text-[var(--text)]">
                Featured Foods
              </h2>
              <p className="mt-4 text-[var(--text-soft)]">
                Handpicked donations ready for pickup
              </p>
            </div>
          </div>

          {isLoading && (
            <p className="text-[var(--text-soft)]">Loading featured foods...</p>
          )}

          {isError && (
            <p className="text-[var(--text-soft)]">Failed to load featured foods.</p>
          )}

          {!isLoading && !isError && (!data || data.length === 0) && (
            <p className="text-[var(--text-soft)]">No featured foods available right now.</p>
          )}

          {!isLoading && !isError && data && data.length > 0 && (
            <>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {data.map(food => (
                  <motion.div
                    key={food._id}
                    className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-[0_14px_40px_rgba(2,6,23,.10)] transition"
                    whileHover={{ y: -4, scale: 1.01 }}
                    transition={{ duration: 0.15 }}
                  >
                    {food.imageUrl && (
                      <img
                        src={food.imageUrl}
                        alt={food.name}
                        className="h-60 w-full object-cover"
                      />
                    )}

                    <div className="p-5">

                      <div className='flex justify-between items-center mb-2'>
                        <h3 className="text-lg font-bold text-[var(--text)]">
                          {food.name}
                        </h3>
                        <p><span className='font-medium'>Quantity</span> : {food.quantity || '—'}</p>
                      </div>

                      <div className="flex justify-between items-center text-sm text-[var(--text-soft)] mb-2">
                        <p>Pickup : {food.pickupLocation || '—'}</p>
                        <p>
                          Expire :{' '}
                          {food.expireDate
                            ? new Date(food.expireDate).toLocaleDateString()
                            : '—'}
                        </p>
                      </div>


                      <div className="mt-6 flex items-center justify-between">

                        <div className='inline-flex items-center gap-2 rounded-full px-3 py-1 font-semibold border border-[var(--all-badge-border)] bg-[var(--all-badge-bg)]'>

                          <span className="inline-block size-2 rounded-full bg-[var(--primary)]" />

                          <span className="text-base text-[var(--primary)]">
                            Available
                          </span>
                        </div>

                        <Link
                          to={`/food/${food._id}`}
                          className=" inline-flex items-center justify-center rounded-3xl bg-[linear-gradient(180deg,#22c55e,#16a34a)] px-4 py-2 text-sm font-bold !text-white shadow-[0_10px_20px_rgba(22,163,74,.18)]  transition hover:-translate-y-[1px]"
                        >
                          View Details
                        </Link>

                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6">
                <Link
                  to="/foods"
                  className="inline-flex items-center justify-center rounded-3xl bg-[var(--primary)] px-6 py-3 font-bold text-white shadow-[0_14px_26px_rgba(22,163,74,.18)]"
                >
                  Show All Foods
                </Link>
              </div>
            </>
          )}
        </div>
      </section>



      <section className="relative px-4 pb-14 pt-10">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,.18),transparent_60%)] blur-2xl" />
          <div className="absolute bottom-0 right-0 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(34,197,94,.16),transparent_60%)] blur-2xl" />
        </div>

        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex flex-col gap-2 text-center">

            <h2 className="text-balance text-3xl font-extrabold tracking-tight text-[var(--text)] md:text-3xl">
              Simple steps, Real impact
            </h2>

            <p className="text-pretty text-[var(--text-soft)] mt-3">
              Share surplus food in minutes, and help someone nearby without the friction.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-[0_14px_40px_rgba(2,6,23,.10)]">
              <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,.18),transparent_60%)] blur-2xl transition-transform duration-500 group-hover:scale-110" />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,.04),transparent)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--card)] shadow-sm">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-6 w-6 text-[var(--text)]"
                    aria-hidden="true"
                  >
                    <path
                      d="M7 10V8a5 5 0 0 1 10 0v2"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                    <path
                      d="M6.5 10h11a2 2 0 0 1 2 2v6a3 3 0 0 1-3 3H7.5a3 3 0 0 1-3-3v-6a2 2 0 0 1 2-2Z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 14v3"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                <div className="min-w-0">
                  <div className="text-2xl font-extrabold text-[var(--text)]">
                    How PlateShare works
                  </div>
                  <p className="mt-1 text-[var(--text-soft)]">
                    Clear flow from posting to pickup.
                  </p>
                </div>
              </div>

              <ol className="mt-5 grid gap-3 text-[var(--text-soft)]">
                <li className="flex gap-3">
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)] text-sm font-bold text-[var(--text)]">
                    1
                  </div>
                  <div>
                    <div className="font-semibold text-[var(--text)]">Sign in</div>
                    <div className="text-sm">
                      Publish your surplus food with a quick photo and details.
                    </div>
                  </div>
                </li>

                <li className="flex gap-3">
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)] text-sm font-bold text-[var(--text)]">
                    2
                  </div>
                  <div>
                    <div className="font-semibold text-[var(--text)]">Requests</div>
                    <div className="text-sm">
                      Recipients browse nearby listings and request what they need.
                    </div>
                  </div>
                </li>

                <li className="flex gap-3">
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)] text-sm font-bold text-[var(--text)]">
                    3
                  </div>
                  <div>
                    <div className="font-semibold text-[var(--text)]">Pickup</div>
                    <div className="text-sm">
                      Coordinate pickup time and complete the donation safely.
                    </div>
                  </div>
                </li>
              </ol>

              <div className="mt-6 flex flex-wrap gap-2">
                <span className="rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-1 text-xs font-semibold text-[var(--text-soft)]">
                  Fast posting
                </span>
                <span className="rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-1 text-xs font-semibold text-[var(--text-soft)]">
                  Nearby requests
                </span>
                <span className="rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-1 text-xs font-semibold text-[var(--text-soft)]">
                  Simple pickup
                </span>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-[0_14px_40px_rgba(2,6,23,.10)]">
              <div className="pointer-events-none absolute -left-24 -bottom-24 h-60 w-60 rounded-full bg-[radial-gradient(circle,rgba(34,197,94,.16),transparent_60%)] blur-2xl transition-transform duration-500 group-hover:scale-110" />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,.04),transparent)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--card)] shadow-sm">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-6 w-6 text-[var(--text)]"
                    aria-hidden="true"
                  >
                    <path
                      d="M12 21s-7-4.4-9.5-8.7C.3 8.3 2.7 5 6.3 5c2 0 3.3 1.1 3.9 1.9.6-.8 1.9-1.9 3.9-1.9 3.6 0 6 3.3 3.8 7.3C19 16.6 12 21 12 21Z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7.5 12h2l1.2-2.6L13 16l1.4-4h2.1"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <div className="min-w-0">
                  <div className="text-2xl font-extrabold text-[var(--text)]">
                    Why it matters
                  </div>
                  <p className="mt-1 text-[var(--text-soft)]">
                    Less waste. More dignity. Stronger neighborhoods.
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-4">
                <p className="text-[var(--text-soft)]">
                  Every shared plate reduces waste, supports people and strengthens your local community.
                </p>

                <ul className="grid gap-3 text-[var(--text-soft)]">
                  <li className="flex gap-3">
                    <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)]">
                      <svg viewBox="0 0 24 24" className="h-4 w-4 text-[var(--text)]" fill="none">
                        <path
                          d="M20 6 9 17l-5-5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <div>
                      <div className="font-semibold text-[var(--text)]">Reduce avoidable food waste</div>
                      <div className="text-sm">Turn surplus into a resource, not landfill.</div>
                    </div>
                  </li>

                  <li className="flex gap-3">
                    <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)]">
                      <svg viewBox="0 0 24 24" className="h-4 w-4 text-[var(--text)]" fill="none">
                        <path
                          d="M20 6 9 17l-5-5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <div>
                      <div className="font-semibold text-[var(--text)]">Connect donors with real needs</div>
                      <div className="text-sm">Match nearby supply with nearby demand.</div>
                    </div>
                  </li>

                  <li className="flex gap-3">
                    <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)]">
                      <svg viewBox="0 0 24 24" className="h-4 w-4 text-[var(--text)]" fill="none">
                        <path
                          d="M20 6 9 17l-5-5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <div>
                      <div className="font-semibold text-[var(--text)]">Make sharing part of daily life</div>
                      <div className="text-sm">Small actions compound into community impact.</div>
                    </div>
                  </li>
                </ul>

                <div className="mt-1 grid grid-cols-3 gap-3">
                  <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-3">
                    <div className="text-xs font-semibold text-[var(--text-soft)]">Waste</div>
                    <div className="mt-1 text-lg font-extrabold text-[var(--text)]">Down</div>
                  </div>
                  <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-3">
                    <div className="text-xs font-semibold text-[var(--text-soft)]">Support</div>
                    <div className="mt-1 text-lg font-extrabold text-[var(--text)]">Up</div>
                  </div>
                  <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-3">
                    <div className="text-xs font-semibold text-[var(--text-soft)]">Community</div>
                    <div className="mt-1 text-lg font-extrabold text-[var(--text)]">Stronger</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



    </div>
  )
}

export default Home
