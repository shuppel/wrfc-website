import { Metadata } from 'next';

interface SEOTestOptions {
  requireArticleMeta?: boolean;
  requireAlternateLanguages?: boolean;
  requireStructuredData?: boolean;
  minTitleLength?: number;
  maxTitleLength?: number;
  minDescriptionLength?: number;
  maxDescriptionLength?: number;
  checkImageOptimization?: boolean;
  checkPerformance?: boolean;
  checkAccessibility?: boolean;
  imageOptimization?: boolean;
}

interface SEOTestResult {
  score: number;
  warnings: string[];
  suggestions: string[];
  passed: boolean;
  details: {
    metadata: MetadataAnalysis;
    performance?: PerformanceAnalysis;
    accessibility?: AccessibilityAnalysis;
    images?: ImageAnalysis;
  };
}

interface MetadataAnalysis {
  title: string;
  description: string;
  keywords: string[];
  score: number;
  warnings: string[];
}

interface PerformanceAnalysis {
  score: number;
  warnings: string[];
  suggestions: string[];
}

interface AccessibilityAnalysis {
  score: number;
  warnings: string[];
  suggestions: string[];
}

interface ImageAnalysis {
  optimized: boolean;
  suggestions: string[];
}

type ImageOptimizer = (url: string) => Promise<ImageAnalysis>;

export async function validateSEOMetadata(
  metadata: Metadata,
  options: SEOTestOptions = {},
  url?: string,
  imageOptimizer?: ImageOptimizer
): Promise<SEOTestResult> {
  let score = 100;
  const warnings: string[] = [];
  const suggestions: string[] = [];
  let imageAnalysis: ImageAnalysis | undefined;

  // Title Analysis
  const title = typeof metadata.title === 'string' 
    ? metadata.title 
    : metadata.title && typeof metadata.title === 'object' && 'default' in metadata.title 
      ? String(metadata.title.default)
      : '';

  if (!title) {
    score -= 20;
    warnings.push('Missing page title');
  } else if (options.minTitleLength && title.length < options.minTitleLength) {
    score -= 10;
    warnings.push(`Title length (${title.length}) is less than recommended minimum (${options.minTitleLength})`);
  }

  // Description Analysis
  const description = metadata.description || '';
  if (!description) {
    score -= 15;
    warnings.push('Missing meta description');
  } else if (options.minDescriptionLength && description.length < options.minDescriptionLength) {
    score -= 10;
    warnings.push(`Description length (${description.length}) is less than recommended minimum (${options.minDescriptionLength})`);
  }

  // OpenGraph Analysis
  if (!metadata.openGraph) {
    score -= 10;
    warnings.push('Missing OpenGraph metadata');
  } else {
    const og = metadata.openGraph;
    if (!og.title) warnings.push('Missing OpenGraph title');
    if (!og.description) warnings.push('Missing OpenGraph description');
    if (!og.images || (Array.isArray(og.images) && og.images.length === 0)) {
      warnings.push('Missing OpenGraph images');
    }
  }

  // Image Optimization Check
  if (url && typeof imageOptimizer === 'function') {
    imageAnalysis = await imageOptimizer(url);
    if (imageAnalysis && !imageAnalysis.optimized) {
      score -= 10;
      warnings.push('Images not fully optimized');
      suggestions.push(...imageAnalysis.suggestions);
    }
  }

  return {
    score: Math.max(0, Math.min(100, score)),
    warnings,
    suggestions,
    passed: score >= 80,
    details: {
      metadata: {
        title: title,
        description: description,
        keywords: Array.isArray(metadata.keywords) ? metadata.keywords : String(metadata.keywords || '').split(','),
        score: score,
        warnings: warnings
      },
      performance: undefined,
      accessibility: undefined,
      images: imageAnalysis
    }
  };
}

async function checkPagePerformance(url: string): Promise<PerformanceAnalysis> {
  try {
    const startTime = performance.now();
    await fetch(url);
    const loadTime = performance.now() - startTime;
    
    const suggestions: string[] = [];
    let score = 100;

    if (loadTime > 3000) {
      score -= 20;
      suggestions.push('Page load time is too slow. Consider optimization techniques.');
    } else if (loadTime > 1500) {
      score -= 10;
      suggestions.push('Page load time could be improved.');
    }

    return {
      score,
      warnings: [],
      suggestions
    };
  } catch (error) {
    return {
      score: 0,
      warnings: ['Failed to check performance'],
      suggestions: []
    };
  }
}

async function checkAccessibilityIssues(url: string): Promise<AccessibilityAnalysis> {
  // This would typically use a library like axe-core
  // For now, we'll return a placeholder
  return {
    score: 100,
    warnings: [],
    suggestions: []
  };
}

async function checkImageOptimization(url: string): Promise<ImageAnalysis> {
  // This would typically check image formats, sizes, and optimization
  // For now, we'll return a placeholder
  return {
    optimized: true,
    suggestions: []
  };
}

export async function generateSEOReport(url: string): Promise<string> {
  const response = await fetch(url);
  const html = await response.text();
  
  const report = [];
  report.push('SEO Analysis Report');
  report.push('=================\n');

  // Basic SEO elements
  report.push('1. Essential SEO Elements');
  report.push('------------------------');
  if (html.includes('<title>')) report.push('✓ Title tag present');
  else report.push('✗ Missing title tag');
  
  if (html.includes('<meta name="description"')) report.push('✓ Meta description present');
  else report.push('✗ Missing meta description');
  
  if (html.includes('<link rel="canonical"')) report.push('✓ Canonical link present');
  else report.push('✗ Missing canonical link');

  // Structured Data
  report.push('\n2. Structured Data');
  report.push('------------------');
  if (html.includes('application/ld+json')) report.push('✓ JSON-LD present');
  else report.push('✗ Missing JSON-LD structured data');

  // Mobile Optimization
  report.push('\n3. Mobile Optimization');
  report.push('----------------------');
  if (html.includes('<meta name="viewport"')) report.push('✓ Viewport meta tag present');
  else report.push('✗ Missing viewport meta tag');

  // Social Media
  report.push('\n4. Social Media Integration');
  report.push('--------------------------');
  if (html.includes('og:')) report.push('✓ OpenGraph tags present');
  else report.push('✗ Missing OpenGraph tags');
  
  if (html.includes('twitter:')) report.push('✓ Twitter Card tags present');
  else report.push('✗ Missing Twitter Card tags');

  return report.join('\n');
} 