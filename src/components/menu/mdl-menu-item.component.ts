import {
  Component,
  Input,
  ElementRef,
  forwardRef,
  Inject
} from '@angular/core';
import { MdlMenuComponent } from './mdl-menu.component';


@Component({
  selector: 'mdl-menu-item',
  host: {
    '[class.mdl-menu__item]': 'true',
    'tabindex': '-1',
    '(click)': 'onClick($event)'
  },
  template: '<ng-content></ng-content>'
})
export class MdlMenuItemComponent {

  @Input('disabled') public disabled: boolean|string;

  public element: HTMLElement;
  // forwardRef is needed because of he circular dependency menu queries menuitems; menuitem needs the parent
  constructor(
    private elementRef: ElementRef,
    @Inject(forwardRef(() => MdlMenuComponent)) private mdlMenu: MdlMenuComponent) {
    this.element = elementRef.nativeElement;
  }

  protected onClick($event) {
    if (this.disabled == false || this.disabled == '') {
      $event.stopPropagation();
      return;
    }
    this.mdlMenu.hideOnItemClicked();
  }
}