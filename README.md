# BetterQR

BetterQR is a QR code generator built with **Next.js** and **TypeScript** that allows users to create QR codes for various purposes, including links and email templates. It also offers customization options to enhance branding.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Technologies](#technologies)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Customizable QR Code Creation**: Generate QR codes for web links or emails with pre-set templates.
- **Email Templates**: Create QR codes that open the email app with a pre-filled template.
- **Logo Customization**: Add your company's logo to personalize your QR codes.
- **Color Picker**: Choose foreground and background colors for your QR codes.
- **Download Options**: Download generated QR codes in PNG or SVG formats.

## Getting Started

To start the development server, clone the repository and install the dependencies:

```bash
git clone https://github.com/MrDxtr/betterqr.git
cd better-qr
npm install
# or
yarn install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open your browser and navigate to `http://localhost:3000` to see the application in action.

## Usage

1. Select the type of QR code you want to generate (Email or URL).
2. Fill in the required fields (e.g., email address, subject, message for email QR codes).
3. Customize the QR code's appearance by selecting colors and uploading a logo.
4. Click the "Generate" button to create your QR code.
5. Download the QR code in your preferred format (PNG or SVG).

## Technologies

- **Next.js**: Framework for server-rendered React applications.
- **TypeScript**: Provides type safety and improved developer experience.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Radix UI**: Accessible UI components for building user interfaces.
- **Framer Motion**: Animation library for React.
- **html-to-image**: Library for converting HTML elements to images.
- **FileSaver.js**: Library for saving files on the client-side.

## Deployment

Deploy on **Vercel** for seamless integration with Next.js. Simply connect your GitHub repository to Vercel, and it will automatically deploy your application.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
