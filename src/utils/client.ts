import { createClient } from '@supabase/supabase-js'; //test

const supabase = createClient(
  'https://oazbrtitvaavcdmwzrlg.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9hemJydGl0dmFhdmNkbXd6cmxnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQyMzg0MzIsImV4cCI6MjA0OTgxNDQzMn0.wjglVRoT2NopT4LkTs3n-IUBDSxgtsaJkrMh1FRrNLY'
);

export default supabase;
