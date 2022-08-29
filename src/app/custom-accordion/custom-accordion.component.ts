import { Component, OnInit } from '@angular/core';
import { AccordionService } from '../services/accordion.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-custom-accordion',
  templateUrl: './custom-accordion.component.html',
  styleUrls: ['./custom-accordion.component.css']
})
export class CustomAccordionComponent implements OnInit {
  questions: any = [];
 
  constructor(private accService: AccordionService) {}

  ngOnInit(): void {
    this.accService.getAllData().subscribe(
      (response) => {
        this.questions = response;
        console.log(response);
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );
  }

  toggleAccordion(event: { target: any }, index: string | number) {
    console.log('active class added starts');
    const element = event.target;
    element.classList.toggle('active');
    if (this.questions[index].isActive) {
      this.questions[index].isActive = false;
    } else {
      this.questions[index].isActive = true;
    }
    const panel = element.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + 'px';
    }
  }

}
