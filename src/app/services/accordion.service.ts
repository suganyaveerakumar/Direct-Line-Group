import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AccordionService {
  constructor(private http: HttpClient) {}

  getAllData() {
    return this.http.get('../../assets/fonts/faqs.json');
  }
}
