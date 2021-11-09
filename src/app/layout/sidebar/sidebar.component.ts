import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  linkMenus = document.querySelectorAll('.menu__link');

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    // this.renderer.listen(this.el.nativeElement.addEventListener('.menu__link'), (event) => {
    //   console.log('Click');
    // });
  }

  activeMenu(event: Event) {
    console.log(event);
    // this.linkMenus.forEach((menu: Element) => {
    //   menu.classList.remove('menu__link--active');
    // });
  }

  dropdown(event: any) {
    this.linkMenus.forEach((menu) => {
      menu.classList.remove('menu__dropdown-link--active');
    });
    event.target.classList.add('menu__dropdown-link--active');
  }
}
