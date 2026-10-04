export type ToolCategory =
  | 'calculators'
  | 'text'
  | 'media'
  | 'converters'
  | 'utilities';

export interface ToolFAQ {
  question: string;
  answer: string;
}

export interface ToolExample {
  scenario: string;
  input: string;
  output: string;
  explanation: string;
}

export interface ToolInfo {
  id: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  shortDescription: string;
  longDescription: string;
  category: ToolCategory;
  categoryName: string;
  iconName: string;
  popular?: boolean;
  featured?: boolean;
  recentlyAdded?: boolean;
  howToSteps: string[];
  features: string[];
  examples: ToolExample[];
  faqs: ToolFAQ[];
  relatedToolIds: string[];
}

export type PageRoute =
  | 'home'
  | 'all-tools'
  | 'about'
  | 'contact'
  | 'privacy'
  | 'terms'
  | 'disclaimer'
  | `tool-${string}`;
