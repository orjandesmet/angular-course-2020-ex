# Exercises Chapter 5

Now we're getting somewhere.
These exercises need a backend service.
Rerun `npm install` or `yarn install` to install the `json-server` dependency.
You can start the mock backend service with the command `node backend.js`.

To help during development, it's easier to serve with AOT-compilation disabled: `ng serve --aot=false`.

## 1. Requesting data from the backend

* Import the `HttpClientModule` into your `AppModule`.
* Add `HttpClient` as a private dependency of `ProductService`.
* Even though `HttpClient` isn't explicitly part of the `ProductModule`, it will still work because it will be inherited from the parent module.
* Let `getProducts` return a http GET of `http://localhost:8080/products`.
The compiler will fail.
The reason is that http.get returns an `Observable`, in this case of type `any`, but the function expects to return `Product[]`.
Change it so the return type is `Observable<Product[]>`.
Give a type to the `get` function indicating that this get method does return `Observable<Product[]>`.
* Since `getProducts` now returns an asynchronous stream, update **products.component.ts**, so that the data is set in a subscription.

```typescript
this.productService.getProducts().subscribe(products => {
  this.data = products;
})
```

Why are you not seeing the data in the table?
The reason is that the product table component is only setting the data at `ngOnInit`.
This has to change to any time the data is updated.
You can change the `@Input() data: Product[] = []` to set the dataSource's value every time the data is changed:

```typescript
private _data: Product[] = [];
@Input() set data(newData: Product[]) {
  this._data = newData || [];
  if (this.dataSource) {
    this.dataSource.data = this._data;
  }
}
get data() { return this._data; }
```

However, this will still not work.
This is because the default dataSource only handles static data and only evaluates page changes and sort changes.
We want it to evaluate data changes too.
The easiest thing to do, is dive a little into RxJS streams.

* In **product-table-datasource.ts** change the data property to:

```typescript
data$ = new BehaviorSubject<ProductTableItem[]>(EXAMPLE_DATA);
set data(newData: ProductTableItem[]) {
  this.data$.next(newData || []);
}
get data() { return this.data$.getValue(); }
```

And change `observableOf(this.data),` to `this.data$.asObservable()`.

## 2. GET, POST, PUT, DELETE 1 product

* In **product.service.ts** add functions to GET a product with API `http://localhost:8080/products/${id}`.
* In **product.service.ts** add functions to POST a product with API `http://localhost:8080/products`.
* In **product.service.ts** add functions to PUT a product with API `http://localhost:8080/products/${id}`.
* In **product.service.ts** add functions to DELETE a product with API `http://localhost:8080/products/${id}`.
POST and PUT require a body, which should be of type Product.
To make your life easier, these API's return the created/updated entity.
We'll be using them in later chapters.

## 3. Do the same for a the clients module
