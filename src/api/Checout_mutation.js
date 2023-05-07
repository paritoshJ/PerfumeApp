import { gql } from "@apollo/client";

export const SET_GUEST_EMAIL_ON_CART = gql`
    mutation setGuestEmailOnCart($cart_id: String!, $email: String!) {
        setGuestEmailOnCart(input: { cart_id: $cart_id, email: $email }) {
            cart {
                email
            }
        }
    }
`;

export const SET_SHIPPING_ADDRESS_ON_CART = gql`
    mutation setShippingAddressesOnCart(
        $cart_id: String!
        $shipping_addresses: [ShippingAddressInput!]!
    ) {
        setShippingAddressesOnCart(
            input: {
                cart_id: $cart_id
                shipping_addresses: $shipping_addresses
            }
        ) {
            cart {
                shipping_addresses {
                    firstname
                    company
                    country {
                        label
                        code
                    }
                    city
                    street
                    region {
                        label
                        code
                    }
                    postcode
                    telephone
                    available_shipping_methods {
                        carrier_code
                        carrier_title
                        method_code
                        method_title
                    }
                }
            }
        }
    }
`;

export const SET_BILLING_ADDRESS_ON_CART = gql`
    mutation setBillingAddressOnCart(
        $cart_id: String!
        $billing_address: BillingAddressInput!
    ) {
        setBillingAddressOnCart(
            input: { cart_id: $cart_id, billing_address: $billing_address }
        ) {
            cart {
                billing_address {
                    firstname
                    lastname
                    company
                    country {
                        label
                        code
                    }
                    city
                    street
                    region {
                        label
                        code
                    }
                    postcode
                    telephone
                }
            }
        }
    }
`;

export const SET_PAYMENT_METHOD_ON_CART = gql`
    mutation setPaymentMethodOnCart(
        $cart_id: String!
        $payment_method: PaymentMethodInput!
    ) {
        setPaymentMethodOnCart(
            input: { cart_id: $cart_id, payment_method: $payment_method }
        ) {
            cart {
                selected_payment_method {
                    code
                }
            }
        }
    }
`;

export const SET_SHIPPING_METHOD_ON_CART = gql`
    mutation setShippingMethodsOnCart(
        $cart_id: String!
        $shipping_methods: [ShippingMethodInput]!
    ) {
        setShippingMethodsOnCart(
            input: { cart_id: $cart_id, shipping_methods: $shipping_methods }
        ) {
            cart {
                shipping_addresses {
                    selected_shipping_method {
                        carrier_code
                        method_code
                        carrier_title
                        method_title
                    }
                }
            }
        }
    }
`;

export const PLACE_ORDER = gql`
    mutation placeOrder($cart_id: String!) {
        placeOrder(input: { cart_id: $cart_id }) {
            order {
                order_number
            }
        }
    }
`;

export const PLACE_ORDER_AND_TRANSACTION_ID = gql`
mutation PlaceOrderwithtxnId($cart_id: String!, $txn_id: String!) {
    placeOrderwithtxnId(input: {cart_id: $cart_id, txn_id: $txn_id}) {
        order_id
        txn_id
    }
}
`