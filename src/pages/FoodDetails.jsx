import { useParams } from 'react-router-dom'
import { useQuery, useMutation } from '@tanstack/react-query'
import api from '../lib/api'
import { useAuth } from '../auth/AuthProvider'

function FoodDetails() {
  const { id } = useParams()
  const { user } = useAuth()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['food', id],
    queryFn: async () => {
      const res = await api.get(`/foods/${id}`)
      return res.data
    }
  })

  const requestMutation = useMutation({
    mutationFn: async () => {
      await api.post('/requests', { foodId: id })
    },
    onSuccess: () => {
      alert('Request submitted')
    },
    onError: err => {
      const msg = err?.response?.data?.message || 'Request failed'
      alert(msg)
    }
  })

  if (isLoading) return <div style={{ padding: 16 }}>Loading...</div>
  if (isError) return <div style={{ padding: 16 }}>Error loading food</div>
  if (!data) return <div style={{ padding: 16 }}>Food not found</div>

  const isDonor = user && data.donor && data.donor.email === user.email

  return (
    <div style={{ padding: 16 }}>
      <h2>{data.name}</h2>
      {data.imageUrl && (
        <img src={data.imageUrl} alt={data.name} style={{ maxWidth: 300, display: 'block', marginBottom: 12 }} />
      )}
      <p>Quantity: {data.quantity}</p>
      <p>Pickup Location: {data.pickupLocation}</p>
      <p>Expire Date: {new Date(data.expireDate).toLocaleDateString()}</p>
      <p>Status: {data.status}</p>
      <p>Notes: {data.notes || 'N/A'}</p>
      <p>Donor: {data.donor?.name || data.donor?.email}</p>

      {!isDonor && (
        <button
          style={{ marginTop: 12 }}
          onClick={() => requestMutation.mutate()}
          disabled={requestMutation.isPending}
        >
          {requestMutation.isPending ? 'Requesting...' : 'Request This Food'}
        </button>
      )}

      {isDonor && <p style={{ marginTop: 12 }}>You are the donor of this food.</p>}
    </div>
  )
}

export default FoodDetails
