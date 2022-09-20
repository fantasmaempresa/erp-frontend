import { Component, ElementRef, forwardRef, Injector, Input, OnChanges, OnInit, ViewChild } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl, UntypedFormControl } from "@angular/forms";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { MatChipInputEvent } from "@angular/material/chips";
import { debounceTime, filter, map, Observable, startWith, Subject } from "rxjs";
import { COMMA, ENTER } from "@angular/cdk/keycodes";

@Component({
  selector: "app-generic-autocomplete-chip",
  templateUrl: "./generic-autocomplete-chip.component.html",
  styleUrls: ["./generic-autocomplete-chip.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GenericAutocompleteChipComponent),
      multi: true
    },
  ],
})
export class GenericAutocompleteChipComponent implements ControlValueAccessor, OnChanges, OnInit {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChange = (_: any) => {};

  onTouch = () => {};

  data: any[] = [];

  @Input()
  allData: any[] | null = [];

  @Input()
  label = '';

  @Input()
  placeholder = '';

  @Input()
  mapFn!: (item: any) => any;

  @ViewChild('chipInput', { static: true }) input!: ElementRef<HTMLInputElement>;

  filteredData!: Observable<any>;

  separatorKeysCodes = [ENTER, COMMA];

  private subject$ = new Subject<any>();

  ngControl!: NgControl;

  constructor(private inj: Injector) {}

  ngOnInit(): void {
    this.ngControl = this.inj.get(NgControl, new UntypedFormControl());
    this.ngControl.valueAccessor = this;
  }

  ngOnChanges(): void {
    this.filteredData = this.subject$.asObservable().pipe(
      startWith(''),
      debounceTime(200),
      filter((value) => typeof value === 'string'),
      map((item: string) => (!!item ? this._filter(item) : this.excludeLoadedChips()?.slice())),
    );
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  writeValue(value: any): void {
    if (value) {
      this.data = [...value];
      this.notifyValue();
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.data.push(value);
    }
    this.onTouch();
  }

  remove(item: string): void {
    const index = this.data.indexOf(item);
    if (index >= 0) {
      this.data.splice(index, 1);
    }
    this.notifyValue();
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.data.push(event.option.value);
    this.notifyValue();
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

  valueChange() {
    const value = this.input.nativeElement.value;
    this.subject$.next(value);
  }

  private notifyValue() {
    if (this.data.length > 0) {
      this.onChange(this.data);
    } else {
      this.onChange(null);
    }
    this.input.nativeElement.value = '';
    this.subject$.next('');
    this.onTouch();
  }
}
