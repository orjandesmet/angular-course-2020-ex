# Exercises Chapter 3

To help during development, it's easier to serve with AOT-compilation disabled: `ng serve --aot=false`.

## 1. Add a module for products

* Create the modules

```bash
ng generate module products
```

## 2. The products component

* Create the component

```bash
ng generate component products
```

* Add the `<jworks-products>` to **app.component.html**.
Don't mind `<router-outlet>` for now. That's for a later chapter.
The application will not display the component, why is that?
Come on, you should know this by now.
To fix it, import the `ProductsModule` into the `AppModule`.
It's still not displaying?
* Export the component, by adding it to the `ProductsModule`'s `exports` array.

## 3. Do the same for a clients module
