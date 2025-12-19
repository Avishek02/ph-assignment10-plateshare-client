import { Link, Navigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '../auth/AuthProvider'
import api from '../lib/api'
import Loading from '../components/Loading'
import { confirmDelete, success, error } from '../lib/feedback'
import { useMemo, useState, useEffect } from 'react'
import ErrorState from '../components/ErrorState'

function ManageFoods() {
  const { user, loading } = useAuth()
  const queryClient = useQueryClient()
  const email = user?.email || ''
  const [deletingId, setDeletingId] = useState(null)

  const queryKey = useMemo(() => ['my-foods', email], [email])

  const { data = [], isLoading, isError } = useQuery({
    queryKey,
    enabled: !loading && !!email,
    queryFn: async () => {
      const res = await api.get('/foods/my')
      return Array.isArray(res.data) ? res.data : []
    },
    retry: 1
  })

  useEffect(() => {
    if (isError) error('Failed to load your foods.')
  }, [isError])

  const deleteMutation = useMutation({
    mutationFn: async id => {
      setDeletingId(id)
      return api.delete(`/foods/${id}`)
    },
    onSuccess: () => {
      success('Food deleted successfully.')
      queryClient.invalidateQueries({ queryKey })
      queryClient.invalidateQueries({ queryKey: ['foods'] })
      queryClient.invalidateQueries({ queryKey: ['featured-foods'] })
    },
    onError: () => {
      error('Failed to delete food.')
    },
    onSettled: () => setDeletingId(null)
  })

  const handleDelete = async id => {
    const ok = await confirmDelete()
    if (!ok) return
    deleteMutation.mutate(id)
  }

  if (loading) return <Loading />
  if (!user) return <Navigate to="/login" replace />

  if (isLoading) return <Loading />

  if (isError) {
    return (
      <ErrorState
        title="Manage My Foods"
        message="Something went wrong while loading your foods. Please try again."
        onRetry={() => queryClient.invalidateQueries({ queryKey })}
      />
    )
  }

  return (
    <div style={{ padding: 16 }}>
      <h2>Manage My Foods</h2>

      {data.length === 0 ? (
        <p>You have no foods yet.</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 760 }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: 10 }}>Food</th>
                <th style={{ textAlign: 'left', padding: 10 }}>Quantity</th>
                <th style={{ textAlign: 'left', padding: 10 }}>Pickup</th>
                <th style={{ textAlign: 'left', padding: 10 }}>Status</th>
                <th style={{ textAlign: 'left', padding: 10 }}>Expire Date</th>
                <th style={{ textAlign: 'left', padding: 10 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map(item => {
                const isDeleting = deletingId === item._id
                return (
                  <tr key={item._id}>
                    <td style={{ padding: 10 }}>{item.name || '—'}</td>
                    <td style={{ padding: 10 }}>{item.quantity || '—'}</td>
                    <td style={{ padding: 10 }}>{item.pickupLocation || '—'}</td>
                    <td style={{ padding: 10 }}>{item.status || '—'}</td>
                    <td style={{ padding: 10 }}>
                      {item.expireDate ? new Date(item.expireDate).toLocaleDateString() : '—'}
                    </td>
                    <td style={{ padding: 10, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                      <Link to={`/food/${item._id}`}>View</Link>
                      <Link to={`/update-food/${item._id}`}>Update</Link>
                      <button onClick={() => handleDelete(item._id)} disabled={isDeleting}>
                        {isDeleting ? 'Deleting...' : 'Delete'}
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default ManageFoods
