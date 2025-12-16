-- Create Tables
CREATE TABLE branches (
    branch_id INT PRIMARY KEY, 
    branch_address TEXT,
    branch_name TEXT
);

CREATE TABLE customers (
    customer_id INT PRIMARY KEY,
    customer_name TEXT,
    customer_username TEXT,
    customer_password TEXT
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

CREATE TABLE appointments (
    appointment_id INT,
    customer_id INT,
    branch_id INT,
    appointment_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) references customers (customer_id),
    FOREIGN KEY (branch_id) references branches (branch_id)
);

-- Add Data
INSERT INTO customers (customer_id, customer_name, customer_username, customer_password) VALUES
    (1, 'Dave Johnson', 'djohnson', 'cakeisalie'),
    (2, 'Joss Carter', 'carter2', 'police4life'),
    (3, 'Lindon Arelius', 'lindon', 'twinstars'),
    (4, 'Ronald McDonald', 'mickyd', 'happymeal'),
    (5, 'Lucas Fox', 'lfox', 'webribedlucas');
INSERT INTO branches (branch_id, branch_address, branch_name) VALUES
    (1, 'One Fountain Plz, Buffalo, NY 1403', 'Fountain Plaza'),
    (2, '6000 South Park Ave, Hamburg, NY 14075', 'Hamburg'),
    (3, '709 Elmwood Ave, Buffalo, NY 14203', 'Elmwood Plaza');
INSERT INTO boxes (box_id, box_number, branch_id, box_cost) VALUES
    (1, 100, 1, 29.99),
    (2, 101, 1, 29.99),
    (3, 102, 1, 29.99),
    (4, 200, 1, 29.99),
    (5, 100, 2, 29.99),
    (6, 105, 2, 29.99),
    (7, 106, 2, 29.99),
    (8, 205, 2, 29.99),
    (9, 306, 3, 29.99),
    (10, 401, 3, 29.99),
    (11, 599, 3, 29.99);
INSERT INTO customer_to_boxes (box_id, customer_id, rel_code) VALUES
    (1, 1, 'PRI'),
    (1, 5, 'SEC'),
    (2, 2, 'PRI'),
    (3, 3, 'PRI');
INSERT INTO box_history (box_id, event_type, event_date) VALUES
    (1, 'opened', NOW() - INTERVAL '5 minutes'),
    (1, 'closed', NOW()),
    (2, 'opened', NOW());
INSERT INTO payment_history (box_id, customer_id, payment_amount) VALUES
    (1, 1, 15.60);
INSERT INTO appointments(appointment_id, customer_id, branch_id, appointment_date) VALUES
    (1, 1, 1, '2025-12-25 12:00:00-05:00');
