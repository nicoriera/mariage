-- Script SQL pour créer la table guests dans Supabase
-- À copier/coller dans l'éditeur SQL de Supabase

-- Si la table existe déjà et que vous voulez la nettoyer :
-- ALTER TABLE guests DROP COLUMN IF EXISTS friday;
-- ALTER TABLE guests DROP COLUMN IF EXISTS dietary_restrictions;

-- 1. Créer la table guests
CREATE TABLE guests (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  thursday BOOLEAN,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Activer Row Level Security (RLS)
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;

-- 3. Créer les politiques de sécurité pour permettre l'accès public
CREATE POLICY "Allow public read access" ON guests
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert access" ON guests
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update access" ON guests
  FOR UPDATE USING (true);

-- 4. Insérer quelques données de test (optionnel)
INSERT INTO guests (name, thursday, message) VALUES
  ('Nicolas', true, 'Hâte d''être à votre mariage ! 💕'),
  ('Marie', false, 'Je serai là pour la cérémonie'),
  ('Pierre', true, 'Présent pour le dîner de répétition');

-- Vérifier que tout fonctionne
SELECT * FROM guests;