CREATE TABLE bazaar.products(
    product_id int NOT NULL,
    product_name nvarchar(150),
    product_desc nvarchar(1200),
    product_image nvarchar(200),
    product_category int,
    CONSTRAINT PK_products PRIMARY KEY (product_id)
)