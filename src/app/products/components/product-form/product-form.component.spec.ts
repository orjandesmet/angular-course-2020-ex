import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { ProductValidationService } from '../../services/product-validation.service';
import { ProductFormComponent } from './product-form.component';

const mockValidationService = {
  currentId: 'temporary-test-id',
  productCodeInUse: (control: AbstractControl) => { return of(null); }
}

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      providers: [{
        provide: ProductValidationService,
        useValue: mockValidationService
      }],
      declarations: [ ProductFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onSubmit', () => {
    it('should emit formSubmit if form valid', () => {
      const product = {id: 'my-id', name: 'my-name', description: 'my-description', productCode: 'my-productCode'};
      component.productForm.patchValue(product);
      expect(component.productForm.valid).toBeTruthy();
      const formSubmitSpy = spyOn(component.formSubmit, 'emit');
      component.onSubmit();
      expect(formSubmitSpy).toHaveBeenCalledWith(product);
    });

    it('should not emit formSubmit if form not valid', () => {
      const product = {id: 'my-id', name: '', description: 'my-description', productCode: 'my-productCode'};
      component.productForm.patchValue(product);
      expect(component.productForm.valid).toBeFalsy();
      const formSubmitSpy = spyOn(component.formSubmit, 'emit');
      const markAllAsTouchedSpy = spyOn(component.productForm, 'markAllAsTouched');
      component.onSubmit();
      expect(formSubmitSpy).not.toHaveBeenCalled();
      expect(markAllAsTouchedSpy).toHaveBeenCalled();
    });
  });
});
