# Exercises Chapter 2

To help during development, it's easier to serve with AOT-compilation disabled: `ng serve --aot=false`.

## 1. Create a header and sidebar component

* Create the components

  ```bash
  ng generate component header
  ng generate component sidebar
  ```

* Add the components on the corresponding place in **app.component.html**

## 2. We'll style the header using `@angular/material`

* Replace the content of **header.component.html** with:

```html
<mat-toolbar class="main-header mat-toolbar mat-primary mat-toolbar-single-row" color="primary">
  <div class="branding">
    <div class="logo">my title</div>
  </div>
</mat-toolbar>
```

* Replace the content of **header.component.scss** with

```scss
.spacer {
    flex: 1 1 auto;
}
  ```

* The application will no longer work, because we added a component `mat-toolbar` from `@angular/material`, which the application does not know.
To fix this, import `MatToolbarModule` from `@angular/material/toolbar` into your `AppModule`.

## 3. Adding an `@Input` property

* Add `@Input() appTitle: string;` into **header.component.ts**.
* In **header.component.html**, replace `my title` with `{{ appTitle }}`.
* Set the `appTitle` property of `jworks-header` to your app's `title` in **app.component.html**.

## 4. Adding an `@Output` property

* In **header.component.ts**, add `@Output() toggle = new EventEmitter();`.
This toggle will be used to show or hide the sidebar.
* Add a function `toggleSidebar()` which calls this toggle's `emit` function.
* Add a `<button>` to the toolbar, which calls `toggleSidebar()` when clicked upon.
* In **app.component.html**, set the function to be performed by the `toggle` event of `jworks-header` to `sidenav.toggle()`.
Clicking the button will now show or hide the sidebar.
Test it out!

## 5. Styling the toggle button by using material components and directives

* Set the content of the button to

```html
<mat-icon>menu</mat-icon>
```

The application will no longer compile, why is that?
Exactly, the new component isn't recognized by Angular.
To fix this, import `MatIconModule` from `@angular/material/icon` into your `AppModule`.

* The button still looks weird.
Add the directive `mat-icon-button` to the button and import `MatButtonModule` like you probably already know by now.
* Shout out which kind of directive this is!
