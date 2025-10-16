# Supabase Storage Setup for Profile Photos

To enable profile photo uploads, you need to create a storage bucket in Supabase:

## 1. Create the Storage Bucket

1. Go to your Supabase Dashboard
2. Navigate to **Storage** in the left sidebar
3. Click **Create a new bucket**
4. Set the following:
   - **Name**: `player-profiles`
   - **Public bucket**: ✓ Check this box (so images can be displayed publicly)
   - **File size limit**: 5MB (or your preference)
   - **Allowed MIME types**: `image/*` (to only allow images)

## 2. Set Up RLS Policies

After creating the bucket, set up Row Level Security policies:

### Allow authenticated users to upload their own profile images:
```sql
CREATE POLICY "Users can upload their own profile image"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'player-profiles' AND
  auth.uid()::text = (storage.foldername(name))[1]
);
```

### Allow authenticated users to update their own profile images:
```sql
CREATE POLICY "Users can update their own profile image"
ON storage.objects FOR UPDATE
WITH CHECK (
  bucket_id = 'player-profiles' AND
  auth.uid()::text = (storage.foldername(name))[1]
);
```

### Allow authenticated users to delete their own profile images:
```sql
CREATE POLICY "Users can delete their own profile image"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'player-profiles' AND
  auth.uid()::text = (storage.foldername(name))[1]
);
```

### Allow public to view all profile images:
```sql
CREATE POLICY "Profile images are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'player-profiles');
```

## 3. Alternative: Simple Setup

If you want a simpler setup for development:

1. Create the bucket as described above
2. In the bucket settings, under "Policies", you can toggle:
   - **Enable insert for authenticated users only**
   - **Enable select for public**

This is less secure but easier for testing.

## 4. Test the Upload

1. Log in to your player portal
2. Go to `/portal/profile`
3. Click "Upload Photo" or hover over the profile image placeholder
4. Select an image file
5. The image should upload and display immediately

## Troubleshooting

If uploads fail:

1. **Check bucket name**: Ensure the bucket is named exactly `player-profiles`
2. **Check public access**: The bucket must be public for images to display
3. **Check file size**: Default limit is often 50MB, but you may have set it lower
4. **Check MIME types**: Ensure `image/*` is in allowed types
5. **Check RLS policies**: Use Supabase Dashboard to verify policies are active

### Common Errors:

- **"Bucket not found"**: Create the bucket with exact name `player-profiles`
- **"Policy violation"**: RLS policies are blocking the upload
- **"File too large"**: Reduce image size or increase bucket limit
- **"Invalid file type"**: Only image files are allowed