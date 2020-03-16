import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../domain/product';
import { ProductSandboxService } from '../../services/product-sandbox.service';

@Component({
  selector: 'jworks-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {

  constructor(
    private productSandboxService: ProductSandboxService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  onFormSubmit(product: Product) {
    this.productSandboxService.addProduct(product);
    this.router.navigate(['./'], { relativeTo: this.activatedRoute.parent });
  }

}
