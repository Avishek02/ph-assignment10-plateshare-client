import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../lib/api'
import { success, error } from '../lib/feedback'
import Loading from '../components/Loading'
import ErrorState from '../components/ErrorState'

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
    enabled: !!id,
    queryFn: async () => {
      const res = await api.get(`/foods/${id}`)
      return res.data
    },
    retry: 1
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
      success('Food updated successfully.')
      queryClient.invalidateQueries({ queryKey: ['food', id] })
      queryClient.invalidateQueries({ queryKey: ['my-foods'] })
      queryClient.invalidateQueries({ queryKey: ['foods'] })
      queryClient.invalidateQueries({ queryKey: ['featured-foods'] })
      navigate('/manage-foods')
    },
    onError: () => {
      error('Failed to update food.')
    }
  })

  const onSubmit = values => {
    mutation.mutate(values)
  }

  if (isLoading) return <Loading />

  if (isError || !food) {
    return (
      <ErrorState
        title="Update Food"
        message="Something went wrong while loading food data."
      />
    )
  }

  return (
    <div className="px-4 py-6 flex justify-center">
      <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold">Update Food</h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-4 flex flex-col gap-3"
        >
          <input
            className="rounded border border-gray-300 px-3 py-2"
            placeholder="Food Name"
            {...register('name', { required: true })}
          />

          <input
            className="rounded border border-gray-300 px-3 py-2"
            placeholder="Image URL"
            {...register('imageUrl', { required: true })}
          />

          <input
            className="rounded border border-gray-300 px-3 py-2"
            placeholder="Quantity (e.g. Serves 2 people)"
            {...register('quantity', { required: true })}
          />

          <input
            className="rounded border border-gray-300 px-3 py-2"
            placeholder="Pickup Location"
            {...register('pickupLocation', { required: true })}
          />

          <input
            type="date"
            className="rounded border border-gray-300 px-3 py-2"
            {...register('expireDate', { required: true })}
          />

          <textarea
            rows={3}
            className="rounded border border-gray-300 px-3 py-2"
            placeholder="Additional Notes"
            {...register('notes')}
          />

          <button
            type="submit"
            disabled={mutation.isPending}
            className="mt-2 rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {mutation.isPending ? 'Updating...' : 'Update Food'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default UpdateFood
