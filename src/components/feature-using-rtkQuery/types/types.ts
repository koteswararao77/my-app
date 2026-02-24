export type GetResponse = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export type PostPayload = {
    name: string;
    mobile: number | string;
    amount: number | string;
};

export type GetDataParams = {
  adminId: number;
};