export enum Pattern {
    Phone_dashed = '09d{2}-?d{3}-?d{3}',
    Email = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$',
    Phone = '^09[0-9]{8}$',
    Account = '^[a-zA-Z0-9_-]*$',
}
