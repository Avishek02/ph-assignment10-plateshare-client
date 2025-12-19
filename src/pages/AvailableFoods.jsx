import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import api from '../lib/api'
import { error } from '../lib/feedback'
import Loading from '../components/Loading'
import ErrorState from '../components/ErrorState'

function AvailableFoods() {
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

  if (isLoading) return <Loading />

  if (isError) {
    return (
      <ErrorState
        title="Available Foods"
        message="Something went wrong while loading foods."
      />
    )
  }

  if (!data || data.length === 0) {
    return (
      <div className="px-4 py-6">
        <h2 className="text-2xl font-semibold">Available Foods</h2>
        <p className="mt-2 text-gray-600">No foods available.</p>
      </div>
    )
  }

  return (
    <div className="px-4 py-6">
      <h2 className="text-2xl font-semibold">Available Foods</h2>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.map(item => (
          <div
            key={item._id}
            className="rounded-lg border border-gray-200 bg-white shadow-sm"
          >
            {item.imageUrl && (
              <img
                src={item.imageUrl}
                alt={item.name}
                className="h-48 w-full rounded-t-lg object-cover"
              />
            )}

            <div className="p-4">
              <h3 className="text-lg font-semibold">{item.name}</h3>

              <p className="mt-1 text-sm text-gray-600">
                Quantity: {item.quantity || '—'}
              </p>
              <p className="text-sm text-gray-600">
                Pickup: {item.pickupLocation || '—'}
              </p>
              <p className="text-sm text-gray-600">
                Expire: {item.expireDate ? new Date(item.expireDate).toLocaleDateString() : '—'}
              </p>

              <div className="mt-4">
                <Link
                  to={`/food/${item._id}`}
                  className="inline-block rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AvailableFoods
