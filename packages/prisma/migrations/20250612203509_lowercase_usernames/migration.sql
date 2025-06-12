-- Update all existing usernames to lowercase
UPDATE User SET username = LOWER(username) WHERE username IS NOT NULL; 