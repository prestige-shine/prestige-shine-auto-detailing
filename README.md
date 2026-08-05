# Prestige Shine Auto Detailing

Build a comprehensive, premium automotive marketplace application named "Aurexo". The UI must be a highly accurate implementation of the provided design system architecture, optimized for clean, scannable layouts and smooth mobile-first responsiveness.



---



### 1. GLOBAL DESIGN SYSTEM & BRANDING



*   **Color Palette:**

    *   **Core Backgrounds:** Pure White (`#FFFFFF`) for primary cards/sections, Light Slate Gray (`#F8F9FA` / `#F3F4F6`) for secondary backings and section containers.

    *   **Dark Neutral Backgrounds:** Off-Black/Deep Charcoal (`#111111`) used strictly for the global footer, navigation drawers, and dark utility surfaces.

    *   **Brand Accents:** High-visibility Lime/Leaf Green (`#84CC16`) for active branding indicators, floating action buttons, active page pagination dots, and high-priority primary vendor actions.

    *   **Secondary/Social Accent:** Royal Indigo (`#6366F1`) for secondary messaging triggers (e.g., WhatsApp chat buttons) and dynamic status pills (e.g., "Great Price" tag using fill `#4338CA`).

*   **Typography & Hierarchy:**

    *   Use a clean, modern geometric Sans-Serif font family (Inter or a premium system UI stack).

    *   **Scale:** Heavy display weights for vehicle names, bold title cases for explicit module headers ("Car Overview", "You Might Also Like"), and crisp mid-sized medium-gray body text with generous line heights for descriptions and reviews.



---



### 2. GLOBAL LAYOUT SHELL (HEADER & FOOTER)



*   **Universal Responsive Header:**

    *   **Left-Aligned:** Aurexo logomark featuring a geometric abstract split-triangle icon in brand green followed by bold charcoal typography.

    *   **Right-Aligned:** A clear pill-shaped "Sign In" button with a thin dark border, sitting next to a custom three-line hamburger menu toggle icon colored in brand green.

*   **Dark Mobile-Optimized Footer:**

    *   Solid off-black backing width-enclosed.

    *   Includes white variant branding logomark, accompanied by a dedicated "Opening Hours" segment block text (*Monday–Friday from 8 AM to 8 PM / Saturday from 9 AM to 6 PM EST*).

    *   An embedded capsule-shaped Newsletter entry form field with light placeholder text: *"Enter your e-mail"* accompanied by an end-adorned submission trigger.

    *   **Collapsible Accordion Navigation Rows:** Multi-row navigation blocks stacked vertically with trailing plus (`+`) operator characters handling structural expanding animations: `Quick Links +` and `Buying & Selling +`.

    *   **Contact Card Meta:** Distinct, plain typographic rows displaying operational text: *1-866-288-6868* and *6205 Peachtree Dunwoody Rd, Atlanta, GA 30328*.



---



### 3. MULTI-TIER OFF-CANVAS RESPONSIVE NAVIGATION DRAWER



When the header’s green hamburger button is clicked, open a smooth full-height off-canvas drawer utilizing an accordian menu system:

*   **Tier 1 Root Items:** Collapsible headers labeled `Home`, `Buy Car`, `News`, `Pages`, and `Listing Layout`. All items use trailing chevron indicators to dictate open/close toggle actions.

*   **Deep Navigation Trees (Mock Routes/Menus):**

    *   `Listing Layout` expands into: *Listing Grid 2/3/4 Columns*, *Listing Half Map Left*, *Listing List Style Half Map*, and *Listing ListStyle Sidebar*.

    *   `Features` expands into: *Listing Sidebar Left/Right*, *Listing Top Map*, and *Listing Filter Canvas*.

    *   `Listing Style` provides instant selection between *Listing Grid* and *Listing List*.

    *   `Listing Details` structures a template matrix labeled *Listing Details 1* through *Listing Details 6*.

    *   `News` expands into: *Blog Standard*, *Blog List*, *Blog Grid Style 1/2/3*, and *Single News 01/02*.

    *   `Pages` maps utility routes: *Sale Agents, Car Dealerships, About us, Calculator, Compare, Clients Reviews, Financing, Services Center, FAQs, 404 Error, Sell Your Car, Terms of use, Coming Soon*.

*   **Drawer Footer:** Include a direct click-to-call phone number integration at the very base.



---



### 4. VEHICLE SINGLE DETAIL TEMPLATE (e.g., "2022 Ford GT White")



Build out a complete single vehicle detail view containing the following layered structural components:



#### A. Sticky Segmented Action Header

*   A persistent, capsule-contained segmented control bar floating anchored at the top of the view window width. It houses three mutual-exclusion tabs: `Overview` (active state: solid charcoal fill with white text), `Description` (default gray link text), and `Features` (default gray link text).

*   **Primary Identity Block:** Left-aligned h1 page header displaying text exactly: `"2022 Ford GT White"`.

*   **Media Utility Button Row:** A horizontal line row placing a structured outline button labeled `+ Compare` next to clean, circular secondary outline action nodes mapping vector line icons for `Favorite (Heart)`, `Share`, and `Print`.



#### B. The "Car Overview" Specification Grid

Implement a dense, 2-column card grid format where each parameter is nested in its own card with a faint border boundary, light gray descriptive label, a custom line icon, and bold data strings:

*   `Mileage`: **2** | `Year`: **2026**

*   `Fuel Type`: **Gasoline** | `Color`: **Black**

*   `Engine Size`: **5.0** | `Transmission`: **Automatic**

*   `Vin Number`: **1** | `Stock Number`: **001**

*   `Condition`: **New Car** | `Cylinders`: **10**

*   `Doors`: **4** | `Seat`: **6**

*   `City MPG`: **2** | `Highway MPG`: **4**

*   `Drive Type`: **FWD - ...**



#### C. Interactive Content Tabs

*   **Description Content:** When the `Description` tab is focused, render text parsing contextual details with regional currency metrics (e.g., *"priced from RM 115,900 to RM 141,900..."*).

*   **"Get To Know This Car" Feature Segment:** Features horizontal category switches using green underlines (`Safety` (Active), `Interior`, `Exterior`, `Mechanical`). Under `Safety`, output a functional vertical checklist backed with solid green checkmarks (`✓ Fabric Upholstery`, `✓ Glove Compartment`, `✓ Halogen Headlamps`, `✓ Heater`, `✓ Function Steering Wheel`).



#### D. Dynamic Financing Calculator Component

A rounded, distinct structural card processing financial math simulations. Include:

*   **Form Input Fields:** Rounded-border input boxes handling inputs for: *Total Price* (pre-filled `10,000`), *Interest rate* (pre-filled `5`), *Loan Term (months)* (dropdown box initialized on state `Month`), and *Down payment* (pre-filled `3,000`).

*   **Action Button:** A wide, full-width solid charcoal button reading **"Calculate"**.

*   **Live Output Metrics:** Below the calculation block, display structural rows showing updated numeric values: *With fields for Monthly Payment, Down Payment Amount, and Est. Total Loan*.



#### E. Geolocation Map Module

*   A section header displaying `📍 Paris, France` aligned left, flanked by a right-aligned action anchor link reading `"Get Directions"`.

*   An interactive styled Map view layer (mocking an active Mapbox view frame) housing a custom absolute-positioned **Floating Summary Card** overlay. 

*   The mini floating map card must include a cropped image preview aspect ratio, bold vehicle identity title text, small metric line badges matching core vehicle specs (*2 Odo, Gasoline, Automatic*), and an arrow-linked nav item reading `View Details >`.



#### F. Social Validation (Customer Reviews Stack)

*   **Rating Header Module:** A banner box isolating an overall numeric score block (`4.8` styled next to a clean solid yellow/green star badge layout) stating text summary strings: *"Overall Rating Base on 4 Reviews"*.

*   **Review Items Flow:** A repeating vertical column displaying user cards containing clean circular avatar image masks, distinct reviewer identity string fields (e.g., *Dy Randynox*, *Robert Fox*, *Mista Nyroom*), timestamp labels calibrated to *May 19, 2026*, an array row of 5 solid green vector star scales, and rich un-cropped multi-line body feedback paragraphs.

*   **Authentication Gate Alert:** A simple notification card terminating the timeline reading precisely: *"You need to login in order to post a review"*, where the word *login* is wrapped in an anchor link style.



#### G. "You Might Also Like" Recommendation Carousel

A horizontal card listing module serving cross-sell items. Build a reusable recommendation card showcasing:

*   **Image Header Overlay:** Top-left corner houses a deep indigo pricing pill reading `"Great Price"`; top-right corner features an absolute floating circular outline card containing a vector save heart selector icon.

*   **Asset Counter Badges:** Bottom-left image overlays showing transparent badge counters mapping attachment icons (e.g., camera icon showing `7` alongside video player icons).

*   **Text & Action Blocks:** Below the image, show standard variant bold titles, inline row metadata with clean icon micro-spacers (`2 km | 2026 | Gasoline`), and a bold dominant price string (e.g., `$32,600`).

*   **Footer Control Bar:** Places a left-aligned thin border secondary button reading `+ Compare` opposite a sharp arrow-linked action anchor reading `View details >`.



---



### 5. INTERACTIVE LEAD CAPTURE OVERLAYS & ACTION SHEETS



Ensure smooth sliding drawer transitions or reactive off-canvas action sheets are active for vendor negotiation flows:

*   **Dealer Profile Card:** Render an item block highlighting user identity labels (`"Robert Fox"`), bounded directly by a bright green verification micro-badge reading `"Verified Dealer"`, all stacked over high-contrast direct response button rows:

    *   *Call to Dealer:* Wide solid brand-green button surface using dark text copy string **"Call To Dealer"**.

    *   *WhatsApp Tunnel:* Wide secondary solid deep indigo/blue button surface using white text copy string **"Chat Via WhatsApp"**.

*   **"Send Inquiry About Vehicle" Form:** A fully functional input collection form displaying placeholder input blocks processing user metrics: *Name*, *Email*, *Phone (Optional)*, a custom subject item picker dropdown menu styled defaulting onto option text `"This Vehicle's Availability"`, and an expandable multi-line text input bounding block pre-filled with dynamic buyer inquiry text templates.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://prestige-shine-auto-detailing.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/0272b1a4-c483-4942-af28-7a7b7693ff62).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
