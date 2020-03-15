# Exercises Chapter 6

These exercises need a backend service.
Rerun `npm install` or `yarn install` to install the `json-server` dependency.
You can start the mock backend service with the command `node backend.js`.

To help during development, it's easier to serve with AOT-compilation disabled: `ng serve --aot=false`.

## 1. Adding a product

* Start by creating a product-form component in the products module.
You should know how to do that by now.
* Add the newly created component at the bottom of the `ProductsComponent`.
* We'll be using Reactive Forms, so import the `ReactiveFormsModule` into `ProductsModule`.
This module exposes directives and not services, that is why it cannot be inherited from a parent module (like `AppModule`) and has to be imported in `ProductsModule`.
* Inject the `FormBuilder` into your `ProductFormComponent`.
* Create the productForm model:

```typescript
productForm = this.formBuilder.group({
  name: ['', Validators.required],
  description: [''],
  productCode: ['']
});
```

This will create a form group with 3 fields, of which `name` will be required.

* Create a function `onSubmit()`, which will be called when the form is submitted.
For now, let this function just output your values to console.

```typescript
onSubmit() {
  console.log(this.productForm.value);
}
```

* Set the template for the `ProductFormComponent` to:

```html
<form [formGroup]="productForm" novalidate (ngSubmit)="onSubmit()">
  <mat-card class="product-card">
    <mat-card-content>
      <mat-form-field class="full-width">
        <input matInput placeholder="Name" formControlName="name">
      </mat-form-field>
      <mat-form-field class="full-width">
        <input matInput placeholder="Description" formControlName="description">
      </mat-form-field>
      <mat-form-field class="full-width">
        <input matInput placeholder="Product Code" formControlName="productCode">
      </mat-form-field>
    </mat-card-content>
    <mat-card-actions>
      <button mat-raised-button color="primary" type="submit">Submit</button>
    </mat-card-actions>
  </mat-card>
</form>
```

We're using components and directives from `@angular/material` here.
Can you identify them and import the modules they come from into `ProductsModule`?

* The form should be visible in your application.
You can test it and see that the field `name` is required and that it becomes red when you leave the field empty.
However, we can still submit the invalid form.

* Change the onSubmit function so that the form cannot be submitted when the form is not valid.
Instead set the form as touched, so that all fields with errors become red after submit is clicked.

```typescript
onSubmit() {
  if (this.productForm.valid) {
    console.log(this.productForm.value);
  } else {
    this.productForm.markAllAsTouched();
  }
}
```

* Create an `@Output() formSubmit` property on the `ProductFormComponent` that will emit the form value when it is valid.
* In the `ProductsComponent`, respond to this event by passing the data to the `ProductsService`.
Don't forget that http POST is an Observable and needs to be subscribed upon.
Otherwise it would do nothing.
If the POST is successful, add the created product (the POST response) to the `data` property.
If it isn't successful, give an alert.

```typescript
onFormSubmit(product: Product) {
  this.productService.createProduct(product).subscribe(newProduct => {
    this.data = this.data.concat(newProduct);
  }, error => {
    alert(error);
  });
}
```

## 2. Updating a product

We'll use the same form component to update the product.

* Add an `@Output() productSelect` property to **products-table.component.ts**, which will emit the product that has been selected.
* In **product-table.component.html** change the `mat-row` definition to:

```html
<tr mat-row *matRowDef="let row; columns: displayedColumns;" (click)="productSelect.emit(row)"></tr>
```

* In your `ProductsComponent` set a variable `selectedProduct` to the value of this event.

```html
<jworks-product-table [data]="data" (productSelect)="selectedProduct = $event"></jworks-product-table>
```

* Add an `@Input() set selectedProduct(product: Product) {}` setter to `ProductFormComponent` and make it set the form value with `this.productForm.patchValue(product)`.
Do you know why we use `patchValue` instead of `setValue`?

* Now set this attribute in **products.component.html**.

Now we just need to know when the form's submit button should update or create a product.
We can do this based on the product already having an id.

* Add a form field `id` to the product form.
(You can display the value of the id in your template with `{{ productForm.get('id').value }}` if you want.)
* In the `onFormSubmit` of **products.component.ts**, check if the product has an id. If not, then keep using `createProduct`, otherwise use `updateProduct` in a similar fashion.

```typescript
this.productService.updateProduct(product).subscribe(newProduct => {
  this.data = this.data.map(oldProduct => oldProduct.id === product.id ? newProduct : oldProduct);
}, error => {
  alert(error);
});
```

## 3. Deleting a product

* We'll add a secondary button to delete a product in **product-form.component.html**.

```html
<button mat-raised-button color="warn" type="button" *ngIf="productForm.get('id').value" (click)="onDeleteClicked()">Delete</button>
```

* Create an `@Output() deleteProduct` function, which should emit the product id to be deleted.
* Create a function `onDeleteClicked`, which emits the value of `productForm.get('id').value` on this Output and then resets the form.
* In your ProductsComponent, create a function `onDeleteProduct`, which should be called when your `ProductForm` emits `deleteProduct` and which should call the service's `deleteProduct` function and on success remove the product from the data.

```typescript
onDeleteProduct(productId: string) {
  this.productService.deleteProduct(productId).subscribe(_ => {
    this.data = this.data.filter(product => product.id !== productId);
  }, error => {
    alert(error);
  });
}
```

## 4. Do the same for a the clients module

## 5. Validators

The name of a product is required, so is the firstName of a client.
But we could add a validator that birthday should be of a certain pattern.

* Use the validator `Validators.pattern('\d{2}\/\d{2}\/\d{4}')` for that field.

We can also create a specific validator to make sure that a product's product code is not already in use.
This will be an asynchronous validator.
The request will be sent to our backend and the response will determine if the code is already in use.
To do this, we'll use the GET products request with a custom query parameter for productCode.
If the request returns an empty array, the product code is still available, if not, it isn't and then the validator should return a ValidationError.

* In **product.service.ts** add an optional parameter `productCode` to the `getProducts` function.
* Create a HttpParams object which adds productCOde if it is not empty.

```typescript
getProducts(productCode?: string): Observable<Product[]> {
  let params = new HttpParams();
  if (productCode) {
    params = params.set('productCode', productCode);
  }
  return this.httpClient.get<Product[]>(this.API_URL, { params });
}
```

* Now create a `product-validation` service and inject it into ProductFormComponent.
* The `ProductValidationService` should itself inject `ProductService`.
* Create a function `productCodeInUse`, which takes an `AbstractControl` as parameter.
* If there is no control, or there is no value in the control, return an Observable of null.

```typescript
productCodeInUse = (control: AbstractControl): Observable<null | { productCodeInUse: boolean }> => {
  if (!control || !control.value) {
    return of(null);
  } else {

  }
}
```

* In the other case, return the result of `productService.getProducts(productCode)` function.
* We'll be using a little RxJS here too.
The getProducts function returns an Observable of `Product[]`, but we'll need an Observable of either `null` or `{ productCodeInUse: true }`.
To get there, we will *pipe* the result to our likings.
We will use the *map* pipe, which we can compare to the `Array.map` function, in the way that it modifies each item on the stream in a similar function.

```typescript
return this.productService.getProducts(control.value).pipe(
  map(products => products.length > 0 ? { productCodeInUse: true } : null),
  take(1)
);
```

For good measure, the `take(1)` is added so that only the first item in the stream is used.

* We can now use this validator in our form, by adding it to the form control's definition:

```typescript
productCode: ['', null, this.productValidationService.productCodeInUse]
```

* Display the validations by using `mat-error` inside the `mat-form-field`-tag in the template of your form:

```html
<mat-error *ngIf="productForm.get('productCode').hasError('productCodeInUse')">This product code is already in use</mat-error>
```

Attentive people might have noticed a fault here.
When editing a product, the validator for producCodeInUse will be triggered.
Obviously, it is in use by the very product you're trying to edit.

* To fix this, add a property `currentProductId` to the `ProductValidationService` and let it be set, every time the selectedProduct changes.

```typescript
this.productValidationService.currentId = product?.id;
```

* Then update the validation function to take this property into account.

```typescript
return this.productService.getProducts(control.value).pipe(
  map(products => products
    .filter(product => product.id !== this.currentId)
    .length > 0 ? { productCodeInUse: true } : null
  ),
  take(1)
);
```

This is actually a little bit of a nasty fix, because we're introducing a side effect in a stream, but that's a different topic, regarding RxJS which is not covered in this course.
