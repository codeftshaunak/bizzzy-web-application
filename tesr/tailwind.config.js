/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "brand-colors-background-bg-brand": "var(--brand-colors-background-bg-brand)",
        "brand-colors-background-bg-danger": "var(--brand-colors-background-bg-danger)",
        "brand-colors-background-bg-danger-hovered": "var(--brand-colors-background-bg-danger-hovered)",
        "brand-colors-background-bg-error": "var(--brand-colors-background-bg-error)",
        "brand-colors-background-bg-info": "var(--brand-colors-background-bg-info)",
        "brand-colors-background-bg-success": "var(--brand-colors-background-bg-success)",
        "brand-colors-background-bg-tertiary": "var(--brand-colors-background-bg-tertiary)",
        "brand-colors-background-bg-warning": "var(--brand-colors-background-bg-warning)",
        "brand-colors-foreground-fg-default": "var(--brand-colors-foreground-fg-default)",
        "brand-colors-foreground-fg-info": "var(--brand-colors-foreground-fg-info)",
        "brand-colors-foreground-fg-invert": "var(--brand-colors-foreground-fg-invert)",
        "brand-colors-foreground-fg-primary": "var(--brand-colors-foreground-fg-primary)",
        "brand-colors-foreground-fg-secondary": "var(--brand-colors-foreground-fg-secondary)",
        "brand-colors-foreground-fg-success": "var(--brand-colors-foreground-fg-success)",
        "brand-colors-foreground-fg-warning": "var(--brand-colors-foreground-fg-warning)",
        "brand-colors-outline-outline-active": "var(--brand-colors-outline-outline-active)",
        "brand-colors-outline-outline-primary": "var(--brand-colors-outline-outline-primary)",
        "brand-colors-outline-outline-secondary": "var(--brand-colors-outline-outline-secondary)",
        "brand-colors-outline-outline-tertiary": "var(--brand-colors-outline-outline-tertiary)",
        "primitive-colors-don-t-use-these-or-edit-these-amber-amber-100":
          "var(--primitive-colors-don-t-use-these-or-edit-these-amber-amber-100)",
        "primitive-colors-don-t-use-these-or-edit-these-amber-amber-200":
          "var(--primitive-colors-don-t-use-these-or-edit-these-amber-amber-200)",
        "primitive-colors-don-t-use-these-or-edit-these-amber-amber-300":
          "var(--primitive-colors-don-t-use-these-or-edit-these-amber-amber-300)",
        "primitive-colors-don-t-use-these-or-edit-these-amber-amber-400":
          "var(--primitive-colors-don-t-use-these-or-edit-these-amber-amber-400)",
        "primitive-colors-don-t-use-these-or-edit-these-amber-amber-500":
          "var(--primitive-colors-don-t-use-these-or-edit-these-amber-amber-500)",
        "primitive-colors-don-t-use-these-or-edit-these-amber-amber-600":
          "var(--primitive-colors-don-t-use-these-or-edit-these-amber-amber-600)",
        "primitive-colors-don-t-use-these-or-edit-these-amber-amber-800":
          "var(--primitive-colors-don-t-use-these-or-edit-these-amber-amber-800)",
        "primitive-colors-don-t-use-these-or-edit-these-amber-amber-900":
          "var(--primitive-colors-don-t-use-these-or-edit-these-amber-amber-900)",
        "primitive-colors-don-t-use-these-or-edit-these-fuchsia-fuchsia-100":
          "var(--primitive-colors-don-t-use-these-or-edit-these-fuchsia-fuchsia-100)",
        "primitive-colors-don-t-use-these-or-edit-these-fuchsia-fuchsia-200":
          "var(--primitive-colors-don-t-use-these-or-edit-these-fuchsia-fuchsia-200)",
        "primitive-colors-don-t-use-these-or-edit-these-fuchsia-fuchsia-300":
          "var(--primitive-colors-don-t-use-these-or-edit-these-fuchsia-fuchsia-300)",
        "primitive-colors-don-t-use-these-or-edit-these-fuchsia-fuchsia-400":
          "var(--primitive-colors-don-t-use-these-or-edit-these-fuchsia-fuchsia-400)",
        "primitive-colors-don-t-use-these-or-edit-these-fuchsia-fuchsia-50":
          "var(--primitive-colors-don-t-use-these-or-edit-these-fuchsia-fuchsia-50)",
        "primitive-colors-don-t-use-these-or-edit-these-fuchsia-fuchsia-500":
          "var(--primitive-colors-don-t-use-these-or-edit-these-fuchsia-fuchsia-500)",
        "primitive-colors-don-t-use-these-or-edit-these-fuchsia-fuchsia-600":
          "var(--primitive-colors-don-t-use-these-or-edit-these-fuchsia-fuchsia-600)",
        "primitive-colors-don-t-use-these-or-edit-these-fuchsia-fuchsia-700":
          "var(--primitive-colors-don-t-use-these-or-edit-these-fuchsia-fuchsia-700)",
        "primitive-colors-don-t-use-these-or-edit-these-fuchsia-fuchsia-800":
          "var(--primitive-colors-don-t-use-these-or-edit-these-fuchsia-fuchsia-800)",
        "primitive-colors-don-t-use-these-or-edit-these-fuchsia-fuchsia-900":
          "var(--primitive-colors-don-t-use-these-or-edit-these-fuchsia-fuchsia-900)",
        "primitive-colors-don-t-use-these-or-edit-these-gray-gray-600":
          "var(--primitive-colors-don-t-use-these-or-edit-these-gray-gray-600)",
        "primitive-colors-don-t-use-these-or-edit-these-gray-gray-800":
          "var(--primitive-colors-don-t-use-these-or-edit-these-gray-gray-800)",
        "primitive-colors-don-t-use-these-or-edit-these-gray-gray-900":
          "var(--primitive-colors-don-t-use-these-or-edit-these-gray-gray-900)",
        "primitive-colors-don-t-use-these-or-edit-these-lime-green-100":
          "var(--primitive-colors-don-t-use-these-or-edit-these-lime-green-100)",
        "primitive-colors-don-t-use-these-or-edit-these-lime-green-200":
          "var(--primitive-colors-don-t-use-these-or-edit-these-lime-green-200)",
        "primitive-colors-don-t-use-these-or-edit-these-lime-green-300":
          "var(--primitive-colors-don-t-use-these-or-edit-these-lime-green-300)",
        "primitive-colors-don-t-use-these-or-edit-these-lime-green-400":
          "var(--primitive-colors-don-t-use-these-or-edit-these-lime-green-400)",
        "primitive-colors-don-t-use-these-or-edit-these-lime-green-800":
          "var(--primitive-colors-don-t-use-these-or-edit-these-lime-green-800)",
        "primitive-colors-don-t-use-these-or-edit-these-lime-green-900":
          "var(--primitive-colors-don-t-use-these-or-edit-these-lime-green-900)",
        "primitive-colors-don-t-use-these-or-edit-these-red-red-100":
          "var(--primitive-colors-don-t-use-these-or-edit-these-red-red-100)",
        "primitive-colors-don-t-use-these-or-edit-these-red-red-200":
          "var(--primitive-colors-don-t-use-these-or-edit-these-red-red-200)",
        "primitive-colors-don-t-use-these-or-edit-these-red-red-300":
          "var(--primitive-colors-don-t-use-these-or-edit-these-red-red-300)",
        "primitive-colors-don-t-use-these-or-edit-these-red-red-400":
          "var(--primitive-colors-don-t-use-these-or-edit-these-red-red-400)",
        "primitive-colors-don-t-use-these-or-edit-these-red-red-700":
          "var(--primitive-colors-don-t-use-these-or-edit-these-red-red-700)",
        "primitive-colors-don-t-use-these-or-edit-these-red-red-800":
          "var(--primitive-colors-don-t-use-these-or-edit-these-red-red-800)",
        "primitive-colors-don-t-use-these-or-edit-these-red-red-900":
          "var(--primitive-colors-don-t-use-these-or-edit-these-red-red-900)",
        "primitive-colors-don-t-use-these-or-edit-these-sky-sky-100":
          "var(--primitive-colors-don-t-use-these-or-edit-these-sky-sky-100)",
        "primitive-colors-don-t-use-these-or-edit-these-sky-sky-200":
          "var(--primitive-colors-don-t-use-these-or-edit-these-sky-sky-200)",
        "primitive-colors-don-t-use-these-or-edit-these-sky-sky-300":
          "var(--primitive-colors-don-t-use-these-or-edit-these-sky-sky-300)",
        "primitive-colors-don-t-use-these-or-edit-these-sky-sky-400":
          "var(--primitive-colors-don-t-use-these-or-edit-these-sky-sky-400)",
        "primitive-colors-don-t-use-these-or-edit-these-sky-sky-500":
          "var(--primitive-colors-don-t-use-these-or-edit-these-sky-sky-500)",
        "primitive-colors-don-t-use-these-or-edit-these-sky-sky-600":
          "var(--primitive-colors-don-t-use-these-or-edit-these-sky-sky-600)",
        "primitive-colors-don-t-use-these-or-edit-these-sky-sky-800":
          "var(--primitive-colors-don-t-use-these-or-edit-these-sky-sky-800)",
        "primitive-colors-don-t-use-these-or-edit-these-sky-sky-900":
          "var(--primitive-colors-don-t-use-these-or-edit-these-sky-sky-900)",
        "primitive-colors-don-t-use-these-or-edit-these-teal-teal-100":
          "var(--primitive-colors-don-t-use-these-or-edit-these-teal-teal-100)",
        "primitive-colors-don-t-use-these-or-edit-these-teal-teal-200":
          "var(--primitive-colors-don-t-use-these-or-edit-these-teal-teal-200)",
        "primitive-colors-don-t-use-these-or-edit-these-teal-teal-300":
          "var(--primitive-colors-don-t-use-these-or-edit-these-teal-teal-300)",
        "primitive-colors-don-t-use-these-or-edit-these-teal-teal-400":
          "var(--primitive-colors-don-t-use-these-or-edit-these-teal-teal-400)",
        "primitive-colors-don-t-use-these-or-edit-these-teal-teal-50":
          "var(--primitive-colors-don-t-use-these-or-edit-these-teal-teal-50)",
        "primitive-colors-don-t-use-these-or-edit-these-teal-teal-500":
          "var(--primitive-colors-don-t-use-these-or-edit-these-teal-teal-500)",
        "primitive-colors-don-t-use-these-or-edit-these-teal-teal-600":
          "var(--primitive-colors-don-t-use-these-or-edit-these-teal-teal-600)",
        "primitive-colors-don-t-use-these-or-edit-these-teal-teal-700":
          "var(--primitive-colors-don-t-use-these-or-edit-these-teal-teal-700)",
        "primitive-colors-don-t-use-these-or-edit-these-teal-teal-800":
          "var(--primitive-colors-don-t-use-these-or-edit-these-teal-teal-800)",
        "primitive-colors-don-t-use-these-or-edit-these-teal-teal-900":
          "var(--primitive-colors-don-t-use-these-or-edit-these-teal-teal-900)",
        "primitive-colors-don-t-use-these-or-edit-these-violet-violet-100":
          "var(--primitive-colors-don-t-use-these-or-edit-these-violet-violet-100)",
        "primitive-colors-don-t-use-these-or-edit-these-violet-violet-200":
          "var(--primitive-colors-don-t-use-these-or-edit-these-violet-violet-200)",
        "primitive-colors-don-t-use-these-or-edit-these-violet-violet-300":
          "var(--primitive-colors-don-t-use-these-or-edit-these-violet-violet-300)",
        "primitive-colors-don-t-use-these-or-edit-these-violet-violet-400":
          "var(--primitive-colors-don-t-use-these-or-edit-these-violet-violet-400)",
        "primitive-colors-don-t-use-these-or-edit-these-violet-violet-50":
          "var(--primitive-colors-don-t-use-these-or-edit-these-violet-violet-50)",
        "primitive-colors-don-t-use-these-or-edit-these-violet-violet-500":
          "var(--primitive-colors-don-t-use-these-or-edit-these-violet-violet-500)",
        "primitive-colors-don-t-use-these-or-edit-these-violet-violet-600":
          "var(--primitive-colors-don-t-use-these-or-edit-these-violet-violet-600)",
        "primitive-colors-don-t-use-these-or-edit-these-violet-violet-700":
          "var(--primitive-colors-don-t-use-these-or-edit-these-violet-violet-700)",
        "primitive-colors-don-t-use-these-or-edit-these-violet-violet-800":
          "var(--primitive-colors-don-t-use-these-or-edit-these-violet-violet-800)",
        "primitive-colors-don-t-use-these-or-edit-these-violet-violet-900":
          "var(--primitive-colors-don-t-use-these-or-edit-these-violet-violet-900)",
      },
      fontFamily: {
        "2xl-medium": "var(--2xl-medium-font-family)",
        "2xl-regular": "var(--2xl-regular-font-family)",
        "2xl-semibold": "var(--2xl-semibold-font-family)",
        "3xl-medium": "var(--3xl-medium-font-family)",
        "3xl-regular": "var(--3xl-regular-font-family)",
        "3xl-semibold": "var(--3xl-semibold-font-family)",
        "4xl-medium": "var(--4xl-medium-font-family)",
        "4xl-regular": "var(--4xl-regular-font-family)",
        "4xl-semibold": "var(--4xl-semibold-font-family)",
        "5xl-medium": "var(--5xl-medium-font-family)",
        "5xl-regular": "var(--5xl-regular-font-family)",
        "5xl-semibold": "var(--5xl-semibold-font-family)",
        "base-medium": "var(--base-medium-font-family)",
        "base-regular": "var(--base-regular-font-family)",
        "base-semibold": "var(--base-semibold-font-family)",
        "lg-medium": "var(--lg-medium-font-family)",
        "lg-regular": "var(--lg-regular-font-family)",
        "lg-semibold": "var(--lg-semibold-font-family)",
        "sm-medium": "var(--sm-medium-font-family)",
        "sm-regular": "var(--sm-regular-font-family)",
        "sm-semibold": "var(--sm-semibold-font-family)",
        "xl-medium": "var(--xl-medium-font-family)",
        "xl-regular": "var(--xl-regular-font-family)",
        "xl-semibold": "var(--xl-semibold-font-family)",
        "xs-bold": "var(--xs-bold-font-family)",
        "xs-medium": "var(--xs-medium-font-family)",
        "xs-regular": "var(--xs-regular-font-family)",
        "xs-semibold": "var(--xs-semibold-font-family)",
      },
      boxShadow: {
        shadow: "var(--shadow)",
        "shadow-2xl": "var(--shadow-2xl)",
        "shadow-inner": "var(--shadow-inner)",
        "shadow-lg": "var(--shadow-lg)",
        "shadow-md": "var(--shadow-md)",
        "shadow-sm": "var(--shadow-sm)",
        "shadow-xl": "var(--shadow-xl)",
      },
    },
  },
  plugins: [],
};
