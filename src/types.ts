export interface IBaseDoc {
  id?: string;
  createdDate?: string;
  updatedDate?: string;
}

export enum UserType {
  tailor = 'tailor',
  customer = 'customer',
  kareegar = 'kareegar'
}

export interface IUser {
  type: UserType;
  uid: string;
  photoUrl: string;
}

export interface ISize {
  inch: string;
  fraction: string;
}

export interface INaap extends IBaseDoc {
  naapId: string;
  lambai: ISize;
  bazoo: ISize;
  teera: ISize;
  kalar: ISize;
  chatee: ISize;
  geera: ISize;
  pancha: ISize;
  customerName: string;
  customerPhone: string;
  user: IUser;
  relatedOrdersIds: string[];
  design: any; // template
}


export interface IOrder extends IBaseDoc {
  naap: INaap;
  dueDate: string;
  clothType: string;
  numberOfSuits: string;
  totalAmount: string;
  paidAmount: string;
  remainingAmount: string;
  images: string[];
  status: EStatus;
}
export interface  memberShip {
  plan:string;
  price: number;
  startAt:string;
  endAt: string;
  membershipStatus:boolean;
}
export interface tailorInfo{
  tailorName:string,
  banner:string,
  logo:string,
  id:any,
  phone:"",
  adress:""
}


export enum ECollection {
  users = 'users',
  naaps = 'naaps',
  orders = 'orders',
  customer = 'customers',
  tailorInfo='tailorInfo',
  membership="membership"
}

export enum EStatus {
  inprogress = 'In Progress',
  ready = 'Ready',
  delivered = 'Delivered'
}



export interface FbData {
  height: number;
  is_silhouette: boolean;
  url: string;
  width: number;
}

export interface FbPicture {
  data: FbData;
}
export interface FBUserInfo {
  name: string;
  email: string;
  picture: FbPicture;
  id: string;
}
export interface IUseAuth {
  user: any,
  setUser: (use: any) => void
  isAuth: () => boolean,
  signOut: () => void
}


