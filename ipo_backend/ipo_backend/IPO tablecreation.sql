-- Table: companies
CREATE TABLE companies (
    company_id SERIAL PRIMARY KEY,
    company_name VARCHAR(255) NOT NULL,
    company_logo VARCHAR(255)
);

-- Table: ipos
CREATE TABLE ipos (
    ipo_id SERIAL PRIMARY KEY,
    company_id INT REFERENCES companies(company_id) ON DELETE CASCADE,
    price_band VARCHAR(100),
    open_date DATE,
    close_date DATE,
    issue_size VARCHAR(100),
    issue_type VARCHAR(100),
    listing_date DATE,
    status VARCHAR(20) CHECK (status IN ('upcoming', 'ongoing', 'listed')),
    ipo_price DECIMAL(10, 2),
    listing_price DECIMAL(10, 2),
    current_market_price DECIMAL(10, 2)
);

-- Table: documents
CREATE TABLE documents (
    document_id SERIAL PRIMARY KEY,
    ipo_id INT REFERENCES ipos(ipo_id) ON DELETE CASCADE,
    rhp_pdf VARCHAR(255),
    drhp_pdf VARCHAR(255)
);