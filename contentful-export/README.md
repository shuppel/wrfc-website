# Contentful Content Model Import Instructions

This directory contains the content models for the WRFC website in JSON format. Your content team can use these files to quickly set up the required content structure in Contentful.

## Importing Content Models

### Option 1: Using the Contentful CLI (Recommended for Developers)

1. **Install the Contentful CLI**:
   ```bash
   npm install -g contentful-cli
   ```

2. **Log in to Contentful**:
   ```bash
   contentful login
   ```

3. **Import the content models**:
   ```bash
   contentful space import --content-model-only --space-id YOUR_SPACE_ID --content-file content-models.json
   ```

   Replace `YOUR_SPACE_ID` with your Contentful space ID.

### Option 2: Using the Contentful Web Interface (For Content Team)

1. **Log in to Contentful** and go to your space

2. **Navigate to Settings > Content model**

3. **Click on "JSON editor" in the top right**

4. **Copy and paste the contents of `content-models.json`** into the editor

5. **Click "Save"** to apply the content models

## Manual Setup

If you prefer to set up the content models manually, follow the instructions in the `contentful-models.md` file in the project root.

## Content Creation

After importing the content models, your content team can start creating:

1. **Authors** - Create author profiles first, as they will be referenced by blog posts
2. **Blog Posts** - Create blog posts with rich text content
3. **Player Profiles** - Add player information for the roster
4. **Membership Plans** - Set up the different membership options

## Content Guidelines

### Blog Posts
- Use a clear, descriptive title
- Create a URL-friendly slug (lowercase, hyphens between words)
- Add a concise excerpt (160 characters or less)
- Use rich text formatting for the main content
- Add relevant categories and tags for filtering

### Player Profiles
- Include accurate position information
- Add player number (1-99)
- Upload a high-quality player photo
- Keep bio information concise and professional
- Mark featured players to highlight them on the roster page

### Membership Plans
- Clearly describe each membership level
- List all benefits as separate items
- Set the correct price
- Include payment links when available
- Mark featured plans to highlight them on the membership page

## Need Help?

If you have any questions about importing or using these content models, please contact the development team.