module.exports = {
  // Specifies the ESLint parser
  parser: '@babel/eslint-parser',
  // Specifies the ESLint parser options
  parserOptions: {
    // Use ECMAScript 2021 for modern JavaScript features
    ecmaVersion: 2021,
    // Allow parsing of modern ECMAScript modules
    sourceType: 'module',
    // ESLint will automatically determine the React version
    requireConfigFile: false, // Required for @babel/eslint-parser when no babel.config.js is present
    babelOptions: {
      presets: ['@babel/preset-react'],
    },
    // Enable JSX parsing
    ecmaFeatures: {
      jsx: true,
    },
  },
  // Specifies the environments in which the code will run
  env: {
    // Browser global variables
    browser: true,
    // Node.js global variables and Node.js scoping
    node: true,
    // Enable all ECMAScript 2021 global variables and parsing
    es2021: true,
    // Jest global variables (if testing with Jest)
    jest: true,
  },
  // Extends a set of recommended rules and configurations
  extends: [
    // ESLint's recommended rules
    'eslint:recommended',
    // React's recommended rules
    'plugin:react/recommended',
    // React hooks rules
    'plugin:react-hooks/recommended',
    // Accessibility rules for JSX
    'plugin:jsx-a11y/recommended',
    // Prettier integration (must be the last one to override other formatting rules)
    'plugin:prettier/recommended',
  ],
  // Specifies plugins to use
  plugins: [
    // React plugin for linting React specific code
    'react',
    // React hooks plugin for linting React hooks rules
    'react-hooks',
    // JSX accessibility plugin for linting accessibility rules in JSX
    'jsx-a11y',
    // Prettier plugin for running Prettier as an ESLint rule
    'prettier',
  ],
  // Custom rules for the project
  rules: {
    // Disable prop-types validation as we often use TypeScript or don't strictly enforce it in smaller projects
    'react/prop-types': 'off',
    // Enforce consistent use of destructuring assignment of props, state, and context
    'react/destructuring-assignment': ['error', 'always'],
    // Enforce consistent naming for boolean props
    'react/boolean-prop-naming': ['error', { rule: '^(is|has)[A-Z]([0-9a-zA-Z]+)?$' }],
    // Enforce a specific function type for function components
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    // Enforce consistent indentation for JSX attributes
    'react/jsx-indent-props': ['error', 2],
    // Enforce consistent spacing around JSX curly braces
    'react/jsx-curly-spacing': ['error', 'never'],
    // Enforce consistent use of fragments
    'react/jsx-fragments': ['error', 'syntax'],
    // Enforce consistent use of shorthand for React fragments
    'react/jsx-no-useless-fragment': 'error',
    // Enforce consistent use of self-closing tags for components with no children
    'react/self-closing-comp': ['error', { component: true, html: true }],
    // Enforce consistent use of state in constructor
    'react/state-in-constructor': ['error', 'never'],
    // Enforce consistent use of default props
    'react/require-default-props': 'off', // Often handled by default parameters or TypeScript
    // Enforce rules of hooks
    'react-hooks/rules-of-hooks': 'error',
    // Enforce exhaustive dependencies for hooks
    'react-hooks/exhaustive-deps': 'warn', // Warn for missing dependencies, error might be too strict sometimes
    // Enforce consistent use of single quotes for strings
    quotes: ['error', 'single', { avoidEscape: true }],
    // Enforce consistent use of semicolons
    semi: ['error', 'always'],
    // Enforce consistent use of trailing commas
    'comma-dangle': ['error', 'always-multiline'],
    // Enforce consistent use of arrow functions for callbacks
    'prefer-arrow-callback': 'error',
    // Enforce consistent use of const or let
    'no-var': 'error',
    // Enforce consistent use of template literals
    'prefer-template': 'error',
    // Enforce consistent use of object shorthand
    'object-shorthand': ['error', 'always'],
    // Enforce consistent use of array destructuring
    'prefer-destructuring': ['error', { array: true, object: true }, { enforceForRenamedProperties: false }],
    // Disallow unused variables (except for arguments that start with underscore)
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    // Disallow console.log in production (warn in development)
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    // Prettier rules (should be handled by 'plugin:prettier/recommended', but can add specific overrides if needed)
    'prettier/prettier': [
      'error',
      {
        // Match .prettierrc.js settings
        singleQuote: true,
        semi: true,
        trailingComma: 'all',
        printWidth: 100,
        tabWidth: 2,
        useTabs: false,
        arrowParens: 'always',
      },
    ],
  },
  // Settings for plugins
  settings: {
    // Tell eslint-plugin-react to automatically detect the React version
    react: {
      version: 'detect',
    },
  },
  // Overrides for specific file types or patterns
  overrides: [
    {
      files: ['**/*.test.js', '**/*.spec.js'],
      env: {
        jest: true,
      },
      rules: {
        // Allow specific Jest globals without explicit imports
        'jest/no-disabled-tests': 'warn',
        'jest/no-focused-tests': 'error',
        'jest/no-identical-title': 'error',
        'jest/prefer-to-have-length': 'warn',
        'jest/valid-expect': 'error',
      },
      // Add Jest plugin for linting test files
      plugins: ['jest'],
    },
  ],
};