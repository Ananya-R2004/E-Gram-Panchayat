# E-Gram Panchayat: Village Learning Hub - Design Guidelines

## Design Approach
**Reference-Based + Custom Village Aesthetic**: Drawing inspiration from educational platforms like Khan Academy and NCERT while implementing a distinctive rural village theme that feels authentic, warm, and accessible to village learners.

## Core Design Elements

### Typography
- **Primary Font**: Poppins or Nunito (clean, modern, readable)
- **Heading Font**: Merriweather (warm, approachable serif for section titles)
- **Hierarchy**:
  - Page Title: Merriweather, bold, large (text-4xl to text-5xl)
  - Section Headings: Merriweather, semibold (text-2xl to text-3xl)
  - Card Titles: Poppins, medium (text-lg)
  - Body Text: Poppins, regular (text-base)

### Color Palette
- **Primary Accent**: #228B22 (Forest Green) - for buttons, links, highlights
- **Background**: #F2E8CF (Warm Earth/Beige) - subtle leaf or parchment texture
- **Text**: #2C3E20 (Dark Forest) for headings, #4A4A4A for body
- **Card Backgrounds**: White with soft shadows
- **Hover States**: Lighter green (#2ECC40) for interactive elements

### Layout System
- **Spacing Units**: Tailwind units of 4, 6, 8, 12, 16, 20 (e.g., p-4, py-12, gap-8)
- **Container**: max-w-7xl with mx-auto, px-6 for responsive padding
- **Section Padding**: py-16 to py-20 for desktop, py-12 for mobile
- **Grid System**: 
  - Class cards: grid-cols-2 md:grid-cols-4 lg:grid-cols-6 (12 class cards)
  - Skill cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
  - Career roadmaps: grid-cols-1 md:grid-cols-2 lg:grid-cols-5

### Visual Elements

**Bamboo Dividers**: Horizontal decorative borders between sections using subtle bamboo-pattern SVG or border styling (border-t-2 with custom pattern)

**Icons**: Outline-style icons (Heroicons or similar) with village-friendly aesthetics:
- Book/Education icons for class cards
- Lightbulb/Tools for skills
- Compass/Map for career paths

**Background Textures**: Subtle beige paper texture or light leaf pattern (low opacity overlay, not distracting)

**Card Design**:
- Soft rounded corners (rounded-xl)
- Gentle shadow on hover (shadow-md to shadow-lg transition)
- White background with subtle border
- Green accent on hover or active state

**Buttons**:
- Rounded edges (rounded-lg)
- Green background (#228B22) with white text
- Shadow glow effect on hover (shadow-lg with green tint)
- All external links open in new tabs

## Component Library

### Header Section
- Centered layout with village-inspired header
- Page Title: "Village Learning Hub"
- Subtitle: "Your free gateway to learning, skills, and careers — built for every village learner."
- Optional village illustration or icon above title

### Section 1: Technical Learning
- **Heading**: "School Curriculum Resources (1st to 12th)"
- Grid of 12 clickable cards (Class 1 through Class 12)
- Each card: class number, book icon, hover effect revealing "Click to access"
- Chalkboard-style subtle background for this section

### Section 2: Non-Technical Growth
- **Heading**: "Real-World Skills for Every Student"
- 5 skill cards with icons:
  - Financial Basics (coin/money icon)
  - Communication & English (chat/speech icon)
  - Digital Literacy (computer icon)
  - Entrepreneurship/Marketing (lightbulb icon)
  - Agriculture Basics (plant/leaf icon)
- Each card: icon, title, brief description (1 line), "Learn More" link

### Section 3: Career Roadmaps
- **Heading**: "Find Your Future Path"
- 5 career path cards in single row (scrollable on mobile):
  - Engineer, Doctor, Teacher, Data Analyst, Government Jobs
- Each card: relevant icon, career title, "Explore Path" button

### Footer
- Centered simple message: "Powered by E-Gram Panchayat | Building Smarter Villages Together 🌱"
- Light green background (#E8F5E9)
- Small text with minimal padding

## Images
No hero image required. The village aesthetic is achieved through textures, colors, and decorative elements rather than large imagery. Small decorative icons and illustrations throughout enhance the village theme.

## Accessibility
- High contrast between text and backgrounds
- Clear focus states for keyboard navigation
- Alt text for all icons and images
- Touch-friendly button sizes (minimum 44x44px)

## Responsive Behavior
- **Mobile**: Single column stacked layout, full-width cards
- **Tablet**: 2-column grids where appropriate
- **Desktop**: Full multi-column grids as specified above
- Maintain generous padding and readability at all screen sizes