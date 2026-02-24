
export type userDetails = {
    _id: string,
    name: string,
    mobile: number | string,
    email: string,
    address: string,
    roleDetails: roleDetails[]
}

export type roleDetails = {
    companyName: string,
    role: string,
    salary: number | string
}

