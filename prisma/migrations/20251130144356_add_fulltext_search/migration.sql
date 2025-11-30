-- Add tsvector column for full-text search on Product title and description
ALTER TABLE "Product" ADD COLUMN IF NOT EXISTS "search_vector" tsvector;

-- Create a function to update the search vector
CREATE OR REPLACE FUNCTION product_search_vector_update() RETURNS trigger AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('english', coalesce(NEW.title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(NEW.description, '')), 'B');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update search_vector on INSERT/UPDATE
DROP TRIGGER IF EXISTS product_search_vector_trigger ON "Product";
CREATE TRIGGER product_search_vector_trigger
  BEFORE INSERT OR UPDATE ON "Product"
  FOR EACH ROW
  EXECUTE FUNCTION product_search_vector_update();

-- Create GIN index for fast full-text search
CREATE INDEX IF NOT EXISTS "Product_search_vector_idx" ON "Product" USING GIN (search_vector);

-- Update existing rows to populate search_vector
UPDATE "Product" SET search_vector =
  setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
  setweight(to_tsvector('english', coalesce(description, '')), 'B')
WHERE search_vector IS NULL;
