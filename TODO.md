# Exercises Chapter 4

To help during development, it's easier to serve with AOT-compilation disabled: `ng serve --aot=false`.

## 1. The ProductService

* Create the service

```bash
ng generate service products/services/product
```

When entering a path as the name of the service, the service will automatically be created in that path.
Even when that path does not yet exist.

The service can be `providedIn: 'root'`.
There is no need to change anything from the default values for now.

## 2. Implement the service's function `getProducts` to return an array of `Product`

* Create a function named `getProducts` and set the return value to `Product[]`

```typescript
getProducts(): Product[] {

}
```

For now you can choose what this service returns, as long as they are valid products.

## 3. Display the product array as the data of `ProductsComponent`

* In **products.component.ts**, inject the newly created `ProductService` as a private variable.
* In **ngOnInit** set the component's data value to the return value of the productService's `getProducts` method.

## 4. Create a Table using @angular/material to display the products

Angular comes with a neat tool, called schematics.
You've been using them already using the `ng generate` command.
These schematics can be extended easily (learn more via The Frontend Architecture Competence Center).
[`@angular/material` extends these schematics out of the box](https://material.angular.io/guide/schematics).

* Create a table component using

```bash
ng generate @angular/material:table products/components/product-table
```

This command will have generated a couple of files:
The component class, template, stylesheet and test files and a **product-table-datasource.ts** file which holds all the information for displaying the table data.

* Edit the **product-table-datasource.ts** file, replacing the default interface `ProductTableItem` and the `EXAMPLE_DATA` with

```typescript
export type ProductTableItem = Product;

const EXAMPLE_DATA: ProductTableItem[] = [];
```

* Add an `@Input() data: Product[] = []` property to **product-table.component.ts** to set the product table data.
* In `ngOnInit`, set the `dataSource.data` property to `this.data`.

* Add the product table in the template of **products.component.html**, removing the existing `<pre>` tags.
Don't forget to set the component's data property.

Now the table should display your data records, displaying both the id and the name.
Using this schematic, the table already has sortable headers and pagination built in.

## 5. Do the same for a the clients module

You'll probably notice some errors.
The reason is that the Client model does not have a property name, which is used for sorting.
Instead of a property name, we can use the function `clientFullName(client: Client): string` to return the Client's full name.

## 6. The full name pipe

You'll see that the name column for clients is empty.
That is because the name property does not exist on the Client model.

`MatTable` works with column definitions, which are defined in the table's template.
In **client-table.component.html** you'll find column definitions for the columns id and name.
We'll edit the id and name definition so that the column displays the full name instead.

* Create a fullName pipe to be used by this column:

```bash
ng generate pipe clients/pipes/full-name
```

This pipe will automatically be declared in your clients module.
Now we just have to define what it does.

* In **full-name.pipe.ts** edit the transform function so that it takes a client as parameter and returns a string.
* Let the function return the value of `clientFullName(client)`.
* In **client-table.component.html** edit the cell definition of the name column so that it uses this pipe:

```html
<td mat-cell *matCellDef="let row">{{ row | fullName }}</td>
```

**!!The reason we use a pipe here, is because tables can display a lot of data, which mostly is very static. A pipe only updates its response when its input changes (like a Memoized function). This triggers less change detection work and makes your application more performant. Always use pipes to transform data in a table and never call a function directly!!**
