# LoadingSpinner Component

A reusable loading spinner component that uses the favicon from the public folder (`/image.png`) as the loading indicator.

## Features

- ✅ Uses the site's favicon for brand consistency
- ✅ Smooth rotation animation
- ✅ Multiple size options (small, medium, large, xlarge, or custom)
- ✅ Automatic centering option
- ✅ Fully customizable with additional CSS classes
- ✅ Lightweight and performant

## Installation

The component is already installed at:
```
frontend/src/components/common/LoadingSpinner.jsx
```

## Usage

### Basic Usage

```jsx
import LoadingSpinner from "../components/common/LoadingSpinner";

function MyComponent() {
  return <LoadingSpinner />;
}
```

### With Props

```jsx
// Small spinner, not centered
<LoadingSpinner size="small" centered={false} />

// Medium spinner, centered (default)
<LoadingSpinner size="medium" />

// Large spinner with custom classes
<LoadingSpinner size="large" className="my-4" />

// Custom size using Tailwind classes
<LoadingSpinner size="w-20 h-20" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `string` | `"medium"` | Size of the spinner. Options: `"small"`, `"medium"`, `"large"`, `"xlarge"`, or custom Tailwind classes like `"w-20 h-20"` |
| `centered` | `boolean` | `true` | Whether to center the spinner in its container using flexbox |
| `className` | `string` | `""` | Additional CSS classes to apply to the container |

## Size Reference

- **small**: 32px × 32px (w-8 h-8)
- **medium**: 48px × 48px (w-12 h-12)
- **large**: 64px × 64px (w-16 h-16)
- **xlarge**: 96px × 96px (w-24 h-24)

## Common Use Cases

### 1. Full Page Loading

```jsx
<div className="min-h-screen">
  <LoadingSpinner size="large" />
</div>
```

### 2. Button Loading State

```jsx
<button disabled={isLoading}>
  {isLoading ? (
    <span className="flex items-center">
      <LoadingSpinner size="small" centered={false} className="mr-2" />
      Loading...
    </span>
  ) : (
    "Submit"
  )}
</button>
```

### 3. Card/Modal Loading

```jsx
<div className="bg-white rounded-lg p-6 h-64">
  <LoadingSpinner size="medium" />
</div>
```

### 4. Inline Loading

```jsx
<div className="flex items-center">
  <LoadingSpinner size="small" centered={false} className="mr-2" />
  <span>Processing your request...</span>
</div>
```

## Examples

To see all loading scenarios in action, check out the examples page:
```
frontend/src/pages/LoadingExamples.jsx
```

You can view it by navigating to `/loading-examples` in your browser (if the route is added to App.jsx).

## Customization

### Changing Animation Speed

The default animation speed is 1 second per rotation. To customize, modify the inline style in the component:

```jsx
style={{
  animation: "spin 0.5s linear infinite" // Faster rotation
}}
```

### Using a Different Image

To use a different image instead of the favicon, update the `src` attribute:

```jsx
<img
  src="/your-custom-image.png"
  alt="Loading..."
  // ...
/>
```

## Browser Compatibility

The component uses standard CSS animations and is compatible with all modern browsers:
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

## Notes

- The favicon image should be located at `/public/image.png`
- The component uses Tailwind CSS classes for sizing
- The rotation animation is smooth and hardware-accelerated
- The component is accessible with proper alt text
