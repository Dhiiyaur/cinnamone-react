const CinnamoneBe = 'https://be-cinnamone.herokuapp.com';
const CinnamoneBeLocal = 'http://127.0.0.1:8000';

const apiURL = '/api';

export const endpoint = `${CinnamoneBe}${apiURL}`;

export const apiProductList = `${endpoint}/product-list/`;
export const apiProduct = `${endpoint}/product/`;

// auth user
export const apiLogin = `${CinnamoneBe}/auth/login/`;
export const apiRegister = `${CinnamoneBe}/auth/registration/`;

export const apiUserCart = `${endpoint}/cart`;
export const apiUserAddItem = `${endpoint}/add-product`;
export const apiUserAddItemQuantity = `${endpoint}/add-quantity`;
export const apiUserDecItemQuantity = `${endpoint}/dec-quantity`;
export const apiUserCheckout = `${endpoint}/checkout`;
export const apiUserRemoveItem = `${endpoint}/remove-from-cart`;

// export const apiUserCart = `${endpoint}/user-cart/`;
// export const apiUserAddItem = `${endpoint}/add-item/`;
// export const apiUserRemoveItem = `${endpoint}/remove-item/`;
// export const apiUserCheckout = `${endpoint}/checkout/`;

