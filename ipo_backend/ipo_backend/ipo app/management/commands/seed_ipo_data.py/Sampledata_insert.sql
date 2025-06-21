-- Sample Companies
INSERT INTO companies (company_name, company_logo) VALUES 
('Tata Technologies', 'logos/tata_tech.png'),
('Ola Electric', 'logos/ola_electric.png');

-- Sample IPOs
INSERT INTO ipos (company_id, price_band, open_date, close_date, issue_size, issue_type, listing_date, status, ipo_price, listing_price, current_market_price)
VALUES 
(1, '₹475 - ₹500', '2025-06-15', '2025-06-18', '₹3000 Cr', 'Book Built Issue', '2025-06-25', 'upcoming', 500.00, NULL, NULL),
(2, '₹85 - ₹90', '2025-05-10', '2025-05-13', '₹1500 Cr', 'Fixed Price Issue', '2025-05-20', 'listed', 90.00, 100.00, 95.00);

-- Sample Documents
INSERT INTO documents (ipo_id, rhp_pdf, drhp_pdf) VALUES 
(1, 'docs/tata_rhp.pdf', 'docs/tata_drhp.pdf'),
(2, 'docs/ola_rhp.pdf', 'docs/ola_drhp.pdf');