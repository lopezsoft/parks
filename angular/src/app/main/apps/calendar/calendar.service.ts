import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';

import {BehaviorSubject, Observable} from 'rxjs';

import {EventRef} from 'app/main/apps/calendar/calendar.model';
import {Payments} from "../../../Contracts/Payments/payments";
import {Clients} from "../../../Contracts/Clients/clients";
import {Products} from 'app/Contracts/Products/products';
import {ProductsService} from 'app/Services/Products/products.service';
import {ClientsService} from 'app/Services/Clients/clients.service';
import {PaymentsService} from 'app/Services/Payments/payments.service';
import {HttpServerService, MessagesService} from "../../../utils";

@Injectable()
export class CalendarService implements Resolve<any> {
  // Public
  public events: EventRef[];
  public calendar;
  public currentEvent: EventRef;
  public tempEvents: EventRef[];
  public payments: Payments[];
  public clients: Clients[];
  public products: Products[];

  public onEventChange: BehaviorSubject<any>;
  public onCurrentEventChange: BehaviorSubject<any>;
  public onCalendarChange: BehaviorSubject<any>;

  /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   * @param _products
   * @param _clients
   * @param _payments
   * @param _http
   * @param _msg
   */
  constructor(
      private _httpClient: HttpClient,
      private _products: ProductsService,
      private _clients: ClientsService,
      private _payments: PaymentsService,
      private _http: HttpServerService,
      private _msg: MessagesService
  ) {
    this.onEventChange = new BehaviorSubject({});
    this.onCurrentEventChange = new BehaviorSubject({});
    this.onCalendarChange = new BehaviorSubject({});
  }

  /**
   * Resolver
   *
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {Observable<any> | Promise<any> | any}
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {
      Promise.all([this.getEvents(), this.getCalendar()]).then(res => {
        resolve(res);
      }, reject);
    });
  }

  getProducts() {
    this._products.read().subscribe({
      next: (resp => {
        this.products = resp;
      })
    });
  }

  getClients() {
    this._clients.all().subscribe({
      next: (resp => {
        this.clients  = resp;
      })
    });
  }

  getPayments() {
    this.payments  = this._payments.read();
  }

  /**
   * Get Events
   */
  async getEvents(): Promise<any[]> {
    const url = `/events/read`;
    return new Promise((resolve, reject) => {
      this._http.get(url)
          .subscribe({
            next: (response) => {
              this.events     = response.records;
              this.tempEvents = response.records;
              this.onEventChange.next(this.events);
              resolve(this.events);
            },
            error: reject,
          });
    });
  }

  /**
   * Get Calendar
   */
  getCalendar(): Promise<any[]> {
    const url = `api/calendar-filter`;
    return new Promise((resolve, reject) => {
      this._httpClient.get(url).subscribe((response: any) => {
        this.calendar = response;
        this.onCalendarChange.next(this.calendar);
        resolve(this.calendar);
      }, reject);
    });
  }

  /**
   * Create New Event
   */
  createNewEvent() {
    this.currentEvent = new EventRef();
    this.onCurrentEventChange.next(this.currentEvent);
  }

  /**
   * Calendar Update
   *
   * @param calendars
   */
  calendarUpdate(calendars) {
    const calendarsChecked = calendars.filter(calendar => {
      return calendar.checked === true;
    });

    let calendarRef = [];
    calendarsChecked.map(res => {
      calendarRef.push(res.filter);
    });

    this.events = this.tempEvents.filter(event => calendarRef.includes(event.calendar));
    this.onEventChange.next(this.events);
  }

  /**
   * Delete Event
   *
   * @param event
   */
  async deleteEvent(event) {
    return new Promise((resolve, reject) => {
      this._http.delete('/events/destroy/' + event.id)
          .subscribe({
            next: response => {
              this.getEvents();
              this._msg.toastMessage('Evento', 'Evento eliminado');
              resolve(response);
            },
            error: err => {
              this._msg.errorMessage('', 'No fue posible eliminar el evento');
              this.reload();
              reject(err);
            }
          });
    });
  }

  /**
   * Add Event
   *
   * @param eventForm
   */
  async addEvent(eventForm: EventRef) {
    this.currentEvent = eventForm;
    this.onCurrentEventChange.next(this.currentEvent);
    await this.postNewEvent();
  }

  /**
   * Update Event
   *
   * @param eventRef
   */
  updateCurrentEvent(eventRef) {
    this.currentEvent = this.events.find(event => event.id === parseInt(eventRef.event.id));
    this.onCurrentEventChange.next(this.currentEvent);
  }

  /**
   * Post New Event
   */
  async postNewEvent() {
      this._http.post('/events/create', this.currentEvent)
          .subscribe({
            next: ((response: any) => {
              this.printEvent(response.records);
              this.getEvents();
              this._msg.toastMessage('Evento', 'Evento creado');
            }),
            error: (error) => {
              this._msg.errorMessage('', 'No fue posible crear el evento');
              this.reload();
            }
          });
  }

  /**
   * Post Updated Event
   *
   * @param event
   */
  async postUpdatedEvent(event) {
    return new Promise((resolve, reject) => {
      this._http.put('/events/update/' + event.id, { ...event })
          .subscribe({
            next: response => {
              this.getEvents();
              this.printEvent(event);
              this._msg.toastMessage('Evento', 'Evento actualizado');
              resolve(response);
            },
            error: (err) => {
              this._msg.errorMessage('', 'No fue posible actualizar el evento');
              this.reload();
              reject(err);
            }
          });
    });
  }

  printEvent(event: EventRef) {
    this._http.get('/events/output/' + event.id)
        .subscribe({
          next: response => {
            const url = `${this._http.appUrl}/${response.pathFile}`;
            window.open(url, '_blank');
          },
          error: () => {
            this._msg.errorMessage('', 'No fue posible generar el ticket');
            this.reload();
          }
        });
  }

  reload() {
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }
}
