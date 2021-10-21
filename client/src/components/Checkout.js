import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

export default function Checkout({itemTotal}) {

    function tokenHndler(token)
    {
        console.log(token);
    }
    return (
        <div>

           <StripeCheckout
           amount={itemTotal*100}
           shippingAddress
           token={tokenHndler}
           stripeKey='pk_test_51HIcbWGnvsTr01mws7E1cupkz9UhuK5SE1hCvaPneBRuFjDkngbSGtfQQlr1f5rzL7xDLNnCeRuGLmkZs1ORmHsz00Oivw4Jvr'
           currency='CAD'
           >
                <button className="btn btn-success m-2" type="button">
                    Pay Now
                </button>
                
           </StripeCheckout>
            
        </div>
    )
}

