import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'qad-load-error',
  templateUrl: './load-error.component.html',
  styleUrls: ['./load-error.component.scss']
})
export class LoadErrorComponent implements OnInit {

  @Input() message: string = ''
  constructor() { }

  ngOnInit(): void {
  }

}
