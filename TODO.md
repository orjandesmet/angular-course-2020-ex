# Exercises Chapter 10

These exercises are to create unit tests.
Instead of `ng serve`, we'll now use `ng test`. 

## 1. Adding synchronous tests

Go to **new-product.component.spec.ts** and add a test for `onFormSubmit`.
The test should evaluate if the `addProduct` function has been called and if the router has been navigated.

To do this, you can set up a spy on the services' functions like this:

```typescript
const sandboxService = fixture.debugElement.injector.get(ProductSandboxService);
spyOn(sandboxService, 'addProduct');

const router = fixture.debugElement.injector.get(Router);
spyOn(router, 'navigate');
```

After the function being tested is run, you can evaluate if the spy has been triggered like this:

```typescript
expect(sandboxService.addProduct).toHaveBeenCalledWith(testProduct);
expect(router.navigate).toHaveBeenCalled();
```

# 2. Adding asynchronous tests

Go to **product.service.ts** and add the tests for `getProducts`.
The test should evaluate if the request has been made to the correct url and that it either passes params or not.
A second requirement is that the test should also return the list of products.

The first part is similar to synchronous tests.
The second part is more difficult, because we're handling asynchronous data here.

To solve this, you'll need to create a TestScheduler.
This can be done like this:

```typescript
const testScheduler = new TestScheduler((actual, expected) => {
  expect(actual).toEqual(expected);
});
```

You can also put this in a function, similar to the one in **product-validation.service.ts**.

After the testScheduler is created, you can use its `run` method to simulate an asynchronous environment.

```typescript
testScheduler.run(({hot, cold, expectObservable, flush}) => {
  // Everything happening here runs in a simulated asynchronous environment
});
```

The `httpClient`'s get function will return an observable with type `Product[]`. This can be simulated like this:

```typescript
const products: Product[] = [
  {id: '1', name: 'Product1', description: '', productCode: 'P1'},
  {id: '2', name: 'Product2', description: '', productCode: 'P2'},
];
getSpy.and.returnValue(cold('---(p|)', {p: products}));
```

The `---(p|)` means that on frame 3 the list of products is emitted, as well as a complete signal.

To evaluate if the result is the same, you can use `expectObservable` like this:

```typescript
expectObservable(service.getProducts()).toBe('---(p|)', {p: products});
```

# 3. You can do the same for other components and services

Use `ng test --code-coverage` to generate a code coverage report.

This will generate a folder, named **coverage**, which will contain the coverage report.
Open the **coverage/index.html** file in the browser to see the coverage report.