# ` Test Standard – Demo Web Shop E2E Flow`

---

#`Test Purpose`
Verify that a customer can access the website, register successfully, and add a product to the shopping cart.

#`Preconditions`
- Playwright test environment is installed and configured.
- Project baseURL configured to https://demowebshop.tricentis.com/ (in playwright.config.ts).
- A unique email is generated for each test run to ensure registration succeeds without conflicts.
- No prior authentication or storage state is reused; the test performs registration itself.

# `Steps to Execute`
1) Open home page
   - Action: Open the website homepage.
   - Result: URL matches the homepage pattern and The page returns a valid response (200 OK).
   - Result: Page title contains "Demo Web Shop" and the header logo, "Register" and "Log in" links, and the "Welcome to our store" heading are visible.

2) Click "Register"
   - Action: Click the "Register" link in the header.
   - Result: The registration page is displayed and the URL matches the register pattern.

3) Fill personal details
   - Action: Select the appropriate gender.
   - Action: Enter first name, last name, and a unique email address.
   - Result: The gender selection is checked and each input shows the entered value.

4) Enter a password
   - Action: Enter Password and Confirm Password with the same value.
   - Result: Both password fields display the entered value.

5) Click "Register" (form submit)
   - Action: Click the "Register" button on the registration form.
   - Result: The success message "Your registration completed" is visible and the URL matches the registerResult pattern.

6) Click "Continue"
   - Action: Click the "Continue" button.
   - Result: The URL returns to the homepage pattern, and the "Welcome to our store" heading is visible.

7) Validate registration
   - Action: Check the header for the registered email.
   - Result: The header displays the exact email used during registration.

8) Click "Digital downloads"
   - Action: Click the "Digital downloads" link in the top menu.
   - Result: The URL matches the digitalDownloads pattern, the breadcrumb shows "Home" and "Digital downloads", and at least one product image is visible.

9) Add a random product to the cart
   - Action: Select a random product from the listing and note its name, then click "Add to cart".
   - Result: A notification appears with the exact text "The product has been added to your shopping cart".

10) Click "Shopping cart"
    - Action: Click the cart link in the header.
    - Result: The cart page shows the heading "Shopping cart" and the URL matches the cart pattern.

11) Verify product name in cart
    - Action: Compare the first product name in the cart with the previously selected product name.
    - Result: The cart product name exactly matches the selected product name.

#`Post-Conditions`
- No manual cleanup is required after test execution.
- The registered user account created during the test is temporary and may remain in the system.
- No data needs to be reset manually between runs, as a new unique email is generated for each execution.
- The browser session closes automatically after the test completes.

#`Validation Criteria (Pass/Fail)`

- All defined assertions complete successfully, with no errors or timeouts.  
- The following conditions must be met for the test to pass:

  - **Homepage validation:**  
    - The website responds successfully (HTTP 200).  
    - Page title and main header elements are visible.  
    - The URL pattern matches the expected homepage address.  

  - **Registration flow:**  
    - Registration page is displayed at URL `/register`.  
    - All input fields accept and retain the entered values.  
    - Successful registration message is displayed, and URL changes to `/registerresult`.  
    - After clicking “Continue,” user is redirected to the homepage.  
    - Header displays the exact registered email.  

  - **Digital Downloads flow:**  
    - Downloads page opens at URL `/digital-downloads`.  
    - Breadcrumb navigation displays the correct labels.  
    - At least one product is visible and selectable.  

  - **Cart flow:**  
    - Add-to-cart notification text matches exactly:  
      `"The product has been added to your shopping cart"`.  
    - Shopping cart page loads at URL `/cart`.  
    - Cart heading is visible.  
    - Product name in the cart matches exactly the selected product name.  

- *Test execution finishes successfully with no unhandled errors or timeouts.*
