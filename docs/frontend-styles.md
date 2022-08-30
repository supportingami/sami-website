# Frontend Styles

The app uses [Tailwind](https://tailwindcss.com/) to provide a declarative class-base style system, and extends with [DaisyUI](https://daisyui.com/) to provide some base styled components

Documentation pages for the individual repos explain how to use

**NOTE**
There may also be some legacy code related to ChakraUI and Emotion
This needs to be removed along with npm dependencies

## Themes

Theming is handled through DaisyUI, with themes defined in tailwind config file at `frontend\tailwind.config.js`

https://daisyui.com/docs/themes/

Themes can be toggled across the entire app using the ThemeProvider created in `frontend\lib\themeProvider.tsx`

## Dynamic Content Typrography

For content that is included from richHTML in the database, tailwind provides a [typography extension](https://tailwindcss.com/docs/typography-plugin) to style the child rendered html. Simply adding `className: 'prose'` to the containing element will apply consistent styling.

## Components

A full list of available components can be found at
https://daisyui.com/components/

## Best Practice

---

**Don't**  
Write custom style code

```
<button style="margin-right:12px; background:blue; padding:5px; border-radius:8px">
```

**Do**  
Use tailwind and Daisy utility classes

```
<button className="mr-3">
```

```
<button className="mr-3 btn btn-primary">
```

---

**Don't**  
Render unstyled HTML

```
<div dangerouslySetInnerHTML={{ __html: content }} >
```

**Do**  
Use typography prose plugin to style dynamic html

```
<div className="prose" dangerouslySetInnerHTML={{ __html: content }} >
```
