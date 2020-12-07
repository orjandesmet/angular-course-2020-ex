# Exercises Chapter 11 - Modals

Instead of having the product and client forms route to a separate page, we'll move them to modals.
Moreover we'll make these modals routable, so that they can be navigated to directly.

## 1. Adding action buttons to the table

The table already contains a columns for action buttons, but no actual action buttons.
Add them by using `MatMenuModule` and `MatButtonModule`.

```html
<button mat-button [matMenuTriggerFor]="menu">Actions</button>
<mat-menu #menu="matMenu">
  <button mat-menu-item (click)="edit.emit(row)">
    <span>Edit</span>
  </button>
  <button mat-menu-item (click)="delete.emit(row)">
    <span>Delete</span>
  </button>
</mat-menu>
```

Don't forget to remove the click handler on the `<tr>`.

## 2. Adding modals

We'll leverage Angular Materials `MatDialogModule` for this, so import it into your `ProductsModule`.
Now inject `MatDialog` into **product-overview.component.ts**

`MatDialog` allows to `open` a certain component or a template reference as a modal.

This class already has a function for `onDelete`, so the delete button in the menu should already work.
We'll call the form dialog in the `onEdit` function.


```typescript
this.matDialog.open(ProductFormComponent);
```

If we now click the edit action on a row, you should see the form as a popup.
However, the data is no longer prefilled.
That is because the data used to be prefilled with the `@Input` property.
With a modal, this isn't possible.
Instead we can inject the data using dependency injection.

In **product-form.component.ts**, inject `MAT_DIALOG_DATA` like this:

```typescript
@Inject(MAT_DIALOG_DATA) private data: { selectedProduct: Product },
```

Now in `ngOnInit`, we can prefill the form with the selectedProduct.

```typescript
ngOnInit(): void {
  if (this.data?.selectedProduct) {
    this.productForm.patchValue(this.data?.selectedProduct);
    this.productValidationService.currentId = this.data?.selectedProduct.id;
  } else {
    this.productForm.reset();
  }
}
```

We can remove `@Input() set selectedProduct()`, because we won't be needing it anymore.
Now to pass the data to the dialog, we can add the required data to the second argument of the `open` function.

```typescript
this.matDialog.open(ProductFormComponent, {data: { selectedProduct: product }});
```

## 3. Getting data from the modals

Using `afterClosed()` after the `open` function, we can get a stream of the data being passed from the modal.

```typescript
this.matDialog.open(ProductFormComponent, {data: { selectedProduct: product }})
.afterClosed()
.pipe(filter((updatedProduct) => !!updatedProduct))
.subscribe((updatedProduct) => {
  this.productsSandbox.updateProduct(updatedProduct);
});
```

Now the data can be received by the calling component, but it still needs to be sent.
In order to do that, we'll have to update **product-form.component.ts** again.
`@Output` won't work, so you can remove those.

Instead, we'll just close the dialog on submit.
To do that, inject `MatDialogRef` into the ProductFormComponent.

```typescript
private matDialogRef: MatDialogRef<ProductFormComponent, Product>
```

And when the form is valid, close the dialog using:

```typescript
this.matDialogRef.close(this.productForm.value);
```

A similar method can be used in `onAdd`, with the only difference that you don't need to pass a selectedProduct.

```typescript
this.matDialog.open(ProductFormComponent)
.afterClosed()
.pipe(filter((addedProduct) => !!addedProduct))
.subscribe((addedProduct) => {
  this.productsSandbox.addProduct(addedProduct);
});
```

## 4. Making the modals routable

To make the modals routable, there are a couple of methods, but the easiest is to set a query parameter in the url.
You can set a query parameter on an already openend path, by routing to itself

```typescript
this.router.navigate(['./'], { relativeTo: this.activatedRoute, queryParams: { paramName: 'value' } });
```

We'll leverage this to set a query parameter `new` to true when a new product should be added or  `id` to the selected id and `edit` to true when a product should be edited.

```typescript
onAdd() {
    this.router.navigate(['./'], {relativeTo: this.activatedRoute, queryParams: {new: 'true'}});
}

onEdit(product: Product) {
  this.router.navigate(['./'], {relativeTo: this.activatedRoute, queryParams: {id: product.id, edit: 'true'}});
}
```

Since we're not really leaving the route, the component won't be reloaded completely.
Next, we'll parse the queryParams on init

```typescript
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
```

This will look for the queryParams `new` or `edit`, find the correct product and open the dialog.
After the dialog is closed, we'll clear the queryParams, by navigating back.

Now you can for example, navigate to `http://localhost:4200/products?id=J2&edit=true` and the dialog will pop up immediately.

## 5. Clients module

The same can be done for the clients module

## 6. Bonus

Can you add a modal to only display all the properties on the client overview?
The solution can be seen in the next commit.
