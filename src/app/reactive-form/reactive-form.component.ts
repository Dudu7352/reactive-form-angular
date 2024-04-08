import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { FormStructure, InputType, ReactiveFormInputState } from '../type';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrl: './reactive-form.component.css',
})
export class ReactiveFormComponent implements OnInit {
  @Input() structure!: FormStructure;
  array: FormArray<FormControl> = new FormArray<FormControl>([]);

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    Object.entries(this.structure).forEach(([name, inputType]) => {
      if (inputType.type === 'number') {
        this.array.push(new FormControl<number>(0));
      } else {
        this.array.push(new FormControl<string>(''));
      }
    });
  }

  getInputs(): {name: string, inputType: InputType, control: FormControl}[] {
    return Object.entries(this.structure).map(([name, inputType], id) => ({
      name,
      inputType,
      control: this.array.at(id)
    }));
  }

  submitData(event: SubmitEvent) {
    event.preventDefault();
    let payload: { [key: string]: number | string } = {};
    Object.keys(this.structure).forEach((key, id) => {
      payload[key] = this.array.at(id).value
    });
    console.log(payload);
    this.http
      .post('127.0.0.1:1234', payload)
      .pipe(catchError((_) => of('api does not exist (shocking!)')))
      .subscribe((res) => console.log(res));
  }
}
