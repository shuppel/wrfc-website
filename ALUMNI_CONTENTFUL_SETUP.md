# Alumni Spotlight Contentful Setup

## Content Type: Alumni Spotlight

Create a new content type in Contentful with the following fields:

### Fields

1. **Name** (Short text, required)
   - Field ID: `name`
   - Help text: "Full name of the alumni"
   - Validation: Required

2. **Slug** (Short text, required)
   - Field ID: `slug`
   - Help text: "URL-friendly version of the name (e.g., john-smith)"
   - Validation: Required, unique, pattern: `^[a-z0-9-]+$`

3. **Graduation Year** (Number, required)
   - Field ID: `graduationYear`
   - Help text: "Year the alumni graduated/left WRFC"
   - Validation: Required, min: 1963, max: current year

4. **Current Role** (Short text, optional)
   - Field ID: `currentRole`
   - Help text: "Current professional role or title"

5. **Location** (Short text, optional)
   - Field ID: `location`
   - Help text: "Current city and state (e.g., Washington, DC)"

6. **Category** (Dropdown, required)
   - Field ID: `category`
   - Options:
     - Community Service
     - Professional Achievement
     - Rugby Development
     - Coaching
   - Validation: Required

7. **Short Bio** (Long text, required)
   - Field ID: `shortBio`
   - Help text: "Brief summary for card display (max 200 characters)"
   - Validation: Required, max length: 200

8. **Full Story** (Rich text, required)
   - Field ID: `fullStory`
   - Help text: "Complete story about the alumni's achievements and impact"

9. **Photo** (Media/Image, optional)
   - Field ID: `photo`
   - Help text: "Alumni photo (recommended: 800x800px minimum)"
   - Validation: Image only

10. **Social Links** (JSON object, optional)
    - Field ID: `socialLinks`
    - Help text: "JSON object with linkedin, twitter, website URLs"
    - Example:
    ```json
    {
      "linkedin": "https://linkedin.com/in/username",
      "twitter": "https://twitter.com/username",
      "website": "https://example.com"
    }
    ```

11. **Featured** (Boolean, required)
    - Field ID: `featured`
    - Help text: "Show this spotlight on the main alumni page?"
    - Default: false

12. **Publish Date** (Date & time, required)
    - Field ID: `publishDate`
    - Help text: "Date when this spotlight should be published"
    - Default: Current date

## Sample Entry

```json
{
  "name": "John Smith",
  "slug": "john-smith",
  "graduationYear": 1998,
  "currentRole": "Community Leader",
  "location": "Washington, DC",
  "category": "Community Service",
  "shortBio": "Leading youth rugby programs in underserved communities across DC, bringing the sport to over 500 kids annually.",
  "fullStory": "[Rich text content with full story]",
  "photo": "[Image asset]",
  "socialLinks": {
    "linkedin": "https://linkedin.com/in/johnsmith",
    "twitter": "https://twitter.com/jsmith"
  },
  "featured": true,
  "publishDate": "2024-01-15T00:00:00Z"
}
```

## Integration Notes

- The content type is already integrated in `/lib/contentful.ts`
- Use `getAllAlumniSpotlights()` to fetch all spotlights
- Use `getFeaturedAlumniSpotlights()` to fetch only featured ones
- Use `getAlumniSpotlightBySlug()` to fetch individual spotlights
- The `useAlumniSpotlights` hook is available for React components

## Next Steps

1. Create the content type in Contentful following the schema above
2. Add sample alumni spotlight entries
3. Update the alumni pages to use real data instead of mock data
4. Create individual spotlight detail pages at `/app/alumni/spotlights/[slug]/page.tsx`