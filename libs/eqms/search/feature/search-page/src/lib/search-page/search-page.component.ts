import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'qad-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css'],
})
export class SearchPageComponent implements OnInit {
  title = 'Search page';
  constructor(private route: ActivatedRoute) {
    route.params.pipe(untilDestroyed(this)).subscribe(params => {
      this.title = params['systemName'];
    });
  }

  ngOnInit(): void {}
}
