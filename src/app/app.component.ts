import { Component, OnInit } from '@angular/core';
import { FormStructure } from './type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  structure: FormStructure = {
    ala: { type: 'text' },
    ma: { type: 'number' },
    kota: { type: 'select', options: ['a', 'b', 'c'] },
  };
}
