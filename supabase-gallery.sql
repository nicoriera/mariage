-- Table pour la galerie photos (gratuite avec Supabase)
CREATE TABLE gallery (
  id SERIAL PRIMARY KEY,
  url TEXT NOT NULL,
  uploader_name VARCHAR(100) NOT NULL,
  message TEXT,
  is_pre_wedding BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour optimiser les requêtes
CREATE INDEX idx_gallery_created_at ON gallery(created_at DESC);
CREATE INDEX idx_gallery_is_pre_wedding ON gallery(is_pre_wedding);

-- Politique de sécurité (lecture publique, écriture restreinte)
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

-- Permettre la lecture à tous
CREATE POLICY "Allow public read access on gallery" 
ON gallery FOR SELECT 
USING (true);

-- Permettre l'écriture avec validation
CREATE POLICY "Allow public insert on gallery" 
ON gallery FOR INSERT 
WITH CHECK (
  char_length(uploader_name) > 0 
  AND char_length(uploader_name) <= 100
  AND char_length(url) > 0
);