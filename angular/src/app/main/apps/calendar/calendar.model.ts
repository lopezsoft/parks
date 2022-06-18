
export class EventDetail {
  id: number;
  eventId?: number;
  discount: number;
  paymentDate: Date;
  productId: number;
  paymentId: number;
  amount?: number;
  price: number;
  total: number;
  balance: number;
  advance: number;
  info: string;
}

export class Client {
  id: number;
  active: boolean;
  avatar: string;
  birthday: Date;
  dni: string;
  email: string ;
  first_name: string;
  full_name: string;
  id_document: number;
  last_name: string;
  type: number;
}

export class EventRef {
  id?: number;
  totalPeople: number;
  url: string;
  title: string = '';
  start: string;
  end: string;
  allDay = false;
  calendar: '';
  detail: EventDetail;
  client: Client;
  extendedProps = {
    location: '',
    description: '',
    addGuest: []
  };
  status: number;

  constructor() {
    this.client = new Client();
    this.detail = new EventDetail();
  }
}
