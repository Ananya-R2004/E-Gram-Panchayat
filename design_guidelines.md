# E-Gram Panchayat Landing Page - Design Guidelines

## Design Approach

**Selected Approach:** Design System-Based (Material Design principles)
**Rationale:** Government civic platform requiring trust, accessibility, and clear information hierarchy for rural community users. Focus on professional presentation, easy navigation, and form usability.

**Core Principles:**
- Trust and credibility through clean, organized layouts
- Maximum accessibility for diverse user base
- Clear service discovery and navigation
- Professional government aesthetic with modern touches

---

## Typography System

**Font Families:**
- Primary: 'Inter' (Google Fonts) - Clean, highly readable sans-serif for UI elements
- Headings: 'Poppins' (Google Fonts) - Strong, professional presence for section titles

**Hierarchy:**
- Hero Headline: 3xl to 5xl (responsive), font-weight 700
- Section Headings: 2xl to 4xl, font-weight 600
- Subsection Titles: xl to 2xl, font-weight 600
- Body Text: base to lg, font-weight 400
- Navigation Links: base, font-weight 500
- Buttons/CTAs: base to lg, font-weight 600

---

## Layout System

**Spacing Primitives:** Tailwind units of 4, 6, 8, 12, 16, 20, 24
- Component padding: p-6 to p-8
- Section spacing: py-16 to py-24
- Grid gaps: gap-6 to gap-8
- Container max-width: max-w-7xl with px-6

**Responsive Breakpoints:**
- Mobile: Single column, full-width elements
- Tablet (md:): 2-column grids where appropriate
- Desktop (lg:): Multi-column layouts, wider containers

---

## Component Library

### Navigation Bar
- Fixed/sticky header with logo on left
- Horizontal menu items: Home, About, Services (dropdown), Contact, Register/Login, Meeting Room
- Services dropdown appears on hover with 5 items vertically stacked
- Mobile: Hamburger menu with slide-out drawer
- Height: h-16 to h-20, with backdrop blur effect
- Smooth scroll behavior on anchor clicks

### Hero Section
- Full viewport height (min-h-screen) with provided background image
- Overlay gradient for text readability
- Centered content with max-width container
- Primary headline + supporting subtitle
- Dual CTA buttons (Register + Learn More) with blurred backgrounds
- Scroll indicator at bottom

### About Section
- Two-column layout (desktop): Left text block + Right image/stats card
- Mission statement with prominent typography
- 3-4 key statistics in grid (2x2) with large numbers
- Section padding: py-20

### Services Overview Section
- Grid layout: 2 columns (tablet), 3 columns (desktop)
- Service cards for each of 5 services
- Card structure: Icon placeholder (top), Title, Brief description, Arrow/link indicator
- Hover elevation effect
- Consistent card height with flex layout

### Contact Section
- Two-column layout: Contact form (left 60%) + Contact info card (right 40%)
- Form fields: Name, Email, Phone, Subject dropdown, Message textarea
- Submit button (full width on mobile)
- Contact info: Address, Phone, Email, Office hours
- Map placeholder or location icon
- Section padding: py-20

### Register/Login Component
- Modal or dedicated section with tabbed interface (Register | Login)
- Registration fields: Full Name, Email, Phone, Village, Password, Confirm Password
- Login fields: Email/Phone, Password, Remember Me checkbox
- Form validation indicators
- "Forgot Password?" link for login
- Terms acceptance checkbox for registration

### Meeting Room Section
- Call-to-action card or feature highlight
- Description of virtual meeting functionality
- "Join Meeting" or "Schedule Meeting" CTA button
- Calendar/schedule visual element
- Section padding: py-16

### Footer
- Three-column layout (desktop): About E-Gram | Quick Links | Contact
- About column: Logo, brief description
- Quick Links: Navigation items, Privacy Policy, Terms
- Contact: Address, phone, email, social media icons
- Copyright bar at bottom
- Section padding: py-12

---

## Interaction Patterns

**Smooth Scrolling:**
- CSS scroll-behavior: smooth applied to html element
- Navigation links scroll to section anchors with offset for fixed header

**Dropdown Menu:**
- Services menu appears on hover with 200ms transition
- Dropdown positioned below parent with shadow
- Each service item clickable with hover state
- Closes on mouse leave with 300ms delay

**Forms:**
- Input focus states with border emphasis
- Inline validation on blur
- Success/error messages below fields
- Disabled submit button until validation passes

**Cards & Buttons:**
- Subtle hover lift effect (translateY -2px) on cards
- Button hover: slight scale (1.02) with transition
- Active states with scale down (0.98)

---

## Images

**Hero Background:**
- Use provided village community background image (homepgbg_1761904001690.jpg)
- Full-width, cover positioning
- Dark overlay (opacity 40-50%) for text contrast
- Fixed attachment for parallax effect (optional)

**Logo Integration:**
- Use provided E-Gram logo (logo-egram_1761904001695.jpg)
- Navbar: h-10 to h-12
- Footer: h-16
- Maintain aspect ratio

**Additional Image Needs:**
- About section: Village council meeting or community gathering (right side)
- Service cards: Icon placeholders using Heroicons (AcademicCapIcon, HeartIcon, SparklesIcon, DocumentTextIcon, ExclamationTriangleIcon)
- Contact section: Map or location pin graphic

---

## Accessibility Considerations

- WCAG 2.1 AA compliant contrast ratios throughout
- Focus indicators on all interactive elements
- ARIA labels for navigation and forms
- Semantic HTML structure (header, nav, main, section, footer)
- Form labels properly associated with inputs
- Skip navigation link for keyboard users
- Alt text for all images including logo

---

## Performance & Technical Notes

- Use CDN for Heroicons: https://cdn.jsdelivr.net/npm/heroicons
- Lazy load images below fold
- Optimize provided background image for web
- Implement intersection observer for scroll animations (subtle fade-in)
- Mobile-first responsive approach