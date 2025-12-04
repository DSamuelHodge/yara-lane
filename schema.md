# Yara Lane Database Schema

## Overview

This schema is designed for a relational database (PostgreSQL recommended) to support the Yara Lane e-commerce platform. It handles user authentication, product catalog management, order processing, and social features like reviews and wishlists.

## Entity Relationship Diagram (Mermaid)

```mermaid
erDiagram
    User ||--o{ Order : places
    User ||--o{ Review : writes
    User ||--o{ WishlistItem : saves
    User ||--o{ CartItem : has
    User ||--o{ Address : manages

    Product ||--o{ Review : has
    Product ||--o{ WishlistItem : saved_in
    Product ||--o{ CartItem : in_cart
    Product ||--o{ OrderItem : included_in
    Product }|--|| Category : belongs_to

    Order ||--o{ OrderItem : contains
    Order }|--|| Address : shipping_address
    
    Category ||--o{ Category : parent_category

    User {
        uuid id PK
        string email
        string password_hash
        string full_name
        timestamp created_at
    }

    Product {
        uuid id PK
        string name
        string slug
        decimal price
        text short_description
        text ai_brand_story
        text[] ingredients
        string image_url
        int stock_quantity
        uuid category_id FK
        timestamp created_at
    }

    Order {
        uuid id PK
        uuid user_id FK
        decimal total_amount
        enum status
        uuid shipping_address_id FK
        timestamp created_at
    }
```

## Tables

### 1. Users & Authentication

| Column Name | Data Type | Constraints | Description |
|---|---|---|---|
| `id` | UUID | PK, Default: `gen_random_uuid()` | Unique user identifier |
| `email` | VARCHAR(255) | Unique, Not Null | User email address |
| `password_hash` | VARCHAR | Not Null | Hashed password (e.g., Argon2) |
| `full_name` | VARCHAR(100) | Not Null | Display name for reviews/emails |
| `role` | VARCHAR(20) | Default: 'customer' | 'customer', 'admin' |
| `created_at` | TIMESTAMPTZ | Default: NOW() | Account creation time |

### 2. Products & Catalog

| Column Name | Data Type | Constraints | Description |
|---|---|---|---|
| `id` | UUID | PK, Default: `gen_random_uuid()` | Unique product identifier |
| `category_id` | UUID | FK -> Categories(id) | Product category linkage |
| `name` | VARCHAR(255) | Not Null | Product display name |
| `slug` | VARCHAR(255) | Unique, Not Null | URL-friendly identifier |
| `price` | DECIMAL(10,2) | Not Null, Check >= 0 | Unit price |
| `short_description`| TEXT | Not Null | Standard marketing copy |
| `ai_brand_story` | TEXT | Nullable | Generated narrative (Gemini API) |
| `ingredients` | TEXT[] | Default: `{}` | Array of key materials/ingredients |
| `images` | JSONB | Default: `[]` | Array of image URLs (Main + Gallery) |
| `stock_quantity` | INTEGER | Default: 0 | Inventory tracking |
| `is_active` | BOOLEAN | Default: true | Soft delete/hide flag |

### 3. Categories

| Column Name | Data Type | Constraints | Description |
|---|---|---|---|
| `id` | UUID | PK | Unique category ID |
| `parent_id` | UUID | FK -> Categories(id), Nullable | For nested categories (e.g. Skincare -> Serums) |
| `name` | VARCHAR(100) | Not Null | e.g., "Skincare", "Fragrance" |
| `slug` | VARCHAR(100) | Unique | URL slug |

### 4. Reviews

| Column Name | Data Type | Constraints | Description |
|---|---|---|---|
| `id` | UUID | PK | Unique review ID |
| `product_id` | UUID | FK -> Products(id) | The product being reviewed |
| `user_id` | UUID | FK -> Users(id) | The reviewer |
| `rating` | INTEGER | Not Null, Check 1-5 | Star rating |
| `comment` | TEXT | Nullable | Review text content |
| `is_verified` | BOOLEAN | Default: false | True if user purchased item |
| `created_at` | TIMESTAMPTZ | Default: NOW() | Review timestamp |

**Indexes:**
- `idx_reviews_product_id` (for fast lookup on product pages)

### 5. Wishlist (Join Table)

| Column Name | Data Type | Constraints | Description |
|---|---|---|---|
| `user_id` | UUID | PK, FK -> Users(id) | User owner |
| `product_id` | UUID | PK, FK -> Products(id) | Saved product |
| `added_at` | TIMESTAMPTZ | Default: NOW() | When it was saved |

### 6. Cart (Persistent)

| Column Name | Data Type | Constraints | Description |
|---|---|---|---|
| `id` | UUID | PK | Unique cart item entry |
| `user_id` | UUID | FK -> Users(id) | Cart owner |
| `product_id` | UUID | FK -> Products(id) | Product in cart |
| `quantity` | INTEGER | Default: 1, Check > 0 | Number of items |
| `updated_at` | TIMESTAMPTZ | Default: NOW() | For cart expiry logic |

### 7. Orders

| Column Name | Data Type | Constraints | Description |
|---|---|---|---|
| `id` | UUID | PK | Unique order ID |
| `user_id` | UUID | FK -> Users(id) | Customer |
| `status` | ENUM | 'pending', 'paid', 'shipped', 'delivered', 'cancelled' | Order lifecycle state |
| `total_amount` | DECIMAL(10,2) | Not Null | Final charge amount |
| `payment_intent_id`| VARCHAR | Nullable | Stripe/Payment Gateway ID |
| `created_at` | TIMESTAMPTZ | Default: NOW() | Order placement time |

### 8. Order Items

| Column Name | Data Type | Constraints | Description |
|---|---|---|---|
| `id` | UUID | PK | Unique line item ID |
| `order_id` | UUID | FK -> Orders(id) | Parent order |
| `product_id` | UUID | FK -> Products(id) | Snapshot of product |
| `price_at_purchase`| DECIMAL(10,2) | Not Null | Price snapshot (handles price changes) |
| `quantity` | INTEGER | Not Null | Quantity purchased |

## Performance Considerations

1.  **Computed Ratings**: While `Reviews` holds individual data, a cached `average_rating` and `review_count` on the `Products` table (updated via triggers) is recommended to avoid expensive aggregation queries on the homepage.
2.  **Full Text Search**: Enable PostgreSQL `tsvector` on `Products.name` and `Products.short_description` for performant search.
3.  **JSONB**: Used for `images` to allow flexibility without a separate table for product galleries.
