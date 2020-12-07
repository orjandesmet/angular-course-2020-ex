import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { Product } from '../../domain/product';
import { ProductSandboxService } from '../../services/product-sandbox.service';
import { ProductFormComponent } from '../product-form/product-form.component';

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
    private activatedRoute: ActivatedRoute,
    private matDialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.productsSandbox.loadProducts();

    this.activatedRoute.queryParamMap.pipe(
      filter((paramMap) => paramMap.get('new') === 'true' || (paramMap.get('edit') === 'true' && !!paramMap.get('id'))),
      switchMap((paramMap) => this.products$.pipe(
        map((products) => products.find((product) => product.id === paramMap.get('id'))),
        filter((product) => !!product || !paramMap.get('id')),
        take(1),
      )),
      switchMap((product) => {
        return this.matDialog.open(ProductFormComponent, {data: { selectedProduct: product }}).afterClosed();
      }),
      tap(() => {
        this.router.navigate(['./'], { relativeTo: this.activatedRoute });
      }),
      filter((newOrUpdatedProduct) => !!newOrUpdatedProduct)
    ).subscribe((newOrUpdatedProduct) => {
      if (newOrUpdatedProduct.id) {
        this.productsSandbox.updateProduct(newOrUpdatedProduct);
      } else {
        this.productsSandbox.addProduct(newOrUpdatedProduct);
      }
    });
  }

  onProductSelect(product: Product) {
    this.productsSandbox.selectProduct(product.id);
    this.router.navigate(['./', product.id], { relativeTo: this.activatedRoute.parent });
  }

  onAdd() {
    this.router.navigate(['./'], {relativeTo: this.activatedRoute, queryParams: {new: 'true'}});
  }

  onEdit(product: Product) {
    this.router.navigate(['./'], {relativeTo: this.activatedRoute, queryParams: {id: product.id, edit: 'true'}});
  }

  onDelete(product: Product) {
    this.productsSandbox.deleteProduct(product.id);
  }

}
