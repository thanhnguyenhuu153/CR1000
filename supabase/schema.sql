-- ==============================================================================
-- CR1000 - SUPABASE DATABASE SCHEMA
-- Bảng lưu trữ bài viết chuyên mục "Nhật ký Đường tới 1.000 Bàn Thắng" (Road to 1000)
-- ==============================================================================

-- 1. Tạo bảng journal_articles
CREATE TABLE IF NOT EXISTS public.journal_articles (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title_vi TEXT NOT NULL,
    title_en TEXT NOT NULL,
    excerpt_vi TEXT,
    excerpt_en TEXT,
    category_vi TEXT NOT NULL DEFAULT 'Tin Nóng & Bước Ngoặt',
    category_en TEXT NOT NULL DEFAULT 'Breaking & Milestones',
    category_slug TEXT NOT NULL DEFAULT 'breaking',
    published_date DATE NOT NULL DEFAULT CURRENT_DATE,
    read_time_vi TEXT DEFAULT '5 phút đọc',
    read_time_en TEXT DEFAULT '5 min read',
    author TEXT DEFAULT 'CR1000 Editorial Team',
    cover_image TEXT DEFAULT '/images/cr7/hero-cr7.jpg',
    is_featured BOOLEAN DEFAULT FALSE,
    tags JSONB DEFAULT '[]'::jsonb,
    quick_takeaway_vi TEXT,
    quick_takeaway_en TEXT,
    key_stats JSONB DEFAULT '[]'::jsonb,
    sections_vi JSONB DEFAULT '[]'::jsonb,
    sections_en JSONB DEFAULT '[]'::jsonb,
    faqs_vi JSONB DEFAULT '[]'::jsonb,
    faqs_en JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    related_product_id TEXT
);

-- Bổ sung cột related_product_id nếu bảng đã tồn tại từ trước
ALTER TABLE public.journal_articles ADD COLUMN IF NOT EXISTS related_product_id TEXT;

-- 2. Đặt chỉ mục (Indexes) để tìm kiếm và truy vấn tốc độ cao
CREATE INDEX IF NOT EXISTS idx_journal_slug ON public.journal_articles(slug);
CREATE INDEX IF NOT EXISTS idx_journal_published ON public.journal_articles(published_date DESC);
CREATE INDEX IF NOT EXISTS idx_journal_category ON public.journal_articles(category_slug);

-- 3. Bật Row Level Security (RLS)
ALTER TABLE public.journal_articles ENABLE ROW LEVEL SECURITY;

-- 4. Tạo Policy: Cho phép mọi người (công khai) xem bài viết
CREATE POLICY "Allow public read access"
ON public.journal_articles
FOR SELECT
TO public
USING (true);

-- 5. Tạo Policy: Cho phép người có anon key hoặc service_role thêm/sửa/xóa bài viết
CREATE POLICY "Allow anon insert and update"
ON public.journal_articles
FOR ALL
TO anon, authenticated, service_role
USING (true)
WITH CHECK (true);

-- ==============================================================================
-- 6. Bảng theo dõi số lượt Click Affiliate của từng sản phẩm Fan Vault & Giày
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.product_clicks (
    product_id TEXT PRIMARY KEY,
    click_count INTEGER NOT NULL DEFAULT 1,
    platform TEXT,
    source TEXT,
    last_clicked_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_clicks_count ON public.product_clicks(click_count DESC);

ALTER TABLE public.product_clicks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to product_clicks"
ON public.product_clicks
FOR SELECT
TO public
USING (true);

CREATE POLICY "Allow anon insert and update to product_clicks"
ON public.product_clicks
FOR ALL
TO anon, authenticated, service_role
USING (true)
WITH CHECK (true);

