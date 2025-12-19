import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import api from '../lib/api'
import { useAuth } from '../auth/AuthProvider'
import { success, error } from '../lib/feedback'
import { useState } from 'react'

const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY

function AddFood() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { register, handleSubmit, reset, setValue, formState } = useForm()
  const [submitting, setSubmitting] = useState(false)

  const uploadToImgbb = async file => {
    if (!IMGBB_API_KEY) throw new Error('Missing IMGBB key')
    const form = new FormData()
    form.append('image', file)

    const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
      method: 'POST',
      body: form
    })

    const json = await res.json()
    if (!res.ok || !json?.success) throw new Error('Image upload failed')
    return json.data.url
  }

  const onSubmit = async data => {
    try {
      setSubmitting(true)

      if (!user?.email) {
        error('Please login first.')
        navigate('/login')
        return
      }

      const file = data.imageFile?.[0]
      if (!file) {
        error('Please select an image.')
        return
      }

      const imageUrl = await uploadToImgbb(file)
      setValue('imageUrl', imageUrl)

      const body = {
        name: data.name,
        imageUrl,
        quantity: data.quantity,
        pickupLocation: data.pickupLocation,
        expireDate: data.expireDate,
        notes: data.notes || '',
        status: 'Available',
        donor: {
          name: user?.displayName || '',
          email: user?.email || '',
          photoURL: user?.photoURL || ''
        }
      }


      await api.post('/foods', body)

      reset()
      success('Food added successfully.')
      navigate('/manage-foods')
    } catch (e) {
      error(e?.message === 'Missing IMGBB key' ? 'Image hosting config missing.' : 'Failed to add food.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className='addfood-page px-4 py-8'>
      <div className='mx-auto w-full max-w-xl'>
        <div className='card addfood-card'>
          <div className=' gap-5 pb-5'>
            <div className='flex flex-col gap-3 addfood-header rounded-t-2xl'>

              <div className='flex flex-wrap items-center justify-between gap-3 pt-5'>
                {/* <div className='text-sm addfood-subtitle'>Donation listing form</div> */}

                <h2 className='text-3xl font-extrabold addfood-title `'>Add Food</h2>

                <div className='badge badge-outline gap-2 max-w-full addfood-badge'>
                  <span className='inline-block size-2 rounded-full addfood-dot' />
                  <span className='truncate'>Donor: {user?.email || ''}</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className='grid gap-4 px-5 py-5'>
              <div className='grid gap-3 p-4 addfood-section'>
                <div className='text-base font-extrabold text-slate-900'>Food details</div>

                <input
                  className='input input-bordered w-full addfood-input'
                  placeholder='Food Name'
                  {...register('name', { required: true })}
                />

                <input
                  className='input input-bordered w-full addfood-input'
                  placeholder='Food Quantity (e.g. Serves 2 people)'
                  {...register('quantity', { required: true })}
                />

                <input
                  className='input input-bordered w-full addfood-input'
                  placeholder='Pickup Location'
                  {...register('pickupLocation', { required: true })}
                />

                <div className='grid gap-2'>
                  <div className='text-base font-extrabold text-slate-700'>Expire date</div>
                  <input
                    className='input input-bordered w-full addfood-input'
                    type='date'
                    {...register('expireDate', { required: true })}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>

              <div className='grid gap-3 p-4 addfood-section'>
                <div className='text-base font-extrabold text-slate-900'>Image</div>

                <input
                  className='file-input file-input-bordered w-full addfood-input'
                  type='file'
                  accept='image/*'
                  {...register('imageFile', { required: true })}
                />

                <input type='hidden' {...register('imageUrl')} />
              </div>

              <div className='grid gap-3 p-4 addfood-section'>
                <div className='text-base font-extrabold text-slate-900'>Additional notes</div>

                <textarea
                  className='textarea textarea-bordered w-full addfood-input'
                  placeholder='Additional Notes'
                  rows={4}
                  {...register('notes')}
                />
              </div>

              <button
                type='submit'
                disabled={submitting || formState.isSubmitting}
                className='btn w-full font-extrabold addfood-btn'
              >
                {submitting ? 'Adding...' : 'Add Food'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )


}

export default AddFood
