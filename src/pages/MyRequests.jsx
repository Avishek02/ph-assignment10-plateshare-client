import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import api from '../lib/api'
import { error } from '../lib/feedback'
import { useAuth } from '../auth/AuthProvider'
import Loading from '../components/Loading'
import ErrorState from '../components/ErrorState'

function MyRequests() {
  const { user, loading } = useAuth()

  const {
    data = [],
    isLoading,
    isError
  } = useQuery({
    queryKey: ['my-requests', user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await api.get('/requests/my')
      return Array.isArray(res.data) ? res.data : []
    },
    retry: 1
  })

  useEffect(() => {
    if (isError) error('Failed to load your requests.')
  }, [isError])

  if (loading || isLoading) return <Loading />

  if (!user) {
    return (
      <div className="px-4 py-6">
        <ErrorState title="My Requests" message="Please login to view your requests." />
      </div>
    )
  }

  if (isError) {
    return (
      <ErrorState
        title="My Requests"
        message="Something went wrong while loading your requests."
      />
    )
  }

  if (!data || data.length === 0) {
    return (
      <div className="px-4 py-6">
        <h2 className="text-2xl font-semibold">My Requests</h2>
        <p className="mt-2 text-gray-600">You have not requested any food yet.</p>
      </div>
    )
  }

  return (
    <div className="px-4 py-6">
      <h2 className="text-2xl font-semibold">My Requests</h2>

      <div className="mt-4 overflow-x-auto rounded-lg border border-gray-200 bg-white">
        <table className="min-w-[900px] w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-700">
            <tr>
              <th className="px-4 py-3 font-medium">Food</th>
              <th className="px-4 py-3 font-medium">Donor</th>
              <th className="px-4 py-3 font-medium">Location</th>
              <th className="px-4 py-3 font-medium">Reason</th>
              <th className="px-4 py-3 font-medium">Contact</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map(r => (
              <tr key={r._id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  {r.food?._id ? (
                    <Link
                      className="text-blue-600 hover:underline"
                      to={`/food/${r.food._id}`}
                    >
                      {r.food?.name || 'View Food'}
                    </Link>
                  ) : (
                    <span className="text-gray-500">Food not available</span>
                  )}
                </td>
                <td className="px-4 py-3">{r.donorEmail || '—'}</td>
                <td className="px-4 py-3">{r.location || '—'}</td>
                <td className="px-4 py-3">{r.reason || '—'}</td>
                <td className="px-4 py-3">{r.contactNo || '—'}</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">
                    {r.status || 'pending'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MyRequests
