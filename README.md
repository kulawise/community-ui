# Kulawise Community Page

A clean, minimal React application for the Kulawise community page.

## Features

- **Hero Section**: Welcoming introduction with call-to-action
- **Survey Modal**: Simple form to join the community
- **Metrics Dashboard**: Display community health metrics
- **Responsive Design**: Mobile-first, scales to desktop
- **Tailwind CSS**: Styled with custom Kulawise brand colors

## Brand Colors

- **Primary Green**: `#1db470` (kulagreen)
- **Dark Green**: `#189d5d` (kulagreen-dark)
- **Accent Yellow**: `#ffedb3` (kulayellow)

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm preview
```

## Project Structure

```
src/
  components/
    Hero.tsx           # Hero section with CTA
    SurveyModal.tsx   # Join community modal
    MetricCard.tsx    # Individual metric card
    MetricsDashboard.tsx  # Metrics display section
    Footer.tsx        # Footer component
  App.tsx             # Main app component
  main.tsx            # Entry point
  index.css           # Tailwind CSS imports
```

## Customization

### Update Telegram Link

Edit `src/components/SurveyModal.tsx` and change the `telegramLink` prop default value.

### Update Metrics

Pass metrics as props to `MetricsDashboard`:

```tsx
<MetricsDashboard
  metrics={{
    totalDistance: "2,000 km",
    gymSessions: 500,
    activeMembers: 750,
  }}
/>
```

Or fetch from API in `App.tsx` using `useEffect`.
