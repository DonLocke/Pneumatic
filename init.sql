-- Create Tables
CREATE TABLE branches (
    branch_id INT PRIMARY KEY, 
    branch_address TEXT,
    branch_name TEXT
);

CREATE TABLE customers (
    customer_id INT PRIMARY KEY,
    customer_name TEXT
);

CREATE TABLE boxes (
    box_id INT PRIMARY KEY,
    box_number INT,
    branch_id INT,
    box_cost DECIMAL,
    FOREIGN KEY (branch_id) REFERENCES branches (branch_id)
);

CREATE TYPE relationship_code AS ENUM ('PRI', 'SEC');

CREATE TABLE customer_to_boxes (
    box_id INT,
    customer_id INT,
    rel_code relationship_code,
    PRIMARY KEY (box_id, customer_id),
    FOREIGN KEY (box_id) REFERENCES boxes (box_id),
    FOREIGN KEY (customer_id) REFERENCES customers (customer_id)
);

CREATE TYPE box_event AS ENUM ('opened', 'closed');

CREATE TABLE box_history (
    box_id INT,
    event_type box_event,
    event_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (box_id, event_date),
    FOREIGN KEY (box_id) REFERENCES boxes (box_id)
);

CREATE TABLE payment_history (
    box_id INT,
    customer_id INT,
    payment_amount DECIMAL,
    payment_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (box_id) REFERENCES boxes (box_id),
    FOREIGN KEY (customer_id) REFERENCES customers (customer_id)
);

-- Add Data
INSERT INTO customers (customer_id, customer_name) VALUES (1, 'Dave Johnson');
INSERT INTO branches (branch_id, branch_address, branch_name) VALUES (1, '1 Seneca St. Buffalo NY, 14216', 'Seneca One');
INSERT INTO boxes (box_id, box_number, branch_id, box_cost) VALUES (1, 1, 1, 29.99);
INSERT INTO customer_to_boxes (box_id, customer_id, rel_code) VALUES (1, 1, 'PRI');
INSERT INTO box_history (box_id, event_type) VALUES (1, 'opened');
INSERT INTO payment_history (box_id, customer_id, payment_amount) VALUES (1, 1, 15.60);