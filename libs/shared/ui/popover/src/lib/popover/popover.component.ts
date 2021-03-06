import { Component, OnInit, TemplateRef } from '@angular/core';
import { popoverAnimation } from 'libs/shared/animations/src/lib/popover.animation';
import { PopoverContent, PopoverRef } from './popover-ref';

@Component({
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
  animations: [popoverAnimation],
})
export class PopoverComponent implements OnInit {
  renderMethod: 'template' | 'component' | 'text' = 'component';
  content: PopoverContent | string | null = null;
  context: any;

  constructor(private popoverRef: PopoverRef) {}

  ngOnInit() {
    this.content = this.popoverRef.content;

    if (typeof this.content === 'string') {
      this.renderMethod = 'text';
    }

    if (this.content instanceof TemplateRef) {
      this.renderMethod = 'template';
      this.context = {
        close: this.popoverRef.close.bind(this.popoverRef),
      };
    }
  }
}
