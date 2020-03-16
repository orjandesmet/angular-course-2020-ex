import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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

  @Output() formSubmit = new EventEmitter<Product>();
  @Output() deleteProduct = new EventEmitter<string>();
  @Input() set selectedProduct(product: Product) {
    if (this.productForm) {
      if (product) {
        this.productForm.patchValue(product);
      } else {
        this.productForm.reset();
      }
    }
    this.productValidationService.currentId = product?.id;
  }

  constructor(
    private formBuilder: FormBuilder,
    private productValidationService: ProductValidationService
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.productForm.valid) {
      this.formSubmit.emit(this.productForm.value);
    } else {
      this.productForm.markAllAsTouched();
    }
  }

  onDeleteClicked() {
    if (this.productForm.get('id').value) {
      this.deleteProduct.emit(this.productForm.get('id').value);
      this.productForm.reset();
    }
  }
}
