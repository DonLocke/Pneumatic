-- Create Tables
CREATE TABLE branches (
    branch_id INT PRIMARY KEY, 
    branch_address text
);

CREATE TABLE boxes (
    box_number INT,
    branch_id INT, 
    PRIMARY KEY (box_number, branch_id),
    FOREIGN KEY (branch_id) REFERENCES branches (branch_id)
);

-- Add Data
INSERT INTO branches (branch_id, branch_address) VALUES (1, '1 Seneca St. Buffalo NY, 14216');
INSERT INTO boxes (box_number, branch_id) VALUES (1, 1);