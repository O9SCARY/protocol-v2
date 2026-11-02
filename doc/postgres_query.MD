### - Documenting postgres

## - query commands to remember
|Query command| Used for|
|--|--|
|Create Table table_name (column_name   type    constraints);| for creating new tables|
|Select * From table_name;| To select all columns from a table|
|Select column_name, column_name From  table_name;| To select specific columns form a table|
|Create Type type_name As Enum ('enum_name','enum_name');| To create new types or enums (to be used for a column)|
|--|--|
|Alter Table table_name|This query is to change the type a column stores in a table.|
|   Alter Column column_name Type type_name|(for this specifically changing the type to an enum.)|
|Using column_name::type_name;| (however, this applies for all created types)|
|--|--|
|ALTER TYPE type_name ADD VALUE 'enum_name';| To add new enum options to a type |

## - Starting query (creating tables)

CREATE TABLE staff (
    staff_id       serial PRIMARY KEY,
    full_name      varchar(255),
    email          varchar(255),
    password_hash  varchar(255),
    role           varchar(20),
    created_at     timestamptz
);

CREATE TABLE customer (
    customer_id    serial PRIMARY KEY,
    customer_name  varchar(255),
    phone_number   varchar(255),
    created_at     timestamptz
);

CREATE TABLE menu_item (
    menu_item_id   serial PRIMARY KEY,
    name           varchar(255),
    description    text,
    category       varchar(255),
    price          numeric(10,2),
    image_url      text,
    is_available   boolean,
    created_at     timestamptz
);

CREATE TABLE reservation (
    reservation_id   serial PRIMARY KEY,
    customer_id      integer REFERENCES customer (customer_id),
    datetime         timestamptz,
    partysize        integer,
    status           varchar(20),
    additional_note  text,
    created_at       timestamptz
);

CREATE TABLE orders (
    order_id         serial PRIMARY KEY,
    customer_id      integer REFERENCES customer (customer_id),
    status           varchar(20),
    additional_note  text,
    total            numeric(10,2),
    order_type       varchar(20),
    payment_mode     varchar(20),
    created_at       timestamptz
);

CREATE TABLE order_item (
    order_item_id   serial PRIMARY KEY,
    order_id        integer REFERENCES orders (order_id),
    menu_item_id    integer REFERENCES menu_item (menu_item_id),
    quantity        integer,
    price_at_order  numeric(10,2)
);

CREATE TABLE delivery (
    delivery_id   serial PRIMARY KEY,
    order_id      integer REFERENCES orders (order_id),
    staff_id      integer REFERENCES staff (staff_id),
    address       text,
    delivered_at  timestamptz
);