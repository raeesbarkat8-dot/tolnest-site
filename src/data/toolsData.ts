import { ToolInfo } from '../types';

export const TOOLS_DATA: ToolInfo[] = [
  {
    id: 'age-calculator',
    title: 'Age Calculator',
    seoTitle: 'Age Calculator — Exact Age in Years, Months, Days & Next Birthday',
    metaDescription: 'Calculate your exact age in years, months, weeks, days, hours, and minutes with our free online Age Calculator. Discover your zodiac sign and countdown to your next birthday.',
    shortDescription: 'Calculate your exact age in years, months, days, hours, and find your next birthday countdown.',
    longDescription: 'The ToolNest Age Calculator is an accurate, easy-to-use tool that computes your precise chronological age based on your date of birth and any target date. In addition to your standard age in years, months, and days, it delivers detailed time breakdowns including total weeks, days, hours, minutes, and seconds lived, along with your astrological zodiac sign and the exact days remaining until your next celebration.',
    category: 'calculators',
    categoryName: 'Calculators & Math',
    iconName: 'CalendarClock',
    popular: true,
    featured: true,
    howToSteps: [
      'Select your birth date using the calendar date selector.',
      'Optionally, select a comparison target date (defaults to today).',
      'View your complete age breakdown, time milestones, and upcoming birthday countdown.'
    ],
    features: [
      'Accurate leap year and monthly calendar calculations',
      'Breakdown in years, months, days, hours, and seconds',
      'Live countdown to next birthday and day of the week',
      'Western and Vedic Zodiac identification',
      'Milestone tracker for total days and weeks lived'
    ],
    examples: [
      {
        scenario: 'Official Form Age Verification',
        input: 'Birth Date: April 12, 1995 · Target: Current Date',
        output: '31 Years, 5 Months, 22 Days · 11,498 total days lived',
        explanation: 'Accounts for leap years and exact month lengths (28–31 days) to give official chronological accuracy for employment or passport forms.'
      },
      {
        scenario: 'Birthday Celebration Planning',
        input: 'Birth Date: November 24, 1998 · Target: Current Date',
        output: 'Next birthday in 51 days on a Tuesday',
        explanation: 'Calculates the exact number of days remaining until your upcoming birthday so you can plan trips and gatherings.'
      }
    ],
    faqs: [
      {
        question: 'How does this Age Calculator compute exact months and days?',
        answer: 'Our algorithm accounts for the varying lengths of each month (28, 29, 30, or 31 days) as well as quadrennial leap years, giving you a mathematically accurate chronological calculation rather than a generic 30-day estimate.'
      },
      {
        question: 'Can I calculate age as of a past or future date?',
        answer: 'Yes! Simply modify the "Target Date" field to any date in the past or future to see how old you were or will be on that specific day.'
      },
      {
        question: 'Is my birth date data stored on any server?',
        answer: 'No. All calculations are executed 100% locally in your browser. No personal dates are ever transmitted or stored on any server.'
      }
    ],
    relatedToolIds: ['date-difference-calculator', 'bmi-calculator', 'percentage-calculator']
  },
  {
    id: 'percentage-calculator',
    title: 'Percentage Calculator',
    seoTitle: 'Free Percentage Calculator — Percentage Change, Increase, Decrease & Discounts',
    metaDescription: 'Calculate percentages easily with 4 flexible modes: what is X% of Y, percentage increase/decrease, margin/discount, and fractional percentage.',
    shortDescription: 'Calculate percentage values, percentage increases, discounts, and markups instantly with clear formulas.',
    longDescription: 'Whether you are calculating sales discounts, tips, tax rates, school grades, or business profit margins, the ToolNest Percentage Calculator provides four dedicated calculators in one clean interface. It displays the step-by-step mathematical formula behind every calculation so you always understand the outcome.',
    category: 'calculators',
    categoryName: 'Calculators & Math',
    iconName: 'Percent',
    popular: true,
    featured: true,
    howToSteps: [
      'Choose the percentage calculation type from the tabs (Standard, Increase/Decrease, What % is X of Y, or Discount/Markup).',
      'Enter the numerical values into the input fields.',
      'View the instant result, difference delta, and calculation formula breakdown.'
    ],
    features: [
      'Four intuitive calculation modes in one screen',
      'Shows mathematical steps and formulas',
      'Live recalculation on keystroke',
      'Negative and decimal number support',
      'One-click result copy to clipboard'
    ],
    examples: [
      {
        scenario: 'Retail Discount & Final Price',
        input: 'Original Price: $120.00 · Discount: 25%',
        output: 'Final Price: $90.00 · Total Saved: $30.00',
        explanation: 'Formula: $120 - ($120 * 0.25) = $90.00 final sale price.'
      },
      {
        scenario: 'Annual Revenue Growth',
        input: 'Previous Year: $50,000 · Current Year: $72,500',
        output: '+45.00% Percentage Increase',
        explanation: 'Formula: (($72,500 - $50,000) / $50,000) * 100 = 45% expansion.'
      }
    ],
    faqs: [
      {
        question: 'What is the formula to calculate percentage increase?',
        answer: 'Percentage Increase = ((New Value - Original Value) / Original Value) * 100. If the result is negative, it represents a percentage decrease.'
      },
      {
        question: 'How do I calculate a discount?',
        answer: 'To find the discounted price, subtract the discount amount (Original Price * Discount% / 100) from the Original Price.'
      }
    ],
    relatedToolIds: ['emi-loan-calculator', 'unit-converter', 'age-calculator']
  },
  {
    id: 'emi-loan-calculator',
    title: 'EMI / Loan Calculator',
    seoTitle: 'EMI & Loan Calculator — Calculate Monthly Payment, Interest & Amortization',
    metaDescription: 'Free online EMI calculator for home loans, car loans, and personal loans. View monthly installments, total interest payable, and yearly amortization breakdown.',
    shortDescription: 'Compute your monthly loan EMI, total interest, and total payment with interactive amortization schedules.',
    longDescription: 'Plan your borrowing with confidence. The ToolNest EMI / Loan Calculator computes equated monthly installments (EMI) for mortgages, auto loans, student loans, or personal debt. Adjust loan amount, annual interest rate, and tenure to visualize principal vs. interest ratios with interactive charts and an amortization schedule.',
    category: 'calculators',
    categoryName: 'Calculators & Math',
    iconName: 'Coins',
    popular: true,
    featured: true,
    howToSteps: [
      'Enter the total loan principal amount.',
      'Enter the annual interest rate percentage.',
      'Choose the loan tenure in years or months.',
      'Instantly see your monthly EMI, total interest payable, and interactive breakdown table.'
    ],
    features: [
      'Standard reducing-balance EMI algorithm used by global banks',
      'Toggle tenure between years and months',
      'Visual breakdown of Principal vs Interest',
      'Yearly and monthly amortization schedules',
      'Prepayment savings estimates'
    ],
    examples: [
      {
        scenario: '30-Year Fixed Home Mortgage',
        input: 'Principal: $350,000 · Rate: 6.75% · Tenure: 30 Years',
        output: 'Monthly EMI: $2,269.96 · Total Interest: $467,185.07',
        explanation: 'Enables homebuyers to assess long-term borrowing costs and test different down payment amounts.'
      },
      {
        scenario: '5-Year New Car Loan',
        input: 'Principal: $35,000 · Rate: 5.50% · Tenure: 5 Years',
        output: 'Monthly EMI: $668.61 · Total Interest: $5,116.66',
        explanation: 'Determines affordable monthly installments before negotiating vehicle financing.'
      }
    ],
    faqs: [
      {
        question: 'What is the mathematical formula used for EMI calculation?',
        answer: 'EMI = [P x R x (1+R)^N]/[(1+R)^N-1], where P is Principal, R is monthly interest rate (Annual Rate / 12 / 100), and N is number of monthly installments.'
      },
      {
        question: 'Does this calculator include processing fees or taxes?',
        answer: 'This tool computes the core financial installment and interest. Bank processing fees, insurance premiums, and statutory taxes may vary by lender.'
      }
    ],
    relatedToolIds: ['percentage-calculator', 'currency-converter', 'unit-converter']
  },
  {
    id: 'word-counter',
    title: 'Word & Character Counter',
    seoTitle: 'Word Counter & Character Counter — Reading Time, Sentences & Density',
    metaDescription: 'Count words, characters (with & without spaces), sentences, and paragraphs in real time. Features reading time, speaking time, and keyword frequency density.',
    shortDescription: 'Live word and character count, reading time, speaking time, and keyword frequency analyzer.',
    longDescription: 'A modern, distraction-free text metrics suite designed for writers, students, social media managers, and SEO specialists. Paste or type your text to see real-time statistics including word count, character count (with/without spaces), sentence count, paragraph count, estimated reading & speaking time, and top repeated keywords.',
    category: 'text',
    categoryName: 'Text & Writing',
    iconName: 'FileText',
    popular: true,
    featured: true,
    howToSteps: [
      'Type or paste your text directly into the clean editor area.',
      'Observe live metrics updating in real time with zero delay.',
      'Use the utility toolbar to copy text, clear, or transform case (UPPERCASE, lowercase, Title Case).'
    ],
    features: [
      'Real-time live counting without clicking submit',
      'Character counts with and without whitespace',
      'Average reading and speaking duration estimations',
      'Keyword density analysis to detect overused terms',
      'Quick case conversion (Title Case, UPPERCASE, lowercase, Sentence case)'
    ],
    examples: [
      {
        scenario: 'Academic Essay Limit Check',
        input: 'College admission personal statement text',
        output: '485 Words · 3,110 Characters · 24 Sentences',
        explanation: 'Verifies the draft stays strictly under a 500-word essay cap while highlighting character density.'
      },
      {
        scenario: 'Keynote Speech Timing',
        input: 'Conference presentation draft of 650 words',
        output: 'Speaking Time: ~5.0 Minutes (130 WPM cadence)',
        explanation: 'Helps speakers pace their verbal delivery to respect event schedule constraints.'
      }
    ],
    faqs: [
      {
        question: 'What reading speed is used for the reading time estimate?',
        answer: 'The standard adult reading speed of 200 words per minute (WPM) is used for silent reading, and 130 WPM for speaking/presentation time.'
      },
      {
        question: 'Is my text sent to a remote server or logged?',
        answer: 'Never. The word counter runs entirely in your browser using local JavaScript. Your confidential drafts, essays, and notes never leave your computer.'
      }
    ],
    relatedToolIds: ['typing-speed-test', 'password-generator', 'pdf-to-word']
  },
  {
    id: 'typing-speed-test',
    title: 'Typing Speed Test',
    seoTitle: 'Free Typing Speed Test — Test Your WPM, CPM & Typing Accuracy Online',
    metaDescription: 'Test your typing speed and accuracy in Words Per Minute (WPM) and Characters Per Minute (CPM) with our interactive 15s, 30s, and 60s typing speed test.',
    shortDescription: 'Measure your Words Per Minute (WPM), CPM, and accuracy with timed tests and live feedback.',
    longDescription: 'Enhance your keyboard productivity with the ToolNest Typing Speed Test. Choose your test duration (15, 30, or 60 seconds), select from varied vocabulary sets, and begin typing. You will receive live character highlighting, instant WPM and accuracy metrics, and a detailed performance breakdown upon completion.',
    category: 'text',
    categoryName: 'Text & Writing',
    iconName: 'Keyboard',
    popular: true,
    featured: true,
    recentlyAdded: true,
    howToSteps: [
      'Select your preferred duration (15s, 30s, or 60s).',
      'Click into the input area or press any key to start the timer.',
      'Type each word as shown. Green highlights correct keystrokes, red highlights typos.',
      'Review your final WPM, raw CPM, accuracy percentage, and error count.'
    ],
    features: [
      'Strict WPM calculation following standard 5-character word metrics',
      'Visual real-time color highlights for correct and incorrect characters',
      'Multiple timer durations (15s, 30s, 60s)',
      'Detailed post-test summary with replay and reset functionality',
      'Mobile and desktop keyboard support'
    ],
    examples: [
      {
        scenario: 'Customer Support Candidate Pre-screen',
        input: '30-second timed benchmark text session',
        output: '65 WPM · 98% Accuracy · Master Typist rank',
        explanation: 'Proves high-speed keyboard proficiency required for real-time customer chat and support roles.'
      },
      {
        scenario: 'Daily Productivity Benchmark',
        input: '15-second morning warmup session',
        output: '78 WPM · 99% Accuracy · 390 CPM',
        explanation: 'Helps developers and typists warm up fingers and track keyboard dexterity over time.'
      }
    ],
    faqs: [
      {
        question: 'What is a good typing speed for an adult?',
        answer: 'The average typing speed is around 40 WPM. Professional typists, coders, and transcriptionists typically maintain speeds of 65 to 90+ WPM with 95%+ accuracy.'
      },
      {
        question: 'How is WPM calculated?',
        answer: 'Standard WPM = (Total Correct Characters / 5) / (Time in Minutes). The standard 5-character measurement ensures fairness regardless of word lengths.'
      }
    ],
    relatedToolIds: ['word-counter', 'password-generator', 'age-calculator']
  },
  {
    id: 'image-compressor',
    title: 'Image Compressor',
    seoTitle: 'Free Online Image Compressor — Compress JPG, PNG & WebP Without Quality Loss',
    metaDescription: 'Compress JPEG, PNG, and WebP images online for free. Reduce file size up to 90% with adjustable quality controls and instant browser-side processing.',
    shortDescription: 'Compress JPG, PNG, and WebP images quickly while maintaining crisp visual clarity.',
    longDescription: 'Optimize your images for faster website loading, email attachments, and storage savings. ToolNest Image Compressor leverages modern HTML5 Canvas and browser compression APIs to shrink JPEG, PNG, and WebP files locally on your device. Adjust the quality slider, preview the resulting file size, and download your optimized image instantly.',
    category: 'media',
    categoryName: 'Images & Media',
    iconName: 'Minimize2',
    popular: true,
    featured: true,
    howToSteps: [
      'Drag and drop an image file (JPEG, PNG, WebP) or click to browse.',
      'Adjust the compression quality slider to your desired balance of size and clarity.',
      'Inspect the original vs. compressed file size and percentage reduction.',
      'Click "Download Compressed Image" to save your optimized file.'
    ],
    features: [
      '100% Client-side compression — your images are never uploaded to any server',
      'Support for JPEG, PNG, and modern WebP formats',
      'Adjustable compression slider with live file size preview',
      'Side-by-side visual quality comparison',
      'Instant one-click download'
    ],
    examples: [
      {
        scenario: 'Email Attachment Limit Optimization',
        input: '4.8 MB high-res camera photo (JPEG)',
        output: 'Reduced to 490 KB (-89.8% reduction) at 75% quality',
        explanation: 'Enables sending multiple photos over email without bouncing due to inbox file caps.'
      },
      {
        scenario: 'Web Page Speed & Core Web Vitals',
        input: '1.9 MB website hero graphic',
        output: 'Compressed to 180 KB with clean edges and zero server uploads',
        explanation: 'Accelerates Largest Contentful Paint (LCP) and boosts search engine rankings.'
      }
    ],
    faqs: [
      {
        question: 'Will compressing an image reduce its dimensions?',
        answer: 'No, this tool reduces the binary file size (data compression) while preserving the original pixel dimensions. If you want to change dimensions, use our Image Resizer.'
      },
      {
        question: 'Is there a file upload limit or fee?',
        answer: 'ToolNest Image Compressor is completely free with no registration or limits. Processing happens directly on your device CPU/GPU.'
      }
    ],
    relatedToolIds: ['image-resizer', 'qr-code-generator', 'pdf-to-word']
  },
  {
    id: 'image-resizer',
    title: 'Image Resizer',
    seoTitle: 'Free Online Image Resizer — Resize Images to Exact Dimensions & Aspect Ratios',
    metaDescription: 'Resize photos and graphics online by pixels or percentage. Maintain aspect ratio, choose output format (JPEG, PNG, WebP), and download resized images free.',
    shortDescription: 'Resize images to exact pixel dimensions or percentages with aspect ratio lock.',
    longDescription: 'Resize photos, banners, and digital graphics with precision. The ToolNest Image Resizer allows you to scale images by exact pixel width and height or by custom percentage scale. Maintain aspect ratio to prevent distortion, convert between PNG, JPEG, and WebP, and export your resized image in seconds.',
    category: 'media',
    categoryName: 'Images & Media',
    iconName: 'Maximize2',
    popular: true,
    featured: true,
    howToSteps: [
      'Upload your image from your computer or mobile device.',
      'Enter your desired width or height in pixels, or choose a common preset.',
      'Keep the "Lock Aspect Ratio" checked to preserve proportions.',
      'Select your output format and click "Download Resized Image".'
    ],
    features: [
      'Precise pixel dimension control and percentage scaling',
      'Smart aspect ratio lock to prevent image stretching or distortion',
      'Preset quick dimensions (Social Media, Thumbnail, HD 1080p, Banner)',
      'Format conversion: Export as PNG, JPEG, or WebP',
      'High-quality bicubic canvas resampling'
    ],
    examples: [
      {
        scenario: 'Social Media Profile Picture',
        input: 'Original camera shot (4000 × 3000 px) scaled to 1080 × 1080 px',
        output: 'Perfect square 1080 × 1080 px image',
        explanation: 'Prepares photos for Instagram, Twitter, and LinkedIn profiles without awkward edge cropping.'
      },
      {
        scenario: 'Website Blog Thumbnail',
        input: 'High-res illustration (2560 × 1440 px) scaled down to 600 × 338 px',
        output: 'Sharp 600 px wide thumbnail with preserved 16:9 ratio',
        explanation: 'Reduces memory overhead and ensures crisp rendering on mobile blog feeds.'
      }
    ],
    faqs: [
      {
        question: 'Can I enlarge a small image without quality loss?',
        answer: 'You can upscale images, but enlarging bitmap images beyond their native resolution will naturally result in softer edges or pixelation.'
      },
      {
        question: 'Are my images stored or uploaded anywhere?',
        answer: 'No. All resizing operations take place directly in your browser memory.'
      }
    ],
    relatedToolIds: ['image-compressor', 'qr-code-generator', 'word-to-pdf']
  },
  {
    id: 'qr-code-generator',
    title: 'QR Code Generator',
    seoTitle: 'Free QR Code Generator — Create Custom QR Codes for URLs, Text, WiFi & Contact',
    metaDescription: 'Generate custom QR codes instantly for website URLs, plain text, WiFi passwords, and email. Customize colors, size, and download in high-resolution PNG format.',
    shortDescription: 'Generate customized high-resolution QR codes for websites, plain text, and WiFi networks.',
    longDescription: 'Create scannable, high-resolution QR codes for websites, restaurant menus, business cards, product packaging, and WiFi access. The ToolNest QR Code Generator offers custom color pickers for foreground and background, adjustable size scales, and instant PNG downloads with zero watermarks.',
    category: 'utilities',
    categoryName: 'Daily Utilities',
    iconName: 'QrCode',
    popular: true,
    featured: true,
    recentlyAdded: true,
    howToSteps: [
      'Enter the target URL, plain text, or WiFi network information.',
      'Customize foreground and background colors to match your brand style.',
      'Adjust the output resolution size.',
      'Click "Download QR Code" to save the high-res PNG image.'
    ],
    features: [
      'Support for URLs, plain text, email, phone numbers, and WiFi',
      'Custom foreground and background color palettes',
      'Scalable resolution settings from 128px up to 1024px',
      'High error-correction level to guarantee scannability',
      'Zero expiration — generated QR codes never expire'
    ],
    examples: [
      {
        scenario: 'Contactless Restaurant Digital Menu',
        input: 'URL: https://mybistro.com/menu with custom slate foreground',
        output: 'Scannable 450 × 450 px vector PNG QR code',
        explanation: 'Customers scan table stickers directly using standard smartphone cameras.'
      },
      {
        scenario: 'Guest WiFi Instant Connect',
        input: 'SSID: "CoffeeShop_Guest" with WPA2 password',
        output: 'WiFi Quick-Join QR Code',
        explanation: 'Allows patrons to join your guest network instantly without asking staff for passwords.'
      }
    ],
    faqs: [
      {
        question: 'Do the generated QR codes expire?',
        answer: 'No! These are static QR codes that directly encode your text or URL. They will work forever as long as your destination link remains active.'
      },
      {
        question: 'Can I use these QR codes for commercial projects?',
        answer: 'Yes, 100% free for personal, educational, and commercial use with no attribution required.'
      }
    ],
    relatedToolIds: ['password-generator', 'image-compressor', 'unit-converter']
  },
  {
    id: 'unit-converter',
    title: 'Unit Converter',
    seoTitle: 'Online Unit Converter — Length, Weight, Temperature, Area, Volume & Speed',
    metaDescription: 'Convert between metric and imperial units across 8 essential categories: Length, Weight, Temperature, Area, Volume, Speed, Time, and Digital Storage.',
    shortDescription: 'Convert between metric and imperial units across 8 measurement categories with live 2-way computation.',
    longDescription: 'A versatile, real-time measurement unit converter for engineers, students, cooks, and everyday tasks. Effortlessly convert across 8 core categories including Length (meters, feet, inches, miles), Weight (kilograms, pounds, ounces), Temperature (Celsius, Fahrenheit, Kelvin), Area, Volume, Speed, Time, and Digital Storage (bytes, MB, GB, TB).',
    category: 'converters',
    categoryName: 'Converters',
    iconName: 'ArrowLeftRight',
    popular: true,
    featured: true,
    howToSteps: [
      'Choose a conversion category (e.g., Length, Weight, Temperature, Storage).',
      'Select your starting unit and target destination unit.',
      'Type any number to see the instant live conversion and exact mathematical formula.'
    ],
    features: [
      '8 comprehensive measurement categories with dozens of units',
      'Bidirectional live conversion with quick unit swap button',
      'High-precision scientific decimal formatting',
      'Shows conversion formula and reference equivalency',
      'Copy result with one click'
    ],
    examples: [
      {
        scenario: 'Baking & Cooking Oven Temperature',
        input: '180°C in Fahrenheit',
        output: '356°F',
        explanation: 'Formula: (180 × 9/5) + 32 = 356°F for international recipe compliance.'
      },
      {
        scenario: 'Running Marathon Distance',
        input: '42.195 Kilometers into Miles',
        output: '26.219 Miles',
        explanation: 'Standard athletic conversion using 1 km = 0.621371 miles.'
      }
    ],
    faqs: [
      {
        question: 'How do you convert Celsius to Fahrenheit?',
        answer: 'The formula is (°C x 9/5) + 32 = °F. To convert Fahrenheit to Celsius, use (°F - 32) x 5/9.'
      },
      {
        question: 'Are digital storage conversions calculated in decimal or binary?',
        answer: 'Our converter supports standard binary multiples (1 KB = 1024 Bytes, 1 MB = 1024 KB) with clear scientific labels.'
      }
    ],
    relatedToolIds: ['currency-converter', 'percentage-calculator', 'bmi-calculator']
  },
  {
    id: 'currency-converter',
    title: 'Currency Converter',
    seoTitle: 'Free Currency Converter — Live Foreign Exchange Rates for 28+ Global Currencies',
    metaDescription: 'Convert international currencies with accurate exchange rates for USD, EUR, GBP, JPY, CAD, AUD, INR, and 20+ world currencies. Quick rate comparison table included.',
    shortDescription: 'Convert between 28+ world currencies with realistic exchange rates and quick swap.',
    longDescription: 'Stay on top of foreign exchange rates for travel planning, international shopping, and business budgeting. ToolNest Currency Converter provides seamless conversions across 28+ major world currencies including US Dollar, Euro, British Pound, Japanese Yen, Canadian Dollar, Australian Dollar, Indian Rupee, and more. Includes a handy multi-currency rate comparison table.',
    category: 'converters',
    categoryName: 'Converters',
    iconName: 'DollarSign',
    popular: true,
    featured: true,
    howToSteps: [
      'Enter the amount you wish to convert.',
      'Select your source "From" currency and target "To" currency.',
      'The converted value updates immediately. Use the swap button to invert the pair.'
    ],
    features: [
      '28+ global fiat currencies supported',
      'One-tap reverse currency swap',
      'Multi-currency comparison matrix against base currency',
      'Quick presets for popular currency pairs (EUR/USD, GBP/USD, USD/INR, USD/JPY)',
      'Works offline with built-in reference baseline exchange rates'
    ],
    examples: [
      {
        scenario: 'Overseas Travel Budgeting',
        input: '$1,200 USD to Euros (EUR)',
        output: '€1,104.00 EUR (at 1 USD = 0.92 EUR)',
        explanation: 'Provides clear spending calculations for accommodation, transit, and food across Europe.'
      },
      {
        scenario: 'International Freelance Invoice',
        input: '£2,500 GBP to US Dollars (USD)',
        output: '$3,164.56 USD (at 1 GBP = 1.2658 USD)',
        explanation: 'Assists contractors in estimating invoice receivables across international bank boundaries.'
      }
    ],
    faqs: [
      {
        question: 'Are exchange rates suitable for official financial auditing?',
        answer: 'These exchange rates represent mid-market reference values. Actual commercial bank and credit card conversion fees or spreads may vary.'
      },
      {
        question: 'Can I swap currencies easily?',
        answer: 'Yes! Simply click the double arrow swap icon between the currency dropdowns to immediately reverse the conversion.'
      }
    ],
    relatedToolIds: ['emi-loan-calculator', 'percentage-calculator', 'unit-converter']
  },
  {
    id: 'pdf-to-word',
    title: 'PDF to Word',
    seoTitle: 'Free PDF to Word Converter — Convert PDF Documents to Editable Word (.docx)',
    metaDescription: 'Convert PDF documents into editable Word files (.docx and formatted text) online for free. Extract text, headings, and lists cleanly right inside your browser.',
    shortDescription: 'Convert PDF documents to editable Microsoft Word files with clean text extraction.',
    longDescription: 'Turn non-editable PDF documents into clean, editable Word documents. ToolNest PDF to Word processes documents directly in your browser, extracting paragraph text, headers, and bulleted lists into a fully formatted `.doc / .docx` format compatible with Microsoft Word, Google Docs, and LibreOffice. Complete privacy guaranteed: your files are never uploaded to any remote server.',
    category: 'text',
    categoryName: 'Text & Writing',
    iconName: 'FileCheck',
    popular: true,
    featured: true,
    recentlyAdded: true,
    howToSteps: [
      'Upload your PDF file or paste/import text content.',
      'The document text and formatting structure are parsed locally in your browser.',
      'Preview and edit the extracted content in the built-in document editor if desired.',
      'Click "Download as Word Document (.doc/.docx)" to save your editable file.'
    ],
    features: [
      'Zero server upload — 100% client-side privacy compliance',
      'Produces standard Word-compatible formatted documents (.doc/.docx)',
      'Live interactive text preview and editor before exporting',
      'Cleans up formatting glitches and line breaks',
      'One-click clipboard copy of extracted text'
    ],
    examples: [
      {
        scenario: 'Updating Old Contract Terms',
        input: 'PDF supplier contract with outdated contact numbers',
        output: 'Editable Microsoft Word (.doc) with headings intact',
        explanation: 'Enables quick clause updates without re-typing entire legal agreements from scratch.'
      },
      {
        scenario: 'Extracting Academic Research Papers',
        input: 'Multi-column conference whitepaper PDF',
        output: 'Clean continuous text draft in Word format',
        explanation: 'Facilitates citing quotes, drafting literature reviews, and formatting term papers.'
      }
    ],
    faqs: [
      {
        question: 'Is my confidential PDF file secure?',
        answer: 'Yes, absolutely. Unlike many online tools that upload your sensitive documents to remote servers, ToolNest processes your file entirely on your computer inside your browser.'
      },
      {
        question: 'Can I open the downloaded file in Microsoft Word and Google Docs?',
        answer: 'Yes. The generated document uses standard Word XML / HTML markup that opens seamlessly in Microsoft Word, Google Docs, Apple Pages, and LibreOffice.'
      }
    ],
    relatedToolIds: ['word-to-pdf', 'word-counter', 'password-generator']
  },
  {
    id: 'word-to-pdf',
    title: 'Word to PDF',
    seoTitle: 'Free Word to PDF Converter & Document Creator — Export Clean PDF Online',
    metaDescription: 'Create, edit, or upload Word documents and convert them to formatted PDF files online. Includes rich formatting toolbar and professional document templates.',
    shortDescription: 'Create or convert Word documents and rich text into clean, printable PDF documents.',
    longDescription: 'Compose, format, and generate professional PDF documents directly in your web browser. The ToolNest Word to PDF converter features an intuitive rich text editor with options for headings, bold, italics, bullet points, numbered lists, blockquotes, and tables. Choose from pre-made templates (Invoice, Resume, Formal Letter, Project Brief) and export directly to a print-ready PDF.',
    category: 'text',
    categoryName: 'Text & Writing',
    iconName: 'FileType',
    popular: true,
    featured: true,
    recentlyAdded: true,
    howToSteps: [
      'Type or paste your document, or load a pre-designed template (Resume, Invoice, Letter).',
      'Format headings, font styles, and bullet lists using the toolbar.',
      'Click "Export / Print as PDF" to generate and save your crisp PDF file.'
    ],
    features: [
      'Rich formatting toolbar: Bold, Italic, Underline, H1, H2, Lists, and Quotes',
      'Pre-built professional templates: Business Letter, Modern Resume, Invoice, Meeting Minutes',
      'Pixel-perfect print styling tailored for standard A4 and US Letter layouts',
      'No registration, watermarks, or file size restrictions',
      'Fully responsive editor for desktop, tablet, and mobile'
    ],
    examples: [
      {
        scenario: 'Sending a Professional Job Application CV',
        input: 'Modern Resume Template filled with work experience and skills',
        output: 'Crisp vector PDF with consistent margins and zero watermarks',
        explanation: 'Ensures formatting does not shift or break across different applicant tracking systems (ATS).'
      },
      {
        scenario: 'Client Commercial Billing',
        input: 'Freelance service itemization on Invoice Template',
        output: 'Official PDF invoice with payment details',
        explanation: 'Produces an unalterable, professional document ready to attach to billing emails.'
      }
    ],
    faqs: [
      {
        question: 'How does Word to PDF work without external servers?',
        answer: 'It utilizes modern browser print engine rendering with specialized `@media print` CSS rules to generate high-resolution vector PDF outputs directly from your browser.'
      },
      {
        question: 'Are there any watermarks placed on the exported PDF?',
        answer: 'Never. ToolNest provides clean, watermark-free PDFs suitable for professional and academic submissions.'
      }
    ],
    relatedToolIds: ['pdf-to-word', 'word-counter', 'image-compressor']
  },
  {
    id: 'password-generator',
    title: 'Password Generator',
    seoTitle: 'Secure Password Generator — Create Strong, Random & Custom Passwords Online',
    metaDescription: 'Generate strong, secure, and random passwords online. Customize length, uppercase, numbers, and symbols. Includes real-time strength meter and entropy test.',
    shortDescription: 'Generate unbreakable, cryptographic-grade passwords with real-time strength analysis.',
    longDescription: 'Protect your digital accounts against brute-force attacks and credential stuffing. The ToolNest Password Generator creates cryptographically secure, random passwords with customizable lengths (from 6 to 64 characters) and options for uppercase, lowercase, numbers, and special symbols. Includes a live entropy strength meter and crack-time estimation.',
    category: 'utilities',
    categoryName: 'Daily Utilities',
    iconName: 'ShieldCheck',
    popular: true,
    featured: true,
    howToSteps: [
      'Select your desired password length using the slider.',
      'Check or uncheck character sets (Uppercase, Lowercase, Numbers, Symbols).',
      'Optionally enable "Exclude Lookalike Characters" (e.g., 0, O, 1, l, I).',
      'Click "Generate Password" and copy it to your clipboard with one click.'
    ],
    features: [
      'Uses Web Crypto API (crypto.getRandomValues) for true cryptographic randomness',
      'Live strength meter with bits-of-entropy and brute-force time estimates',
      'Filter to exclude ambiguous characters (e.g. 0/O, 1/l/I, { } [ ] )',
      'Stores a local history of your recently generated passwords during your session',
      'One-click instant copy to clipboard with confirmation notice'
    ],
    examples: [
      {
        scenario: 'Primary Online Banking Security',
        input: '20 characters with uppercase, lowercase, numbers, symbols',
        output: '110 bits of entropy · Crack time: Billions of years',
        explanation: 'Protects critical financial accounts against dictionary and brute-force GPU cracking clusters.'
      },
      {
        scenario: 'Shared Team Password without Typos',
        input: '16 characters with "Exclude Lookalike Characters" enabled',
        output: 'Clean alphanumeric string without confusing 0/O or 1/l characters',
        explanation: 'Avoids login errors when team members manually transcribe keys across mobile devices.'
      }
    ],
    faqs: [
      {
        question: 'How secure is this password generator?',
        answer: 'Our generator uses the browser\'s built-in Web Cryptography API (`crypto.getRandomValues`), the same cryptographic foundation used in modern banking and cybersecurity applications.'
      },
      {
        question: 'Are generated passwords saved anywhere?',
        answer: 'No. Passwords exist only in your browser memory and are permanently cleared when you close or refresh the page.'
      }
    ],
    relatedToolIds: ['qr-code-generator', 'word-counter', 'age-calculator']
  },
  {
    id: 'bmi-calculator',
    title: 'BMI Calculator',
    seoTitle: 'Free BMI Calculator — Body Mass Index, Healthy Weight Range & Category',
    metaDescription: 'Calculate your Body Mass Index (BMI) easily with metric and imperial units. Discover your BMI category, healthy weight range, and body weight recommendations.',
    shortDescription: 'Calculate Body Mass Index (BMI) in Metric or Imperial with visual health categories.',
    longDescription: 'Understand your body composition with the ToolNest BMI Calculator. Calculate your Body Mass Index using Metric (cm & kg) or Imperial (feet, inches & lbs) measurements. Get an instant classification according to World Health Organization (WHO) categories (Underweight, Normal, Overweight, Obese) and view your ideal healthy weight range.',
    category: 'calculators',
    categoryName: 'Calculators & Math',
    iconName: 'Activity',
    popular: true,
    featured: true,
    howToSteps: [
      'Choose your preferred measurement system (Metric or Imperial).',
      'Enter your height (centimeters or feet & inches) and current weight.',
      'Click "Calculate BMI" to see your exact score, category gauge, and healthy weight target.'
    ],
    features: [
      'Dual unit systems: Metric (kg, cm) and Imperial (lbs, ft, in)',
      'WHO-standard BMI categories: Underweight, Normal, Overweight, Obese',
      'Interactive visual color scale indicator',
      'Calculates customized healthy weight range for your exact height',
      'Includes BMI Prime calculation (ratio to upper normal limit)'
    ],
    examples: [
      {
        scenario: 'Metric Fitness Evaluation',
        input: 'Height: 175 cm · Weight: 68 kg',
        output: 'BMI: 22.2 · Normal Weight Category · Healthy Range: 56.7 kg – 76.3 kg',
        explanation: 'Confirms that body weight is proportional to height according to WHO clinical screening scales.'
      },
      {
        scenario: 'Imperial Measurement Tracking',
        input: 'Height: 5 ft 10 in · Weight: 185 lbs',
        output: 'BMI: 26.5 · Overweight Category · Target Normal: 129 lbs – 173 lbs',
        explanation: 'Helps individuals set concrete, healthy weight loss milestones with their healthcare provider.'
      }
    ],
    faqs: [
      {
        question: 'What is the healthy BMI range for an adult?',
        answer: 'According to the World Health Organization (WHO), a BMI between 18.5 and 24.9 is considered normal/healthy for adult men and women.'
      },
      {
        question: 'Does BMI distinguish between muscle mass and fat?',
        answer: 'BMI is an effective screening tool for the general population based on weight and height, but it does not directly measure body fat percentage or muscle mass for athletes.'
      }
    ],
    relatedToolIds: ['age-calculator', 'unit-converter', 'percentage-calculator']
  },
  {
    id: 'date-difference-calculator',
    title: 'Date Difference Calculator',
    seoTitle: 'Date Difference Calculator — Days, Weeks, Months & Business Days Between Dates',
    metaDescription: 'Calculate the exact number of days, weeks, months, and business days between any two dates. Includes options for leap years and end-date inclusion.',
    shortDescription: 'Calculate exact days, weeks, months, and working business days between two dates.',
    longDescription: 'Find the duration between two calendar dates quickly and accurately. The ToolNest Date Difference Calculator computes total days, weeks, months, years, and business days (excluding Saturdays and Sundays). Ideal for project deadline tracking, event planning, contract notice periods, and milestone calculations.',
    category: 'calculators',
    categoryName: 'Calculators & Math',
    iconName: 'CalendarRange',
    popular: true,
    featured: true,
    recentlyAdded: true,
    howToSteps: [
      'Select your Start Date and End Date from the calendar pickers.',
      'Toggle the checkbox if you wish to include the end day in the calculation.',
      'Review your comprehensive results showing total days, working days, and full year/month/day breakdown.'
    ],
    features: [
      'Total calendar days and business days (excluding weekends)',
      'Exact breakdown in Years, Months, and Days',
      'Toggle to include or exclude the final day',
      'Quick presets: +7 Days, +30 Days, +90 Days, +1 Year',
      'Day of the week indicators for start and end dates'
    ],
    examples: [
      {
        scenario: 'Corporate Project Sprint Planning',
        input: 'Start: October 5, 2026 · End: November 20, 2026',
        output: '46 Total Days · 34 Working Business Days · 12 Weekend Days',
        explanation: 'Separates working days from weekends so project managers can accurately estimate developer billable hours.'
      },
      {
        scenario: 'Lease Contract Notice Period',
        input: 'Start: June 1, 2026 · End: September 1, 2026 (include end day)',
        output: '3 Months, 1 Day · 93 Total Calendar Days',
        explanation: 'Verifies whether a tenant has provided sufficient legal calendar days before lease expiration.'
      }
    ],
    faqs: [
      {
        question: 'What constitutes a business day in this calculator?',
        answer: 'Business days count Monday through Friday, automatically excluding Saturdays and Sundays.'
      },
      {
        question: 'Can the calculator handle leap years and historical dates?',
        answer: 'Yes, full Gregorian calendar leap year math is supported across modern and historical calendar calculations.'
      }
    ],
    relatedToolIds: ['age-calculator', 'percentage-calculator', 'word-counter']
  }
];

export const CATEGORIES_CONFIG = [
  { id: 'all', name: 'All Tools', description: 'Browse our complete suite of free online tools' },
  { id: 'calculators', name: 'Calculators & Math', description: 'Financial, age, BMI, and mathematical calculators' },
  { id: 'text', name: 'Text & Writing', description: 'Word counters, typing speed tests, and document tools' },
  { id: 'media', name: 'Images & Media', description: 'Image compression, image resizing, and graphic utilities' },
  { id: 'converters', name: 'Converters', description: 'Unit converters, currency exchange, and measurement tools' },
  { id: 'utilities', name: 'Daily Utilities', description: 'QR codes, password generators, and everyday productivity tools' }
];

export const HOMEPAGE_FAQS = [
  {
    question: 'Are all tools on ToolNest really 100% free to use?',
    answer: 'Yes, absolutely. Every tool on ToolNest is completely free for personal, academic, and commercial use. There are no trial periods, hidden subscription fees, or feature paywalls.'
  },
  {
    question: 'Do I need to create an account or provide an email to use ToolNest?',
    answer: 'No registration or login is required. You can start using any calculator, image compressor, or converter immediately upon opening the page.'
  },
  {
    question: 'How does ToolNest protect my privacy and confidential files?',
    answer: 'ToolNest is built with a client-side architecture. All calculations, image compression, password generation, and document processing execute directly on your device CPU/GPU using native HTML5 and Web APIs. Your files and data are never sent to or logged on any remote server.'
  },
  {
    question: 'Can I use ToolNest on my smartphone or tablet?',
    answer: 'Yes. Every tool is built with a modern, mobile-responsive design that works smoothly across iOS, Android, tablets, and desktop browsers without requiring any app installations.'
  },
  {
    question: 'How accurate are the financial, health, and date calculators?',
    answer: 'Our calculators adhere to standard industry formulas—including the reducing-balance EMI loan formula, World Health Organization (WHO) Body Mass Index standards, and Gregorian calendar leap year algorithms. Step-by-step mathematical breakdowns are provided on tool pages for transparency.'
  }
];
