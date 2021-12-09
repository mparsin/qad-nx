import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  fadeInRight400ms,
  fadeInUp400ms,
  stagger40ms,
} from '@qad-nx/shared-animations';

@Component({
  selector: 'eqms-search-menu',
  templateUrl: './search-menu.component.html',
  styleUrls: ['./search-menu.component.scss'],
  animations: [fadeInRight400ms, stagger40ms, fadeInUp400ms],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchMenuComponent implements OnInit {
  @Input() displayName = '';
  @Input() isPager: boolean = true;
  @Output() pagingChanged = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  pagerChanged(event: any) {
    console.log('pagerchanged', event);
    this.pagingChanged.emit(event.checked);
  }
}
