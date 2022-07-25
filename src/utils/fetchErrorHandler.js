import { toast } from 'react-toastify'

export const fetchErrorHandler = (error) => {
    toast.error(`Текст ошибки: ${error}`, {
        position: toast.POSITION.TOP_RIGHT,
    })
}
