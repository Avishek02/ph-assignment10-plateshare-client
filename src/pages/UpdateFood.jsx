import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../lib/api'

function UpdateFood() {
  const { id } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { register, handleSubmit, reset } = useForm()

  const {
    data: food,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['food', id],
    queryFn: async () => {
      const res = await api.get(`/foods/${id}`)
      return res.data
    }
  })

  useEffect(() => {
    if (food) {
      reset({
        name: food.name || '',
        imageUrl: food.imageUrl || '',
        quantity: food.quantity || '',
        pickupLocation: food.pickupLocation || '',
        expireDate: food.expireDate ? food.expireDate.split('T')[0] : '',
        notes: food.notes || ''
      })
    }
  }, [food, reset])

  const mutation = useMutation({
    mutationFn: async values => {
      const body = {
        name: values.name,
        imageUrl: values.imageUrl,
        quantity: values.quantity,
        pickupLocation: values.pickupLocation,
        expireDate: values.expireDate,
        notes: values.notes || ''
      }
      await api.patch(`/foods/${id}`, body)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['food', id] })
      queryClient.invalidateQueries({ queryKey: ['my-foods'] })
      queryClient.invalidateQueries({ queryKey: ['foods'] })
      navigate('/manage-foods')
    }
  })

  const onSubmit = values => {
    mutation.mutate(values)
  }

  if (isLoading) return <div style={{ padding: 16 }}>Loading...</div>
  if (isError || !food) return <div style={{ padding: 16 }}>Error loading food</div>

  return (
    <div style={{ padding: 16, maxWidth: 500 }}>
      <h2>Update Food</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}
      >
        <input placeholder='Food Name' {...register('name', { required: true })} />
        <input placeholder='Image URL' {...register('imageUrl', { required: true })} />
        <input placeholder='Quantity' {...register('quantity', { required: true })} />
        <input placeholder='Pickup Location' {...register('pickupLocation', { required: true })} />
        <input type='date' {...register('expireDate', { required: true })} />
        <textarea rows={3} placeholder='Notes' {...register('notes')} />
        <button type='submit' disabled={mutation.isPending}>
          {mutation.isPending ? 'Updating...' : 'Update Food'}
        </button>
      </form>
    </div>
  )
}

export default UpdateFood
