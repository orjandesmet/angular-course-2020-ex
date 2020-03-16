import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Product } from '../../domain/product';
import { ProductSandboxService } from '../../services/product-sandbox.service';

@Component({
  selector: 'jworks-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  selectedProduct$ = this.activatedRoute.data.pipe(map(data => data.product));

  constructor(
    private productSandboxService: ProductSandboxService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  onDeleteProduct(productId: string) {
    this.productSandboxService.deleteProduct(productId);
    this.navigateToOverview();
  }

  onFormSubmit(product: Product) {
    if (product.id) {
      this.productSandboxService.updateProduct(product);
    } else {
      this.productSandboxService.addProduct(product);
    }
    this.navigateToOverview();
  }

  navigateToOverview() {
    this.router.navigate(['./'], { relativeTo: this.activatedRoute.parent });
  }

}
