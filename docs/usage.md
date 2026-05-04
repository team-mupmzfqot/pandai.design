# Usage of the Pandai Design System

## Installation

To install the Pandai Design System, you can use npm or yarn. Run one of the following commands in your project directory:

```bash
npm install pandai-design-system-2026
```

or

```bash
yarn add pandai-design-system-2026
```

## Usage

Once installed, you can import and use the components in your React application. Below are examples of how to use the `Button` and `Card` components.

### Button Component

```jsx
import { Button } from 'pandai-design-system-2026';

const App = () => {
  return (
    <div>
      <Button label="Click Me" onClick={() => alert('Button clicked!')} />
    </div>
  );
};
```

### Card Component

```jsx
import { Card } from 'pandai-design-system-2026';

const App = () => {
  return (
    <div>
      <Card title="Card Title" content="This is some card content." />
    </div>
  );
};
```

## Customization

Both components accept various props for customization:

- **Button**:
  - `label`: The text displayed on the button.
  - `onClick`: Function to call when the button is clicked.
  - `style`: Additional styles to apply.

- **Card**:
  - `title`: The title of the card.
  - `content`: The main content displayed in the card.
  - `style`: Additional styles to apply.

## Conclusion

The Pandai Design System provides a set of reusable components that can be easily integrated into your projects. For more detailed information on each component, refer to the respective documentation files.