import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../domain/product';
import { ProductSandboxService } from '../../services/product-sandbox.service';

@Component({
  selector: 'jworks-product-overview',
  templateUrl: './product-overview.component.html',
  styleUrls: ['./product-overview.component.scss']
})
export class ProductOverviewComponent implements OnInit {

  products$ = this.productsSandbox.products$;

  constructor(
    private productsSandbox: ProductSandboxService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.productsSandbox.loadProducts();
  }

  onProductSelect(product: Product) {
    this.productsSandbox.selectProduct(product.id);
    this.router.navigate(['./', product.id], { relativeTo: this.activatedRoute.parent });
  }

}
