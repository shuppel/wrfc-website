# Contentful Author Setup for SEO

## Why Authors Matter

Every piece of content should have an author for:
- Google E-A-T (Expertise, Authoritativeness, Trustworthiness)
- Rich snippets in search results
- Person schema markup
- Building authority in rugby/sports niche

## Enhanced Author Content Model

Create an Author content type with these fields:

### Required Fields
1. **name** (Short text, required)
   - Full name of the author
   - Used in bylines and Person schema

2. **slug** (Short text, required, unique)
   - URL-friendly version (e.g., "john-smith")
   - Pattern: `^[a-z0-9-]+$`
   - For author profile pages

3. **picture** (Media, required)
   - Headshot/profile photo
   - Minimum 400x400px for schema
   - Used in author boxes and Person schema

4. **bio** (Long text, required)
   - 150-300 word professional bio
   - Include rugby experience/credentials
   - Used for author pages and schema

5. **title** (Short text, required)
   - Professional title/role
   - Examples: "Head Coach", "Team Captain", "Communications Director"

6. **role** (Dropdown, required)
   - Options: staff, coach, player, alumni, admin
   - Helps categorize authors

### Optional Fields
7. **email** (Short text)
   - Contact email (if public)
   - Validation: email format

8. **socialLinks** (JSON object)
   ```json
   {
     "linkedin": "https://linkedin.com/in/username",
     "twitter": "https://twitter.com/username",
     "website": "https://example.com"
   }
   ```

9. **credentials** (Short text list)
   - Professional certifications
   - Rugby achievements
   - Relevant qualifications

## Recommended Authors to Create

### 1. WRFC Communications Team
- **Name**: WRFC Communications
- **Title**: Official Communications Team
- **Bio**: "The official communications team for Washington Rugby Football Club, bringing you the latest news, match reports, and club updates."
- **Role**: admin

### 2. Head Coach (Real Person)
- **Name**: [Actual coach name]
- **Title**: Head Coach - Men's D1
- **Bio**: Include coaching experience, certifications, playing history
- **Role**: coach

### 3. Team Captains
- Create for each division captain
- **Role**: player
- Good for match reports and player perspectives

### 4. Alumni Relations
- **Name**: WRFC Alumni Relations
- **Title**: Alumni Relations Coordinator
- **Bio**: Focus on connecting past and present WRFC members
- **Role**: alumni

### 5. Youth Development
- For youth program content
- **Role**: staff

## Content Types That Need Author Field

Add author reference field to:

1. **Alumni Spotlight**
   - Add field: `author` (Reference to Author)
   - Usually "Alumni Relations" author

2. **Player Profile** 
   - Add field: `createdBy` (Reference to Author)
   - Who wrote/maintains the profile

3. **Game/Match Reports**
   - Add field: `author` (Reference to Author)
   - Could be coach, captain, or communications

## Schema.org Implementation

With proper author setup, each piece of content can include:

```json
{
  "@type": "Person",
  "name": "John Smith",
  "jobTitle": "Head Coach",
  "image": "https://...",
  "description": "Professional bio...",
  "sameAs": [
    "https://linkedin.com/in/johnsmith",
    "https://twitter.com/johnsmith"
  ],
  "worksFor": {
    "@type": "SportsOrganization",
    "name": "Washington Rugby Football Club"
  }
}
```

## Best Practices

1. **Real People > Generic Accounts**
   - Use actual names when possible
   - Builds more trust and authority

2. **Complete Profiles**
   - Fill all fields, especially bio and photo
   - Links to social profiles add credibility

3. **Consistent Attribution**
   - Don't leave content authorless
   - Default to "WRFC Communications" if unsure

4. **Author Pages**
   - Create `/authors/[slug]` pages
   - Show all content by that author
   - Include full bio and social links

## SEO Benefits

- **Rich Snippets**: Author info in search results
- **Knowledge Graph**: Authors can appear in Google's Knowledge Graph  
- **E-A-T Signals**: Demonstrates expertise in rugby
- **Trust**: Real people behind content builds trust
- **Internal Linking**: Author pages create more internal links