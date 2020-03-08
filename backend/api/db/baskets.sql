CREATE TABLE bazaar.baskets(
    basket_id int NOT NULL,
    user_id nvarchar(150),
    product_id int,
    product_quantity int,
    product_price int,
    created_on DATETIME,
    CONSTRAINT PK_baskets PRIMARY KEY (basket_id)
)