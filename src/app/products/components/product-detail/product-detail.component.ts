import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'jworks-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailComponent implements OnInit {

  constructor(
  ) { }

  ngOnInit(): void {
  }

}
