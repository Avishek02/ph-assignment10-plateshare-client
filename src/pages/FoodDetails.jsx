import { useState, useMemo, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../lib/api'
import { useAuth } from '../auth/AuthProvider'
import { success, error } from '../lib/feedback'
import Loading from '../components/Loading'
import ErrorState from '../components/ErrorState'

function FoodDetails() {
  const { id } = useParams()
  const { user } = useAuth()
  const queryClient = useQueryClient()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { register, handleSubmit, reset } = useForm()

  const foodQuery = useQuery({
    queryKey: ['food', id],
    enabled: !!id,
    queryFn: async () => {
      const res = await api.get(`/foods/${id}`)
      return res.data
    },
    retry: 1
  })

  const food = foodQuery.data
  const isDonor = useMemo(() => {
    return !!user && !!food?.donor?.email && food.donor.email === user.email
  }, [user, food])

  const requestsQuery = useQuery({
    queryKey: ['food-requests', id],
    enabled: !!id && !!user && isDonor,
    queryFn: async () => {
      const res = await api.get(`/requests/food/${id}`)
      return Array.isArray(res.data) ? res.data : []
    },
    retry: 1
  })

  useEffect(() => {
    if (foodQuery.isError) error('Failed to load food details.')
  }, [foodQuery.isError])

  useEffect(() => {
    if (requestsQuery.isError) error('Failed to load requests.')
  }, [requestsQuery.isError])

  const requestMutation = useMutation({
    mutationFn: async values => {
      const payload = {
        foodId: id,
        requesterEmail: user?.email || '',
        requesterName: user?.displayName || '',
        requesterPhoto: user?.photoURL || '',
        location: values.location,
        reason: values.reason,
        contactNo: values.contactNo,
        status: 'pending'
      }
      await api.post('/requests', payload)
    },
    onSuccess: () => {
      reset()
      setIsModalOpen(false)
      success('Request submitted successfully.')
      queryClient.invalidateQueries({ queryKey: ['my-requests'] })
    },
    onError: err => {
      const msg = err?.response?.data?.message || 'Request failed.'
      error(msg)
    }
  })

  const statusMutation = useMutation({
    mutationFn: async ({ requestId, status }) => {
      await api.patch(`/requests/${requestId}/status`, { status })
      if (status === 'accepted') {
        await api.patch(`/foods/${id}/status`, { status: 'donated' })
      }
    },
    onSuccess: () => {
      success('Request status updated.')
      queryClient.invalidateQueries({ queryKey: ['food-requests', id] })
      queryClient.invalidateQueries({ queryKey: ['donor-requests'] })
      queryClient.invalidateQueries({ queryKey: ['foods'] })
      queryClient.invalidateQueries({ queryKey: ['featured-foods'] })
      queryClient.invalidateQueries({ queryKey: ['my-requests'] })
      queryClient.invalidateQueries({ queryKey: ['food', id] })
    },
    onError: err => {
      const msg = err?.response?.data?.message || 'Failed to update request status.'
      error(msg)
    }
  })

  const onSubmit = values => {
    requestMutation.mutate(values)
  }

  if (foodQuery.isLoading) return <Loading />

  if (foodQuery.isError || !food) {
    return (
      <ErrorState
        title="Food Details"
        message="Something went wrong while loading this food."
        onRetry={() => queryClient.invalidateQueries({ queryKey: ['food', id] })}
      />
    )
  }

  const canRequest = !isDonor && !!user && (food.status || '').toLowerCase() === 'available'

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold">{food.name}</h2>

      {food.imageUrl && (
        <img
          src={food.imageUrl}
          alt={food.name}
          className="mb-3 block w-full max-w-[420px] rounded-lg object-cover"
        />
      )}

      <p className="mt-3">Quantity: {food.quantity || '—'}</p>
      <p>Pickup Location: {food.pickupLocation || '—'}</p>
      <p>Expire Date: {food.expireDate ? new Date(food.expireDate).toLocaleDateString() : '—'}</p>
      <p>Status: {food.status || '—'}</p>
      <p>Notes: {food.notes || 'N/A'}</p>
      <p>Donor: {food.donor?.name || food.donor?.email || '—'}</p>

      {!isDonor && user && (
        <div className="mt-4">
          <button
            onClick={() => setIsModalOpen(true)}
            disabled={!canRequest}
            className="rounded-md bg-black px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {canRequest ? 'Request Food' : 'Not Available'}
          </button>
        </div>
      )}

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 p-4"
          onClick={() => {
            reset()
            setIsModalOpen(false)
          }}
        >
          <div
            className="w-full max-w-[420px] rounded-xl bg-white p-4"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold">Request Food</h3>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-3 flex flex-col gap-2.5"
            >
              <input
                placeholder="Write Location"
                {...register('location', { required: true })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-black"
              />
              <textarea
                rows={3}
                placeholder="Why Need Food"
                {...register('reason', { required: true })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-black"
              />
              <input
                placeholder="Contact No."
                {...register('contactNo', { required: true })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-black"
              />

              <div className="mt-1.5 flex flex-wrap gap-2.5">
                <button
                  type="submit"
                  disabled={requestMutation.isPending}
                  className="rounded-md bg-black px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {requestMutation.isPending ? 'Submitting...' : 'Submit Request'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    reset()
                    setIsModalOpen(false)
                  }}
                  className="rounded-md border border-gray-300 px-4 py-2"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isDonor && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Requests for this food</h3>

          {requestsQuery.isLoading && <Loading />}

          {!requestsQuery.isLoading && (!requestsQuery.data || requestsQuery.data.length === 0) && (
            <p className="mt-2">No requests yet.</p>
          )}

          {!requestsQuery.isLoading && requestsQuery.data && requestsQuery.data.length > 0 && (
            <div className="mt-3 overflow-x-auto">
              <table className="w-full min-w-[900px] border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="p-2.5 text-left">Requester</th>
                    <th className="p-2.5 text-left">Email</th>
                    <th className="p-2.5 text-left">Location</th>
                    <th className="p-2.5 text-left">Reason</th>
                    <th className="p-2.5 text-left">Contact</th>
                    <th className="p-2.5 text-left">Status</th>
                    <th className="p-2.5 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {requestsQuery.data.map(r => {
                    const st = (r.status || '').toLowerCase()
                    const disabled = statusMutation.isPending || st === 'accepted' || st === 'rejected'
                    return (
                      <tr key={r._id} className="border-b">
                        <td className="p-2.5">{r.requesterName || '—'}</td>
                        <td className="p-2.5">{r.requesterEmail || '—'}</td>
                        <td className="p-2.5">{r.location || '—'}</td>
                        <td className="p-2.5">{r.reason || '—'}</td>
                        <td className="p-2.5">{r.contactNo || '—'}</td>
                        <td className="p-2.5">{r.status || 'pending'}</td>
                        <td className="p-2.5">
                          <div className="flex flex-wrap gap-2.5">
                            <button
                              disabled={disabled || st === 'accepted'}
                              onClick={() => statusMutation.mutate({ requestId: r._id, status: 'accepted' })}
                              className="rounded-md bg-emerald-600 px-3 py-2 text-white disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              Accept
                            </button>
                            <button
                              disabled={disabled || st === 'rejected'}
                              onClick={() => statusMutation.mutate({ requestId: r._id, status: 'rejected' })}
                              className="rounded-md bg-rose-600 px-3 py-2 text-white disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              Reject
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default FoodDetails
