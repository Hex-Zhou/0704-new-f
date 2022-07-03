import Swal, { SweetAlertIcon } from 'sweetalert2'

export function sw_fire(title: string, text?: string, icon?: SweetAlertIcon) {
    return Swal.fire({
        icon: icon,
        title: title,
        text: text,
    })
}
