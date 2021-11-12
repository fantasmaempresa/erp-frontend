import { AfterViewInit, Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, AfterViewInit {
  source = '';

  linkMenus!: NodeListOf<Element>;

  dropdowns!: NodeListOf<Element>;

  dropdownIsVisible = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    // this.renderer.listen(this.el.nativeElement.addEventListener('.menu__link'), (event) => {
    //   console.log('Click');
    // });
  }

  ngAfterViewInit(): void {
    this.linkMenus = this.el.nativeElement.querySelectorAll('.menu__link');
  }

  activeMenu(event: Event) {
    this.linkMenus.forEach((menu) => {
      console.log(menu);
      this.renderer.removeClass(menu, 'menu__link--active');
    });
    this.renderer.addClass(event.target, 'menu__link--active');
  }

  dropdown(source: string) {
    this.source = source;
    this.linkMenus.forEach((menu) => {
      this.renderer.removeClass(menu, 'menu__dropdown-link--active');
    });
    this.dropdownIsVisible = !this.dropdownIsVisible;
  }

  log() {
    console.log('CLICK');
  }
}
