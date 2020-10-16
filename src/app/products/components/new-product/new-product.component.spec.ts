import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Product } from '../../domain/product';
import { ProductSandboxService } from '../../services/product-sandbox.service';
import { NewProductComponent } from './new-product.component';


describe('NewProductComponent', () => {
  let component: NewProductComponent;
  let fixture: ComponentFixture<NewProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [ NewProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onFormSubmit', () => {
    it('should add the product with the sandbox and navigate', () => {
      const sandboxService = fixture.debugElement.injector.get(ProductSandboxService);
      spyOn(sandboxService, 'addProduct');
      const router = fixture.debugElement.injector.get(Router);
      spyOn(router, 'navigate');
      const product: Product = { id: '', name: '', description: '', productCode: '' };
      component.onFormSubmit(product);
      expect(sandboxService.addProduct).toHaveBeenCalledWith(product);
      expect(router.navigate).toHaveBeenCalled();
    })
  });
});
