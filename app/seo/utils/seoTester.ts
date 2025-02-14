import { Metadata } from 'next';

export interface SEOTestResult {
  isValid: boolean;
  missingTags: string[];
  warnings: string[];
  suggestions: string[];
  score: number;
}

export interface SEOTestOptions {
  requireArticleMeta?: boolean;
  requireAlternateLanguages?: boolean;
  requireStructuredData?: boolean;
}

type MetadataValue = string | number | boolean | null | undefined | Record<string, unknown>;

const getNestedValue = (obj: Record<string, MetadataValue>, path: string): MetadataValue | undefined => {
  return path.split('.').reduce((current: MetadataValue | undefined, key: string) => {
    if (current && typeof current === 'object') {
      return (current as Record<string, MetadataValue>)[key];
    }
    return undefined;
  }, obj);
};

export const validateSEOMetadata = (
  metadata: Metadata,
  options: SEOTestOptions = {}
): SEOTestResult => {
  const {
    requireArticleMeta = false,
    requireAlternateLanguages = false,
    requireStructuredData = true
  } = options;

  const requiredTags = [
    'title',
    'description',
    'openGraph.title',
    'openGraph.description',
    'openGraph.image',
    'twitter.title',
    'twitter.description',
    'twitter.image'
  ];

  if (requireArticleMeta) {
    requiredTags.push(
      'openGraph.publishedTime',
      'openGraph.modifiedTime',
      'openGraph.section'
    );
  }

  const warnings: string[] = [];
  let score = 100;

  // Check title length (50-60 characters)
  const title = String(metadata.title || '');
  if (title) {
    if (title.length < 50) {
      warnings.push('Title is shorter than recommended (50-60 characters)');
      score -= 5;
    } else if (title.length > 60) {
      warnings.push('Title is longer than recommended (50-60 characters)');
      score -= 5;
    }
  }

  // Check description length (150-160 characters)
  const description = String(metadata.description || '');
  if (description) {
    if (description.length < 150) {
      warnings.push('Description is shorter than recommended (150-160 characters)');
      score -= 5;
    } else if (description.length > 160) {
      warnings.push('Description is longer than recommended (150-160 characters)');
      score -= 5;
    }
  }

  // Check for alternate languages if required
  if (requireAlternateLanguages && !Object.keys(metadata.alternates || {}).length) {
    warnings.push('No alternate language URLs provided');
    score -= 10;
  }

  // Check for structured data if required
  if (requireStructuredData && !metadata.other?.['structured-data']) {
    warnings.push('No structured data (JSON-LD) found');
    score -= 15;
  }

  const missingTags = requiredTags.filter(tag => {
    const value = getNestedValue(metadata as Record<string, MetadataValue>, tag);
    return !value;
  });

  // Deduct points for missing required tags
  score -= missingTags.length * 10;

  // Ensure score doesn't go below 0
  score = Math.max(0, score);

  const suggestions = [
    ...missingTags.map(tag => `Add missing metadata: ${tag}`),
    ...warnings.map(warning => `Consider fixing: ${warning}`)
  ];

  return {
    isValid: missingTags.length === 0 && warnings.length === 0,
    missingTags,
    warnings,
    suggestions,
    score
  };
}; 