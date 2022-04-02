This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

# Kodishamlango

Kodishamlango is a property advertisement web application

## Recouces Used

- Bootstrap
- Bootstrap Icons
-

layouts
https://preview.themeforest.net/item/find-houses-real-estate-html-template/full_screen_preview/21745328?_ga=2.67258324.438562095.1646339909-1381196239.1646339909

https://code-theme.com/html/findhouses/index.html

https://themeforest.net/category/site-templates?term=real%20estate

## DATABASE ROWS

- apartments
- agent_contact_information
- apartment_contact_information
- likes
- reviews
- users
- contacts
- photos

### Apartments

## Description & Price

Title
Description
Status (sale, rent, holiday, lodge)
apartment_type "Apartment", "Bungalow", "House", "Mansion", "Villa", "Flat", "Mini Flat", "Duplex", "Shop", "Business Space", "Business Center", "Plot", "Commercial", "Residential"]
bedrooms
price
price_duration
area
guest

## Property Media

## Property Location

Street
Postcode
Sub city
City
Province
Country
Google Maps Latitude
Google Maps Longitude
Extra Information
badge
is_featured
is_published
is_reserved
Slug

## Property Features

Air Conditioning
Swimming Pool
Central Heating
Laundry Room
Gym
Alarm
Window Covering
Refrigerator
TV
WIFI
Microwave

- Relationships
  Belongs to user
  Has one agent contact information
  has many likes
  has many reviews
  has many apartment contacts
  has many photos

### Agent contact information

Name
Email
Phone
Notes

- Relationships
  Belongs to apartment

### Apartment contact information

Name
Email
Phone
Message
Notes

- Relationships
  Belongs to apartment

### Likes

status

- Relationships
  Belongs to apartment
  Belongs to user

### Reviews

stars
description

- Relationships
  Belongs to apartment
  Belongs to user

### Users

first name
last name
full name
email
phone
roles
terms accepted
login count
last login

- Relationships
  Has many apartments
  Has many likes
  Has many reviews
  Has one profile picture

### contacts

name
email
phone
message
notes

### photos

Belongs to apartments
Belongs to users

---
