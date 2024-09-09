# My-Products

A sample Nodejs application that uses MongoDB to implement CRUD operations.

## What the app does

A product has following properties:

- ID (primary key for table)
- name
- description
- price

The app supports CRUD (Create, Read, Update, Delete) operations

- [GET] Get the list of all products: `/api/products/` (This is the only api that is accessible through browser. Rest all can only be accessed from a testing tool, e.g. postman)
- [POST] Add a product: `/api/products/` request body:`{ name: string, price: float, description: string }`
- [GET] Get the product of a particulatr id: `/api/products/{id}`  (here id corresponds to mongoDB object ID)
- [PUT] Update a particular product by id: `/api/products/{id}` Request body: `{ name: string, price: float, description: string }`   (here id corresponds to mongoDB object ID)
- [DELETE] delete a particualr product by id: `/api/products/{id}`    (here id corresponds to mongoDB object ID)
