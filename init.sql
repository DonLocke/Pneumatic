-- Create Tables
CREATE TABLE branches (
    branch_id INT PRIMARY KEY, 
    branch_address TEXT,
    branch_name TEXT,
    branch_open TIME,
    branch_close TIME
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

CREATE TYPE box_payment_status AS ENUM ('PAID', 'UNPAID', 'PENDING');

CREATE TABLE customer_to_boxes (
    box_id INT,
    customer_id INT,
    rel_code relationship_code,
    payment_status box_payment_status DEFAULT 'PENDING',
    PRIMARY KEY (box_id, customer_id, rel_code),
    FOREIGN KEY (box_id) REFERENCES boxes (box_id),
    FOREIGN KEY (customer_id) REFERENCES customers (customer_id)
);

CREATE TYPE box_event AS ENUM ('OPEN', 'CLOSED');

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
INSERT INTO branches (branch_id, branch_address, branch_name, branch_open, branch_close) VALUES
    (1, 'One Fountain Plz, Buffalo, NY 1403', 'Fountain Plaza', '08:00:00', '18:00:00'),
    (2, '6000 South Park Ave, Hamburg, NY 14075', 'Hamburg', '07:30:00', '18:00:00'),
    (3, '709 Elmwood Ave, Buffalo, NY 14203', 'Elmwood Plaza', '09:00:00', '20:00:00');
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
INSERT INTO customer_to_boxes (box_id, customer_id, rel_code, payment_status) VALUES
    (1, 5, 'PRI', 'UNPAID'),
    (1, 1, 'SEC', 'UNPAID'),
    (2, 2, 'PRI', 'UNPAID'),
    (3, 3, 'PRI', 'PENDING'),
    (4, 5, 'PRI', 'PAID'),
    (5, 1, 'PRI', 'UNPAID'),
    (6, 2, 'PRI', 'PAID'),
    (6, 3, 'SEC', 'PAID'),
    (7, 3, 'PRI', 'PAID'),
    (8, 4, 'PRI', 'PENDING'),
    (9, 5, 'PRI', 'PAID'),
    (10, 1, 'PRI', 'PENDING'),
    (10, 5, 'SEC', 'PENDING'),
    (11, 1, 'PRI', 'PAID'),
    (11, 2, 'SEC', 'PAID');
INSERT INTO box_history (box_id, event_type, event_date) VALUES
    (1, 'OPEN', NOW() - INTERVAL '5 minutes'),
    (1, 'CLOSED', NOW()),
    (2, 'OPEN', NOW()),
    (3, 'CLOSED', NOW() - INTERVAL '1 hour'),
    (4, 'CLOSED', NOW()),
    (5, 'CLOSED', NOW()),
    (6, 'CLOSED', NOW()),
    (7, 'CLOSED', NOW()),
    (8, 'CLOSED', NOW()),
    (9, 'CLOSED', NOW()),
    (10, 'CLOSED', NOW()),
    (11, 'CLOSED', NOW());
INSERT INTO payment_history (box_id, customer_id, payment_amount, payment_date) VALUES
    (1, 1, 15.60, NOW() - INTERVAL '2 years'),
    (1, 1, 15.60, NOW() - INTERVAL '1 year'),
    (6, 2, 29.99, NOW()),
    (7, 3, 29.99, NOW() - INTERVAL '25 days'),
    (8, 4, 29.99, NOW() - INTERVAL '30 days'),
    (9, 5, 29.99, NOW() - INTERVAL '35 days'),
    (4, 1, 29.99, NOW() - INTERVAL '5 days'),
    (6, 1, 29.99, NOW() - INTERVAL '17 days'),
    (7, 1, 29.99, NOW() - INTERVAL '11 days'),
    (9, 1, 29.99, NOW() - INTERVAL '9 days'),
    (10, 1, 29.99, NOW() - INTERVAL '7 days'),
    (11, 1, 29.99, NOW() - INTERVAL '5 days');
INSERT INTO appointments(appointment_id, customer_id, branch_id, appointment_date) VALUES
    (1, 1, 1, '2025-12-25 12:00:00-05:00');
