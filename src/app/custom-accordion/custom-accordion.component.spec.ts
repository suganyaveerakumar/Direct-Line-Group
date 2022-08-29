import { HttpClient, HttpHandler } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { AccordionService } from '../services/accordion.service';
import { CustomAccordionComponent } from './custom-accordion.component';

describe('CustomAccordionComponent', () => {
  let component: CustomAccordionComponent;
  let fixture: ComponentFixture<CustomAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomAccordionComponent],
      providers: [HttpClient, HttpHandler, AccordionService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAllData method and return list of questions', () => {
    const response: any[] = [];
    const accordionServiceStub: AccordionService =
      fixture.debugElement.injector.get(AccordionService);
    spyOn(accordionServiceStub, 'getAllData').and.returnValue(of(response));
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.questions).toEqual(response);
  });
  it('should calling toggleAccordion() wrong class for button - negative test', () => {
    spyOn(component, 'toggleAccordion');
    let button =
      fixture.debugElement.nativeElement.querySelector('button#accordion');
    button.click();
    fixture.whenStable().then(() => {
      expect(component.toggleAccordion).toHaveBeenCalled();
    });
  });
  it('should call toggleAccordion Method does not have any value - negative test', () => {
    const event = {
      target: {},
    };
    const mockElement = {
      classList: new (class {
        data: string[] = [];
        toggle(s: string) {
          this.data.push(s);
        }
      })(),
    };
    let index = 0;
    spyOn(component, 'toggleAccordion').and.callThrough();
    component.toggleAccordion(event, index);
    expect(mockElement.classList.toggle('active')).toContain('active');
    expect(component.toggleAccordion(event, index)).toHaveBeenCalled();
    component.questions[index].isActive = true;
    expect(component.questions[index].isActive).toBeTruthy();
  });
});
