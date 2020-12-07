import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '../../domain/product';
import { ProductValidationService } from '../../services/product-validation.service';

@Component({
  selector: 'jworks-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductFormComponent implements OnInit {

  productForm = this.formBuilder.group({
    id: [''],
    name: ['', Validators.required],
    description: [''],
    productCode: ['', null, this.productValidationService.productCodeInUse]
  });

  constructor(
    private formBuilder: FormBuilder,
    private productValidationService: ProductValidationService,
    @Inject(MAT_DIALOG_DATA) private data: { selectedProduct: Product },
    private matDialogRef: MatDialogRef<ProductFormComponent, Product>,
  ) { }

  ngOnInit(): void {
    if (this.data?.selectedProduct) {
      this.productForm.patchValue(this.data?.selectedProduct);
      this.productValidationService.currentId = this.data?.selectedProduct.id;
    } else {
      this.productForm.reset();
    }
  }

  onSubmit() {
    if (this.productForm.valid) {
      this.matDialogRef.close(this.productForm.value);
    } else {
      this.productForm.markAllAsTouched();
    }
  }
}
