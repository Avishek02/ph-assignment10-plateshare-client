import Swal from 'sweetalert2'

export const confirmDelete = async () => {
  const res = await Swal.fire({
    title: 'Are you sure?',
    text: 'This food will be permanently deleted.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Delete',
    cancelButtonText: 'Cancel'
  })
  return res.isConfirmed
}
