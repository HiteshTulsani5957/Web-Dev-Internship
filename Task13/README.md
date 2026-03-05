# Task 13: Props Product Cards

## Objective
Build a real-world React component implementation demonstrating proper use of **Props**, component reusability, input validation, and best practices.

## About This Task

This project showcases a **Product Card Component** system that displays a catalog of products with various features. Each card receives data through props, demonstrating proper component composition and reusability patterns in React.

## Key Features

✨ **Component Props System**
- Reusable `ProductCard` component with configurable props
- Prop-types validation for type safety
- Default prop values for optional properties

🎨 **Modern UI/UX**
- Responsive grid layout that adapts to screen size
- Smooth animations and hover effects
- Gradient header with modern design

🛒 **Product Features**
- Product images with lazy loading
- Discount badges with percentage display
- Star ratings with review counts
- Stock status indicators
- Category filtering system
- Price comparison (original vs. sale price)

✅ **Input Validation**
- PropTypes validation on all components
- Error handling for missing images
- Stock availability checks
- Input sanitization

📱 **Responsive Design**
- Mobile-first approach
- Breakpoints for tablets and desktops
- Flexible grid system
- Touch-friendly buttons

## Project Structure

```
Task13/
├── index.html                 # HTML entry point
├── package.json              # Dependencies & scripts
├── vite.config.js            # Vite configuration
├── SAMPLE_DATA.js            # Sample product data
├── src/
│   ├── main.jsx             # React app entry
│   ├── App.jsx              # Main app component
│   ├── components/
│   │   └── ProductCard.jsx  # Reusable product card component
│   └── styles/
│       ├── index.css        # Global styles
│       ├── app.css          # App layout styles
│       └── productCard.css  # Product card styles
└── Screenshot/              # Output screenshots
```

## Technologies Used

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **PropTypes** - Runtime type checking
- **CSS3** - Styling with variables and animations
- **JavaScript ES6+** - Modern JavaScript

## Getting Started

### Prerequisites
- Node.js (v14+)
- npm or yarn

### Installation

```bash
# Navigate to Task13 directory
cd Task13

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will open automatically at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## Component Documentation

### ProductCard Component

The main reusable component for displaying products.

#### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `id` | number | ✅ | - | Unique product identifier |
| `name` | string | ✅ | - | Product name |
| `price` | number | ✅ | - | Current sale price |
| `originalPrice` | number | ❌ | - | Original price before discount |
| `category` | string | ❌ | - | Product category |
| `description` | string | ❌ | - | Product description |
| `image` | string | ✅ | - | Product image URL |
| `rating` | number | ❌ | 0 | Product rating (0-5) |
| `reviews` | number | ❌ | 0 | Number of reviews |
| `inStock` | boolean | ❌ | true | Stock availability |
| `discount` | number | ❌ | 0 | Discount percentage |
| `onAddToCart` | function | ❌ | () => {} | Callback when "Add to Cart" is clicked |
| `onViewDetails` | function | ❌ | () => {} | Callback when "View Details" is clicked |

#### Usage Example

```jsx
<ProductCard
  id={1}
  name="Wireless Headphones"
  price={79.99}
  originalPrice={129.99}
  category="Electronics"
  description="Premium noise-cancelling wireless headphones"
  image="https://example.com/image.jpg"
  rating={4.5}
  reviews={128}
  inStock={true}
  discount={38}
  onAddToCart={(product) => console.log('Added:', product)}
  onViewDetails={(product) => console.log('Viewed:', product)}
/>
```

## Features Explained

### 1. Props System
- Components receive data as props
- Default values provided for optional props
- Prop destruction for clean code
- PropTypes for type validation

### 2. Input Validation
- Required props validation
- Type checking with PropTypes
- Image fallback on load error
- Stock status validation

### 3. Best Practices
- Modular component structure
- Proper accessibility (ARIA labels)
- Semantic HTML
- CSS variables for theming
- Responsive design patterns
- Clean code with comments

### 4. Filtering System
- Category-based filtering
- Dynamic filter buttons
- Product count display
- All products view

### 5. Cart Functionality
- Add to cart with validation
- Cart item tracking
- Cart total calculation
- Notification system

## CSS Features

- **CSS Variables** - Easy theme customization
- **CSS Grid** - Responsive product layout
- **Flexbox** - Component alignment
- **Transitions** - Smooth animations
- **Media Queries** - Mobile responsiveness

## Performance Optimizations

- Lazy loading for images
- Event delegation
- Efficient re-renders
- Small bundle size with Vite

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Best Practices Demonstrated

✅ **Code Quality**
- Clear, descriptive variable names
- Comprehensive comments
- Modular component structure
- DRY principle (Don't Repeat Yourself)

✅ **React Best Practices**
- Functional components
- Hooks (useState)
- Props drilling prevention
- Proper key usage in lists

✅ **Accessibility**
- ARIA labels on buttons
- Semantic HTML
- Proper contrast ratios
- Keyboard navigation support

✅ **Performance**
- Efficient CSS selectors
- Minimal DOM manipulation
- Optimized re-renders
- Image optimization

✅ **Maintainability**
- Clear folder structure
- Self-documenting code
- Component reusability
- Easy to extend

## Deliverables

1. ✅ **Source Code** - Well-structured, commented, and modular
2. ✅ **Output Screenshot** - Visual representation of the application
3. ✅ **GitHub Repository** - Version control ready

## Learning Outcomes

After completing this task, you should understand:

- ✅ How to use props to pass data to components
- ✅ Component reusability and composition
- ✅ PropTypes for type safety
- ✅ Event handling in React
- ✅ State management with useState
- ✅ Responsive design patterns
- ✅ CSS best practices
- ✅ Input validation techniques

## Future Enhancements

- Add product search functionality
- Implement wishlist feature
- Add product details modal
- Integrate with backend API
- Add user authentication
- Implement checkout flow
- Add product reviews section
- Product sorting options

## Credits

Built with React, Vite, and modern web standards.

---

**Last Updated:** March 5, 2026
