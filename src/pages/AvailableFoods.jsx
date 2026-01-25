import { useEffect, useState, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import api from '../lib/api'
import { error } from '../lib/feedback'
import Loading from '../components/Loading'
import ErrorState from '../components/ErrorState'

function AvailableFoods() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterLocation, setFilterLocation] = useState('all')
  const [sortOrder, setSortOrder] = useState('none')

  const {
    data = [],
    isLoading,
    isError
  } = useQuery({
    queryKey: ['foods', 'available'],
    queryFn: async () => {
      const res = await api.get('/foods', { params: { status: 'Available' } })
      return Array.isArray(res.data) ? res.data : []
    },
    retry: 1
  })

  useEffect(() => {
    if (isError) error('Failed to load available foods.')
  }, [isError])

  const locations = useMemo(() => {
    const uniqueLocations = [...new Set(data.map(item => item.pickupLocation).filter(Boolean))]
    return uniqueLocations
  }, [data])

  const filteredAndSortedData = useMemo(() => {
    let result = [...data]

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(item => {
        const words = item.name.toLowerCase().split(' ')
        return words.some(word => word.startsWith(query))
      })
    }

    if (filterLocation !== 'all') {
      result = result.filter(item => item.pickupLocation === filterLocation)
    }

    if (sortOrder === 'asc') {
      result.sort((a, b) => new Date(a.expireDate) - new Date(b.expireDate))
    } else if (sortOrder === 'desc') {
      result.sort((a, b) => new Date(b.expireDate) - new Date(a.expireDate))
    }

    return result
  }, [data, searchQuery, filterLocation, sortOrder])

  if (isLoading) return <Loading />

  if (isError) {
    return (
      <ErrorState
        title="Available Foods"
        message="Something went wrong while loading foods."
      />
    )
  }

  return (
    <div className="px-4 py-8 bg-[var(--bg-main-layout)]">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-8 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-3xl font-extrabold text-[var(--primary)]">
              Available Foods
            </h2>
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 font-semibold bg-[#e6f4ea]">
              <span className="inline-block size-2 rounded-full bg-[var(--primary)]" />
              <span className="truncate text-[var(--primary)]">
                {filteredAndSortedData.length} items
              </span>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-4 sm:grid-cols-2">
            <input
              type="text"
              placeholder="Search by any word start..."
              className="md:col-span-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-2 outline-none focus:border-[var(--primary)]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            
            <select
              className="rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-2 outline-none focus:border-[var(--primary)]"
              value={filterLocation}
              onChange={(e) => setFilterLocation(e.target.value)}
            >
              <option value="all">All Locations</option>
              {locations.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>

            <select
              className="rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-2 outline-none focus:border-[var(--primary)]"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="none">Sort by Expiry</option>
              <option value="asc">Expiring Soon</option>
              <option value="desc">Expiring Later</option>
            </select>
          </div>
        </div>

        {filteredAndSortedData.length === 0 && (
          <p className="text-[var(--text-soft)] text-center py-10">
            No foods found matching your criteria.
          </p>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredAndSortedData.map(item => (
            <div
              key={item._id}
              className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-[0_14px_40px_rgba(2,6,23,.10)] transition hover:-translate-y-[2px]"
            >
              {item.imageUrl && (
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="h-60 w-full object-cover"
                />
              )}
              <div className="p-5">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-bold text-[var(--text)]">{item.name}</h3>
                  <p><span className="font-medium">Qty</span>: {item.quantity}</p>
                </div>
                <div className="flex justify-between items-center text-sm text-[var(--text-soft)] mb-2">
                  <p>Location: {item.pickupLocation}</p>
                  <p>Exp: {new Date(item.expireDate).toLocaleDateString()}</p>
                </div>
                <Link
                  to={`/food/${item._id}`}
                  className="mt-3 inline-flex w-full items-center justify-center rounded-3xl bg-[linear-gradient(180deg,#22c55e,#16a34a)] px-4 py-2 text-sm font-bold !text-white shadow-[0_10px_20px_rgba(22,163,74,.18)]"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AvailableFoods