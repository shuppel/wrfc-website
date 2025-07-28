# Contentful Content Models for WRFC Website

This document provides templates for creating content models in Contentful's web interface. You can share these with your content team to ensure they set up the correct structure.

## 1. Blog Post Content Model

**Content Type ID**: `blogPost`

| Field ID | Field Name | Field Type | Required | Settings |
|----------|------------|------------|----------|----------|
| `title` | Title | Short text | Yes | - |
| `slug` | URL Slug | Short text | Yes | Unique, Validations: Regex `/^[a-z0-9]+(?:-[a-z0-9]+)*$/` |
| `publishDate` | Publish Date | Date & time | Yes | - |
| `featuredImage` | Featured Image | Media (Image) | No | - |
| `excerpt` | Excerpt | Short text | Yes | - |
| `content` | Content | Rich Text | Yes | - |
| `author` | Author | Reference (single) to Author content type | No | - |
| `categories` | Categories | Short text (Multiple) | No | - |
| `tags` | Tags | Short text (Multiple) | No | - |

## 2. Author Content Model

**Content Type ID**: `author`
**Description**: Determining the data fields and author who created an article, curated content, etc.

| Field ID | Field Name | Field Type | Required | Settings |
|----------|------------|------------|----------|----------|
| `name` | Name | Short text | Yes | - |
| `slug` | slug | Short text | Yes | Unique |
| `picture` | Picture | Media (Image) | No | - |
| `bio` | Bio | Long text | No | - |
| `title` | Title | Short text | No | - |
| `email` | Email | Short text | No | Email validation |
| `linkedinUrl` | LinkedinUrl | Short text | No | - |
| `instagramUrl` | Instagram Url | Short text | No | - |
| `websiteUrl` | Website Url | Short text | No | - |

## 3. Player Profile Content Model

**Content Type ID**: `playerProfile`

| Field ID | Field Name | Field Type | Required | Settings |
|----------|------------|------------|----------|----------|
| `name` | Name | Short text | Yes | - |
| `slug` | URL Slug | Short text | Yes | Unique, Validations: Regex `/^[a-z0-9]+(?:-[a-z0-9]+)*$/` |
| `position` | Position | Short text | Yes | - |
| `picture` | Picture | Media (Image) | No | - |
| `number` | Number | Number (Integer) | Yes | - |
| `bio` | Bio | Long text | No | - |
| `joinDate` | Join Date | Date | No | - |
| `hometown` | Hometown | Short text | No | - |
| `college` | College | Short text | No | - |
| `highlights` | Highlights | Short text (Multiple) | No | - |
| `featured` | Featured Player | Boolean | No | Default: false |

## 4. Membership Plan Content Model

**Content Type ID**: `membershipPlan`

| Field ID | Field Name | Field Type | Required | Settings |
|----------|------------|------------|----------|----------|
| `title` | Title | Short text | Yes | - |
| `description` | Description | Long text | Yes | - |
| `price` | Price | Number (Decimal) | Yes | - |
| `benefits` | Benefits | Short text (Multiple) | Yes | - |
| `featured` | Featured Plan | Boolean | No | Default: false |
| `paymentLink` | Payment Link | Short text | No | - |

## Sample Content Entry Templates

### Blog Post Example

```json
{
  "title": "WRFC Wins Capital Rugby Championship",
  "slug": "wrfc-wins-capital-rugby-championship",
  "publishDate": "2025-05-18T14:00:00.000Z",
  "excerpt": "Washington Rugby Football Club secures victory in the Capital Rugby Championship with a thrilling win over their rivals.",
  "content": {
    "nodeType": "document",
    "data": {},
    "content": [
      {
        "nodeType": "paragraph",
        "data": {},
        "content": [
          {
            "nodeType": "text",
            "value": "The Washington Rugby Football Club secured an impressive victory in the Capital Rugby Championship...",
            "marks": [],
            "data": {}
          }
        ]
      }
    ]
  },
  "categories": ["Match Reports", "Tournament"],
  "tags": ["championship", "victory", "capital-rugby"]
}
```

### Player Profile Example

```json
{
  "name": "John Smith",
  "slug": "john-smith",
  "position": "Flanker",
  "number": 7,
  "bio": "John joined WRFC in 2023 and has been a key player in our forward pack...",
  "joinDate": "2023-09-01",
  "hometown": "Arlington, VA",
  "college": "Georgetown University",
  "highlights": [
    "2024 Capital Rugby Championship MVP",
    "Selected for Capital Select Side 2024",
    "Led team in tackles 2023-2024 season"
  ],
  "featured": true
}
```

### Membership Plan Example

```json
{
  "title": "Full Player Membership",
  "description": "Complete access to all training sessions, matches, and social events for active players.",
  "price": 350,
  "benefits": [
    "Access to all training sessions",
    "Eligibility for match selection",
    "WRFC training shirt",
    "USA Rugby registration included",
    "Discounted club merchandise",
    "Social event access"
  ],
  "featured": true,
  "paymentLink": "https://checkout.square.site/wrfc-full-membership"
}
```

## Setting Up Content Models in Contentful

1. Log in to Contentful
2. Go to your space
3. Navigate to "Content model" in the top navigation
4. Click "Add content type"
5. Enter the Content Type ID (e.g., `blogPost`)
6. Add the fields according to the tables above
7. Configure validations and appearance as needed
8. Save the content type
9. Repeat for each content model

## Content Creation Workflow

Once the models are set up:

1. Go to the "Content" section
2. Click "Add entry"
3. Select the appropriate content type
4. Fill in the fields based on the examples above
5. Publish the entry when ready

Your content team can then use these templates to populate the site with blog posts, player profiles, and membership plans.