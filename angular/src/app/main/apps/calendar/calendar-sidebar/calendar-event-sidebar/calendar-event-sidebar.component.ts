import {AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';

import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';

import flatpickr from "flatpickr";
import { Spanish } from "flatpickr/dist/l10n/es.js";

import { EventRef } from 'app/main/apps/calendar/calendar.model';
import { CalendarService } from 'app/main/apps/calendar/calendar.service';
import {HttpServerService} from "../../../../../utils";

@Component({
  selector: 'app-calendar-event-sidebar',
  templateUrl: './calendar-event-sidebar.component.html',
  encapsulation: ViewEncapsulation.None
})
export class CalendarEventSidebarComponent implements OnInit, AfterViewInit {
  //  Decorator
  @ViewChild('startDatePicker') startDatePicker;
  @ViewChild('endDatePicker') endDatePicker;
  @ViewChild('title') title: ElementRef;

  // Public
  public event: EventRef;
  public isDataEmpty;
  public calendarService: CalendarService;
  public url: string;
  public showAdvance: boolean;

  public selectLabel = [
    { label: 'Business', bullet: 'primary' },
    { label: 'Personal', bullet: 'danger' },
    { label: 'Family', bullet: 'warning' },
    { label: 'Holiday', bullet: 'success' },
    { label: 'ETC', bullet: 'info' }
  ];

  public startDateOptions = {
    altInput: true,
    mode: 'single',
    altInputClass: 'form-control flat-picker flatpickr-input invoice-edit-input',
    enableTime: true
  };
  public endDateOptions = {
    altInput: true,
    mode: 'single',
    altInputClass: 'form-control flat-picker flatpickr-input invoice-edit-input',
    enableTime: true
  };

  /**
   *
   * @param {CoreSidebarService} _coreSidebarService
   * @param {CalendarService} _calendarService
   * @param http
   */
  constructor(
      private _coreSidebarService: CoreSidebarService,
      private _calendarService: CalendarService,
      http: HttpServerService
  ) {
    this.calendarService  = _calendarService;
    this.url              = http.appUrl;
    flatpickr.localize(Spanish);
  }

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Toggle Event Sidebar
   */
  toggleEventSidebar() {
    this._coreSidebarService.getSidebarRegistry('calendar-event-sidebar').toggleOpen();
  }

  /**
   * Add Event
   *
   * @param eventForm
   */
  async addEvent(eventForm) {
    if (eventForm.valid) {
      //! Fix: Temp fix till ng2-flatpicker support ng-modal (Getting NG0100: Expression has changed after it was checked error if we use ng-model with ng2-flatpicker)
      this.event.start  = this.startDatePicker.flatpickrElement.nativeElement.children[0].value;
      this.event.end    = this.endDatePicker.flatpickrElement.nativeElement.children[0].value;

      await this._calendarService.addEvent(this.event);
      this.toggleEventSidebar();
    }else {
      this.event.detail.total = 0;
      this.event.totalPeople  = 3;
    }
  }



  /**
   * Update Event
   */
  async updateEvent() {
    this.toggleEventSidebar();
    //! Fix: Temp fix till ng2-flatpicker support ng-modal
    this.event.start  = this.startDatePicker.flatpickrElement.nativeElement.children[0].value;
    this.event.end    = this.endDatePicker.flatpickrElement.nativeElement.children[0].value;
    await this._calendarService.postUpdatedEvent(this.event);
  }

  printEvent() {
    this._calendarService.printEvent(this.event);
  }

  /**
   * Delete Event
   */
  async deleteEvent() {
    await this._calendarService.deleteEvent(this.event);
    this.toggleEventSidebar();
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this._calendarService.getPayments();
    this._calendarService.getClients();
    this._calendarService.getProducts();
    // Subscribe to current event changes
    this._calendarService.onCurrentEventChange.subscribe((response: EventRef) => {
      this.event = response;
      // If Event is available
      if (Object.keys(response).length > 0) {
        this.event = response;
        this.isDataEmpty = response.id === undefined;
      }
      // else Create New Event
      else {
        this.event = new EventRef();
        this.event.totalPeople  = 3;
        // Clear Flatpicker Values
        setTimeout(() => {
          this.startDatePicker.flatpickr.clear();
          this.endDatePicker.flatpickr.clear();
        });
        this.isDataEmpty = true;
      }
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.title.nativeElement.focus();
    },50);
  }

  selectProduct(id: number) {
    const product  = this.calendarService.products.find(p => p.id === id);
    if(product) {
      this.event.detail.total    = product.price;
      this.event.detail.advance  = 0;
      this.event.detail.balance  = 0;
      this.event.detail.paymentId= 0;
    }
  }

  selectPayment(id: number){
    const payment = this.calendarService.payments.find(p => p.id === id);
    const event   = this.event;
    if(payment) {
      event.detail.balance     = 0;
      this.showAdvance  = payment.tag_method === '004';
      if(payment.tag_method === '004') {
        event.detail.balance  = event.detail.total;
      }else if(payment.tag_method === '005'){
        event.detail.balance  = event.detail.total;
        event.detail.advance  = 0;
      }
    }
  }

  changeAdvance(){
    const detail    = this.event.detail;
    detail.balance  = parseInt(detail.total.toString()) - parseInt(detail.advance.toString());
  }


}
