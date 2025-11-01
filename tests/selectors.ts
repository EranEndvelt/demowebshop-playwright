export const SELECTORS = {
  urls: {
    homePage: /demowebshop\.tricentis\.com\/?$/,
    register: /\/register$/, 
    registerResult: /\/registerresult\/?/i,
    digitalDownloads: /\/digital-downloads\/?$/,
    cart: /\/cart\/?$/,
  },
  header: {
    logo: '.header-logo a',
    registerLinkName: 'Register',
    loginLinkName: 'Log in',
    welcomeHeading: 'Welcome to our store',
  },
  registration: {
    link: '.ico-register',
    page: '.registration-page',
    genderFemale: '#gender-female',
    genderMale: '#gender-male',
    firstNameLabel: 'First name:',
    lastNameLabel: 'Last name:',
    emailLabel: 'Email:',
    password: '#Password',
    confirmPassword: '#ConfirmPassword',
    submit: '#register-button',
    successText: 'Your registration completed',
    continueBtn: '.register-continue-button',
  },
  downloads: {
    linkName: 'Digital downloads',
    breadcrumb: '.breadcrumb',
    productImage: '.product-item .picture img',
    card: '.product-item',
    titleLink: '.product-title a',
    notificationBar: '#bar-notification',
    notificationMessage: '#bar-notification .content',
    notificationClose: '#bar-notification .close',
    addedToCartText: 'The product has been added to your shopping cart',
  },
  cart: {
    link: 'a.ico-cart',
    heading: 'Shopping cart',
    firstProduct: '.cart .product a',
  },
} as const;


