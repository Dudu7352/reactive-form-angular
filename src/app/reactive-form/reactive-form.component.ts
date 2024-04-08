import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormStructure, ReactiveFormInputState } from '../type';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrl: './reactive-form.component.css',
})
export class ReactiveFormComponent implements OnInit {
  @Input() structure!: FormStructure;
  state: ReactiveFormInputState[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.state = Object.entries(this.structure).map((values) => {
      const inputType = values[1];
      return {
        inputName: values[0],
        type: inputType,
        control:
          inputType.type === 'number'
            ? new FormControl<number>(0)
            : new FormControl(),
      };
    });
  }

  submitData(event: SubmitEvent) {
    event.preventDefault();
    let payload: { [key: string]: number | string } = {};
    this.state.forEach((input) => {
      payload[input.inputName] = input.control.value;
    });
    console.log(payload);
    this.http.post('127.0.0.1:1234', payload)
    .pipe(
      catchError(_ => of("api does not exist (shocking!)"))
    )
    .subscribe(res => console.log(res));
    
  }
}
