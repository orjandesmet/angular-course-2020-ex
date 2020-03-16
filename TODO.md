# Exercises Chapter 7

These exercises need a backend service.
Rerun `npm install` or `yarn install` to install the `json-server` dependency.
You can start the mock backend service with the command `node backend.js`.

To help during development, it's easier to serve with AOT-compilation disabled: `ng serve --aot=false`.

I added some wrapper components to keep it architecturally correct and to make this exercise a little more focussed on the Routing.

## 1. Adding the routes

When this project was created, the `--routing` parameter was passed.
So the AppModule will already have a corresponding `AppRoutingModule`.
At the mooment there are no routes defined.
But we are going to change that now.

* Add the route with path `products` which should navigate to the `ProductsComponent`.

```typescript
{
  path: 'products',
  component: ProductsComponent
}
```

* Remove the reference to the `ProductsComponent` from `AppComponent`'s template.

You'll see that the products table and form is no longer visible.
It's not even part of the DOM anymore.
When you navigate to `http://localhost:4200/products`, the table is visible again.

* Do the same for the `ClientComponent`, so that navigating to `http://localhost:4200/clients` displays the clients table and form.

## 2. Navigating using the sidebar

It's a bit useless for a single page application to have users change the address manually to navigate.
We're going to change that and use the sidebar component we created earlier.

* In **sidebar.component.html** add an anchor tag with a `routerLink` directive to navigate to either `/products` or `/clients`

```html
<a routerLink="/products">Products</a>
```

Of course, this will look horrible, so let's add some styling to it.
Since a navigation pane is basically an unordered list, surround the links with `<ul>` and each individal link with `<li>`.

* Set the class for the router links when they are active to `active`, using `routerLinkActive="active"`.

This is all you need to do to introduce routing.

## 3. Creating a lazy-loaded sub-module

* Create a new empty `ProductsRoutingModule` in the `products` directory.

```bash
ng generate module products/products-routing --flat
```

* In that module, add the following to imports

```typescript
RouterModule.forChild([
  {
    path: '',
    component: ProductsComponent
  }
])
```

* Also add `RouterModule` to exports.
* You may remove `CommonModule`, because it's not relevant here.
* Import the newly created `ProductsRoutingModule` into the `ProductsModule`.

* Remove the import to `ProductsModule` from `AppModule`.
* Replace the route to `products` in **app-routing.module.ts** to the following:

```typescript
{
  path: 'products',
  loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)
}
```

* Do the same for `ClientsModule`.

## 4. Navigating within sub-modules

We will use this new module to add routing to the sub-path.

Set the routes to:

```typescript
{
  path: '',
  component: ProductsComponent,
  children: [
    {
      path: '',
      component: ProductOverviewComponent
    },
    {
      path: 'new',
      component: NewProductComponent
    },
    {
      path: ':productId',
      component: ProductDetailComponent
    }
  ]
}
```

* Now replace the references to `ProductOverviewComponent` and `ProductDetailComponent` from `ProductsComponent` with a single `<router-outlet></router-outlet>`.
* In **products-overview.component.ts** inject a `Router` service and a `ActivatedRoute` service.
* Add the following to `onProductSelect`:

```typescript
this.router.navigate(['./', product.id], { relativeTo: this.activatedRoute.parent });
```

* Do the same in **product-details.component.ts** and **new-product.component.ts**, navigating to `./` when the form is submitted or the product is deleted.

* Do the same for clients

## 5. Resolving the product before loading the page

Now basic navigation works, but there is still a problem.
When manually navigating to a product detail, using the address bar, for example: `http://localhost:4200/products/J1`, the product isn't loaded and submitting the form will create a new product.
To fix this, we'll need to resolve the product before the page is actually loaded.

* Create a new `product-resolver` service in the `products folder`.

```bash
ng generate service products/product-resolver
```

* This service should implement the `Resolve<Product>` interface, indicating that it should return a `Product` either synchronously or asynchronously.
* Inject the productSandboxService into this new service.
* Implement the resolve function like this:

```typescript
resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> {
  const productId = route.paramMap.get('productId');
  if (!this.productSandboxService.loaded) {
    this.productSandboxService.loadProducts();
  }
  this.productSandboxService.selectProduct(productId);
  return this.productSandboxService.selectedProduct$.pipe(
    filter(product => !!product),
    take(1)
  );
}
```

* Now set the resolver in the routing definitions:

```typescript
{
  path: ':productId',
  component: ProductDetailComponent,
  resolve: {
    product: ProductResolverService
  }
}
```

* To make sure the resolved value is actually used, you can change `selectedProduct$` in **product-detail.component.ts** to:

```typescript
selectedProduct$ = this.activatedRoute.data.pipe(map(data => data.product));
```

* Do the same for `ClientModule`.
