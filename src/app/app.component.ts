import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { __values } from 'tslib';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  private _values: BehaviorSubject<any> = new BehaviorSubject<any>(new Array<any>());
  private _idKeys: BehaviorSubject<string[]> = new BehaviorSubject<any>(new Array<string>());
  private _allkeys: BehaviorSubject<string[]> = new BehaviorSubject<any>(new Array<string>());

  values$: Observable<any> = this._values.asObservable();
  idKeys$: Observable<string[]> = this._idKeys.asObservable();
  allKeys$: Observable<string[]> = this._allkeys.asObservable();
  form: FormGroup;
  searchText: string;
  values = [];
  documentIndex: number = undefined;

  constructor(private _httpService: HttpClient,
    builder: FormBuilder) {
    this.form = builder.group({
      searchText: ['', [Validators.required]]
    });
  }

  ngOnInit() {
  }

  patch(value: string) {
    this.searchText = value;
    this.form.get('searchText').patchValue(value);
  }

  search() {
    if (this.form.valid) {
      this._httpService.get<any[]>(`http://jsondownloader.azurewebsites.net/search/${this.searchText}`).subscribe(values => {
        this.values = values;
        this._values.next(values);
        this._idKeys.next(Object.keys(values[0])
          .filter(x => x !== undefined && (x.toLocaleLowerCase().includes('id') || x.toLocaleLowerCase().includes('title'))));
        this._allkeys.next(Object.keys(values[0]));
      });
    }
  }

  setIndex(index: number) {
    if (index === this.documentIndex) {
      this.documentIndex = undefined;
    } else {
      this.documentIndex = index;
      console.log(index);
    }
  }
}
