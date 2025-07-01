-- Sample data for testing (will be loaded on startup)

-- Insert sample user
INSERT INTO users (first_name, last_name, email, password, email_verified, role, created_at, updated_at) 
VALUES ('John', 'Doe', 'admin@orderlee.com', '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HI/2Hdx.K/K/zBTXHHOyC', true, 'USER', NOW(), NOW());

-- Insert sample business
INSERT INTO businesses (business_name, industry, business_type, address, city, state, country, phone, email, user_id, created_at, updated_at)
VALUES ('Orderlee Demo Store', 'E-commerce', 'Limited Liability Company', '123 Business Street', 'Lagos', 'Lagos', 'Nigeria', '+234-901-234-5678', 'demo@orderlee.com', 1, NOW(), NOW());

-- Insert sample products
INSERT INTO products (name, description, category, sku, cost_price, selling_price, stock_quantity, reorder_level, business_id, created_at, updated_at)
VALUES 
('Wireless Headphones', 'High-quality wireless headphones with noise cancellation', 'Electronics', 'WH-001', 45000.00, 89999.00, 5, 20, 1, NOW(), NOW()),
('Smart Watch', 'Fitness tracking smartwatch with heart rate monitor', 'Electronics', 'SW-002', 120000.00, 249999.00, 8, 15, 1, NOW(), NOW()),
('Phone Case', 'Protective phone case for various models', 'Accessories', 'PC-003', 8000.00, 19999.00, 12, 25, 1, NOW(), NOW()),
('Bluetooth Speaker', 'Portable bluetooth speaker with excellent sound quality', 'Electronics', 'BS-004', 25000.00, 59999.00, 45, 20, 1, NOW(), NOW()),
('USB Cable', 'High-speed USB charging cable', 'Accessories', 'UC-005', 3000.00, 12999.00, 150, 50, 1, NOW(), NOW());