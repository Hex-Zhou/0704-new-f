interface BaseMember {
    id: number
    account: string
    password: string
    name: string
    real_name: string
    email: string
    mugshot: string
}
export interface Member extends BaseMember {
    point: number
    is_permanent: number
    function: string
    valid_at: string
    invalid_at: string
    last_login_at: string
    company_type: number
    company: string
    gender: string
    cell_phone: string
    identity: string
    status: number
    created_at: string
    updated_at: string
    is_ban: number
    ban_until: string
    cellphone_confirm: number
    email_confirm: number
    verify_code: string
}
interface DeprecatedMember extends Member {
    country_code: string
    verify_err_cnt: number
    birthday: string
    consultation_cnt: number
}
