import Swal from 'sweetalert2'
import { toast } from 'react-hot-toast'

export const success = message => toast.success(message)
export const error = message => toast.error(message)

export const confirmDelete = async () => {
  const res = await Swal.fire({
    title: 'Delete this food?',
    text: 'This action cannot be undone.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete',
    cancelButtonText: 'Cancel',
    reverseButtons: true
  })
  return !!res.isConfirmed
}

export const confirmAction = async ({
  title = 'Are you sure?',
  text = '',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  icon = 'question'
} = {}) => {
  const res = await Swal.fire({
    title,
    text,
    icon,
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    reverseButtons: true
  })
  return !!res.isConfirmed
}
