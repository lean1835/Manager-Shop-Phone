SET NAMES utf8mb4;

-- =========================================================
-- 1) BẢNG CHA: account, supplier, product, customer
-- =========================================================

INSERT INTO account (username, password, role) VALUES
 ('admin',     '123', 'Admin'),
 ('banhang',   '123', 'Sales Staff'),
 ('thukho',    '123', 'Warehouse Staff'),
 ('kinhdoanh', '123', 'Business Staff');

INSERT INTO supplier (name, phone, address, email) VALUES
 ('Viettel Telecom', '18008098',   '01 Tran Huu Duc, Hanoi, Vietnam',              'support@viettel.com.vn'),
 ('VNPT',            '18001091',   '57 Huynh Thuc Khang, Hanoi, Vietnam',          'contact@vnpt.vn'),
 ('Mobifone',        '18001090',   '01 Pham Van Bach, Hanoi, Vietnam',             'care@mobifone.vn'),
 ('FPT Telecom',     '19006600',   'FPT Tower, 10 Pham Van Bach, Hanoi, Vietnam',  'hotro@fpt.vn'),
 ('Vietnamobile',    '0922789789', '18 Nguyen Dinh Chieu, Ho Chi Minh City, VN',   'cskh@vietnamobile.com.vn'),
 ('Gmobile',         '0993767676', '15 Pham Hung, Hanoi, Vietnam',                 'support@gmobile.vn'),
 ('ITelecom',        '0879797979', '20 Nguyen Trai, Hanoi, Vietnam',               'info@itelecom.vn'),
 ('SCTV Telecom',    '19001878',   '100 Nguyen Van Linh, Da Nang, Vietnam',        'cskh@sctv.vn'),
 ('Reddi',           '0559998999', '22 Duy Tan, Hanoi, Vietnam',                   'contact@reddi.vn'),
 ('EVNTelecom',      '19009099',   '28 Le Hong Phong, Ho Chi Minh City, Vietnam',  'support@evntelecom.vn');

INSERT INTO product (name, price, image, screen_size, camera, selfie, cpu, storage, description) VALUES
 ('Samsung Galaxy A15', 90000000, 'https://cdn2.fptshop.com.vn/unsafe/2023_12_11_638379104714831641_samsung-galaxy-a15-xanh-1.jpg', '6.5 inches',  '50MP', '13MP', 'Exynos 1280',       '128GB', 'Chiếc điện thoại phổ thông với camera tốt và màn hình lớn.'),
 ('iPhone 14',         22000000, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-14-pro-256gb.png', '6.1 inches',  '12MP', '12MP', 'A15 Bionic',         '128GB', 'Chiếc iPhone với hiệu năng mạnh mẽ và thiết kế tinh tế.'),
 ('Oppo Find X5 Pro',  26000000, 'https://cdn.tgdd.vn/Products/Images/42/250622/oppo-find-x5-pro-den-thumb-600x600.jpg',             '6.7 inches',  '50MP', '32MP', 'Snapdragon 8 Gen 1','256GB', 'Chiếc flagship Oppo với camera tiên tiến và màn hình chất lượng cao.'),
 ('Samsung Galaxy Z Flip5', 26000000, 'https://cdn2.fptshop.com.vn/unsafe/2024_3_28_638472353992099331_samsung-galaxy-zflip-5-xanh-ai.jpg', '6.7 inches','12MP', '10MP', 'Snapdragon 8 Gen 2','256GB', 'Điện thoại màn hình gập độc đáo với hiệu năng cao.'),
 ('iPhone 13 Mini',    18000000, 'https://cdn.phuckhangmobile.com/image/iphone-13-hong-900-24965j.jpg',                                 '5.4 inches',  '12MP', '12MP', 'A15 Bionic',         '128GB', 'Chiếc iPhone nhỏ gọn với hiệu năng mạnh mẽ.'),
 ('Oppo A98',           9000000, 'https://images-cdn.ubuy.com.eg/660c2b3b3af5c079eb54a00d-unlocked-oppo-a98-5g-8gb-256gb-global.jpg',   '6.72 inches', '64MP', '32MP', 'Snapdragon 695',     '256GB', 'Smartphone tầm trung với màn hình lớn và hiệu năng ổn định.'),
 ('Samsung Galaxy M14',        0, 'https://bachlongstore.vn/vnt_upload/product/10_2023/82371371.png',                                   '6.6 inches',  '50MP', '13MP', 'Exynos 1330',        '128GB', 'Smartphone phổ thông với pin dung lượng cao.');

INSERT INTO customer (name, phone, address, age, email) VALUES
 ('Lê An',            '0123456789', 'Đà Nẵng, Việt Nam',      21, 'letc@example.com'),
 ('Nguyễn Trúc Linh', '9876543210', 'Huế, Việt Nam',          23, 'pvd@example.com'),
 ('Phong Lê',         '0905202020', '32A',                    22, 'clonemlp21@gmail.com'),
 ('Võ Tấn Trí',       '0359694849', 'Đà Nẵng',                29, 'votantri2006@gmail.com'),
 ('Nguyễn Văn An',    '0912345678', 'Hà Nội, Việt Nam',       25, 'nguyenvanan@example.com'),
 ('Trần Thị Mai',     '0987654321', 'Hồ Chí Minh, Việt Nam',  27, 'tranthimai@example.com'),
 ('Đặng Quang Huy',   '0934567890', 'Cần Thơ, Việt Nam',      24, 'dangquanghuy@example.com'),
 ('Hoàng Thị Lan',    '0978123456', 'Nha Trang, Việt Nam',    26, 'hoangthilan@example.com'),
 ('Phan Minh Tâm',    '0963456789', 'Vũng Tàu, Việt Nam',     28, 'phanminhtam@example.com'),
 ('Bùi Đức Phúc',     '0956781234', 'Hải Phòng, Việt Nam',    30, 'buiducphuc@example.com'),
 ('Le Van An',        '0123456955', 'thai nguyen',            34, 'lean1835.vac@gmail.com');

-- =========================================================
-- 2) BẢNG CON: staff (tham chiếu account), stock (tham chiếu product, supplier)
--    Dùng subquery theo role/username, tên product, tên NCC.
-- =========================================================

-- STAFF
INSERT INTO staff (name, gender, dob, email, address, phone, account_id) VALUES
 ('Nguyễn Văn An',    NULL, '1990-01-24', NULL, '123 Main Street, Hanoi, Vietnam',                      '0123456789',
    (SELECT id FROM account WHERE role='Admin' LIMIT 1)),
 ('Trần Thị Lan',     NULL, '1995-03-15', NULL, '456 Market Street, Ho Chi Minh City, Vietnam',         '0987654321',
    (SELECT id FROM account WHERE role='Sales Staff' LIMIT 1)),
 ('Lê Văn Cao',       NULL, '1998-05-20', NULL, '789 Park Street, Danang, Vietnam',                     '0123987654',
    (SELECT id FROM account WHERE role='Warehouse Staff' LIMIT 1)),
 ('Võ Tấn Trí',       NULL, '2003-06-20', NULL, '101 River Street, Hue, Vietnam',                       '0938274655',
    (SELECT id FROM account WHERE role='Business Staff' LIMIT 1)),
 ('Trần Duy Linh',    NULL, '2003-06-20', NULL, '101 River Street, Hue, Vietnam',                       '0938274655',
    (SELECT id FROM account WHERE role='Business Staff' LIMIT 1)),
 ('Lê An',            NULL, '2003-06-20', NULL, '101 River Street, Hue, Vietnam',                       '0938274655',
    (SELECT id FROM account WHERE role='Business Staff' LIMIT 1)),
 ('Trương Ngọc Lĩnh', NULL, '2003-06-20', NULL, '101 River Street, Hue, Vietnam',                       '0938274655',
    (SELECT id FROM account WHERE role='Business Staff' LIMIT 1)),
 ('Lan Anh',          NULL, '2003-06-20', NULL, '101 River Street, Hue, Vietnam',                       '0938274655',
    (SELECT id FROM account WHERE role='Business Staff' LIMIT 1)),
 ('Nguyễn Trúc Linh', NULL, '2001-01-17', NULL, '100 Phan Boi Chau',                                    '0123456789',
    (SELECT id FROM account WHERE role='Business Staff' LIMIT 1)),
 ('Thanh Phong',      NULL, '2003-06-20', NULL, 'Đà Nẵng',                                              '03596948492',
    (SELECT id FROM account WHERE role='Sales Staff' LIMIT 1));

-- STOCK
INSERT INTO stock (product_id, supplier_id, quantity, import_price, import_date) VALUES
 ((SELECT id FROM product  WHERE name='iPhone 14'              LIMIT 1),
  (SELECT id FROM supplier WHERE name='VNPT'                   LIMIT 1), 50, 6000000,  '2025-01-12'),

 ((SELECT id FROM product  WHERE name='Samsung Galaxy Z Flip5' LIMIT 1),
  (SELECT id FROM supplier WHERE name='Viettel Telecom'        LIMIT 1), 60, 7000000,  '2025-01-18'),

 ((SELECT id FROM product  WHERE name='iPhone 13 Mini'         LIMIT 1),
  (SELECT id FROM supplier WHERE name='VNPT'                   LIMIT 1), 45, 6500000,  '2025-01-20'),

 ((SELECT id FROM product  WHERE name='Samsung Galaxy M14'     LIMIT 1),
  (SELECT id FROM supplier WHERE name='Viettel Telecom'        LIMIT 1), 55, 7500000,  '2025-01-25'),

 ((SELECT id FROM product  WHERE name='iPhone 14'              LIMIT 1),
  (SELECT id FROM supplier WHERE name='Viettel Telecom'        LIMIT 1), 24, 90000000, '2025-02-22');

-- password 123
UPDATE account 
SET password = '$2b$10$ja1P/plBWHZQXscXq.ZB0ubvmfZ51.tprXSHdKlOdrhgWz5D/G6oa'

