import { NextRequest, NextResponse } from 'next/server';
import * as contentful from '@/lib/contentful';

// This API route provides a simple interface to fetch content from Contentful
// It's particularly useful for client components that need to fetch content
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const contentType = searchParams.get('type');
  const slug = searchParams.get('slug');
  
  try {
    // Validate content configuration before making requests
    contentful.validateContentfulConfig();
    
    let response;
    
    // Handle different content types
    switch (contentType) {
      case 'blog':
        if (slug) {
          response = await contentful.getBlogPostBySlug(slug);
        } else {
          response = await contentful.getAllBlogPosts();
        }
        break;
        
      case 'player':
        if (slug) {
          response = await contentful.getPlayerProfileBySlug(slug);
        } else {
          response = await contentful.getAllPlayerProfiles();
        }
        break;
        
      case 'membership':
        response = await contentful.getAllMembershipPlans();
        break;
        
      default:
        return NextResponse.json(
          { error: 'Invalid content type. Valid types are: blog, player, membership' },
          { status: 400 }
        );
    }
    
    if (!response) {
      return NextResponse.json(
        { error: 'Content not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching content:', error);
    
    return NextResponse.json(
      { error: 'Failed to fetch content' },
      { status: 500 }
    );
  }
}