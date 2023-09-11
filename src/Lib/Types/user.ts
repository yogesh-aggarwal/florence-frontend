export type Address_t = {
  address: string;
  city: string;
  pincode: string;
};

export type User_t = {
  _id: string;
  email: string;
  password: string;
  name: string;
  deliveryAddresses: Address_t[];
  mobileNumbers: string[];
};
