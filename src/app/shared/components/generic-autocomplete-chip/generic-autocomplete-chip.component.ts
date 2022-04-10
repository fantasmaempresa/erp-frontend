import {
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  ControlContainer,
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { debounceTime, filter, map, Observable, startWith } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-generic-autocomplete-chip',
  templateUrl: './generic-autocomplete-chip.component.html',
  styleUrls: ['./generic-autocomplete-chip.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GenericAutocompleteChipComponent),
      multi: true,
    },
  ],
})
export class GenericAutocompleteChipComponent implements ControlValueAccessor, OnInit, OnChanges {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChange = (_: any) => {};

  onTouch = () => {};

  data: any[] = [];

  @Input()
  allData: any[] | null = [];

  @Input()
  formControlName!: string;

  @Input()
  label = '';

  @Input()
  placeholder = '';

  @Input()
  mapFn!: (item: any) => any;

  control!: FormControl;

  @ViewChild('chipInput', { static: true }) input!: ElementRef<HTMLInputElement>;

  filteredData!: Observable<any>;

  separatorKeysCodes = [ENTER, COMMA];

  constructor(private controlContainer: ControlContainer) {}

  ngOnChanges(): void {
    if (this.control) {
      this.filteredData = this.control.valueChanges.pipe(
        startWith(''),
        debounceTime(200),
        filter((value) => typeof value === 'string'),
        map((item: string) => {
          console.log(!!item);
          if (!!item) {
            console.log('Entra en true');
            return this._filter(item);
          } else {
            console.log('Entra en false');
            console.log(this.excludeLoadedChips());
            return this.excludeLoadedChips()?.slice();
          }
        }),
      );
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  writeValue(value: any): void {}

  ngOnInit(): void {
    this.control = this.controlContainer.control?.get(this.formControlName) as FormControl;
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.data.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.control.setValue('');
  }

  remove(item: string): void {
    const index = this.data.indexOf(item);

    if (index >= 0) {
      this.data.splice(index, 1);
    }
    this.control.setValue('');
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.data.push(event.option.value);
    this.input.nativeElement.value = '';
    this.control.setValue('');
  }

  private _filter(value: any): any[] {
    const filterValue = value.toLowerCase();
    return this.excludeLoadedChips().filter((data: any) =>
      JSON.stringify(data).toLowerCase().includes(filterValue),
    );
  }

  private excludeLoadedChips(): any {
    return this.allData?.filter(
      (item) => !this.data.some((data) => this.mapFn(item) === this.mapFn(data)),
    );
  }
}
