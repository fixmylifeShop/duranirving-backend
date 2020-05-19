const hello = {
  cart: "22R812043Y053611U",
  create_time: "2020-05-18T23:23:18Z",
  id: "PAYID-L3BRRZY58D66392LA113630P",
  intent: "sale",
  payer: {
    payer_info: {
      country_code: "US",
      email: "irving@gmail.com",
      first_name: "Irving",
      last_name: "Duran",
      middle_name: "Irving",
      payer_id: "MA6V8PJL4V95N",
      shipping_address: {
        city: "BROOKLYN",
        country_code: "US",
        line1: "123 troutman st",
        postal_code: "11237",
        recipient_name: "Irving Duran",
        state: "NY",
      },
    },
    payment_method: "paypal",
    status: "VERIFIED",
  },
  state: "approved",
  transactions: {
    amount: {
      currency: "USD",
      details: {
        handling_fee: "0.00",
        insurance: "0.00",
        shipping: "0.00",
        shipping_discount: "0.00",
        subtotal: "5.00",
      },
    },
    total: "5.00",
    item_list: {},
    related_resources: {
      sale: {
        amount: {
          currency: "USD",
          details: {
            handling_fee: "0.00",
            insurance: "0.00",
            shipping: "0.00",
            shipping_discount: "0.00",
            subtotal: "5.00",
          },
          total: "5.00",
        },

        create_time: "2020-05-18T23:23:34Z",
        id: "8RK53506NY342782V",
        parent_payment: "PAYID-L3BRRZY58D66392LA113630P",
        payment_mode: "INSTANT_TRANSFER",
        protection_eligibility: "ELIGIBLE",
        state: "completed",
        update_time: "2020-05-18T23:23:34Z",
      },
    },
  },
};

let cart = {
  cart: [
    {
      shop_id: 1,
      id: 1,
      product_name: "Duran Cycles Patch",
      description: "Each order of patches comes with two durancycles stickers",
      price: 5,
      created_at: "2020-05-15 21:37:41",
      updated_at: "2020-05-15 21:37:41",
      image:
        "http://res.cloudinary.com/fixmylife/image/upload/v1589579919/ltv4j7ipwpwuehf0llsw.jpg",
      images: [
        {
          product_id: 1,
          id: 9,
          image:
            "http://res.cloudinary.com/fixmylife/image/upload/v1589579919/ltv4j7ipwpwuehf0llsw.jpg",
          created_at: "2020-05-15 21:58:38",
          updated_at: "2020-05-15 21:58:38",
        },
      ],
      quantity: 1,
    },
    {
      shop_id: 1,
      id: 2,
      product_name: "MERBAG XL Rolltop",
      description:
        "XL BASIC BACKPACK ROLL TOP: $295.00 +H 30 X W 16 X D 11 +EXPANDABLE FRONT POCKET +2 SIDE POCKETS +FRONT CARGO STRAPS +SIDE COMPRESSION STRAPS +RADIO/PHONE VELCRO SHOULDER STRAPS +REINFORCED SHOULDER STRAPS +REINFORCED DOUBLE LAYER BAG BOTTOM +QUICK RELEASE SHOULDER STRAPS +DOUBLE ROLL TOP CLOSURE STRAPS EXTERIOR COLOR: BLACK INTERIOR COLOR: LIGHT BLUE MER INFO: ALL MER PRODUCTS ARE DESIGNED, CUT, AND HAND-BUILT IN BUSHWICK BROOKLYN, NY, USA. MER GOODS ARE WATERPROOF, WEATHERPROOF AND BUILT TO LAST. MER GOODS ARE BUILT WITH ALL USA SOURCED MATERIALS. THEY ARE ENGINEERED WITH INDUSTRIAL MATERIALS TO WITHSTAND EVERYDAY USE AND THE MOST HEAVY ABUSE.",
      price: 295,
      created_at: "2020-05-15 21:37:41",
      updated_at: "2020-05-15 21:37:41",
      image:
        "https://assets.bigcartel.com/product_images/174915649/XL_roll-1.jpg?auto=format&fit=max&w=1500",
      images: [
        {
          product_id: 2,
          id: 2,
          image:
            "https://assets.bigcartel.com/product_images/174915649/XL_roll-1.jpg?auto=format&fit=max&w=1500",
          created_at: "2020-05-15 21:37:41",
          updated_at: "2020-05-15 21:37:41",
        },
      ],
      quantity: 1,
    },
  ],
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYXJ0IjpbeyJzaG9wX2lkIjoxLCJpZCI6MSwicHJvZHVjdF9uYW1lIjoiRHVyYW4gQ3ljbGVzIFBhdGNoIiwiZGVzY3JpcHRpb24iOiJFYWNoIG9yZGVyIG9mIHBhdGNoZXMgY29tZXMgd2l0aCB0d28gZHVyYW5jeWNsZXMgc3RpY2tlcnMiLCJwcmljZSI6NSwiY3JlYXRlZF9hdCI6IjIwMjAtMDUtMTUgMjE6Mzc6NDEiLCJ1cGRhdGVkX2F0IjoiMjAyMC0wNS0xNSAyMTozNzo0MSIsImltYWdlIjoiaHR0cDovL3Jlcy5jbG91ZGluYXJ5LmNvbS9maXhteWxpZmUvaW1hZ2UvdXBsb2FkL3YxNTg5NTc5OTE5L2x0djRqN2lwd3B3dWVoZjBsbHN3LmpwZyIsImltYWdlcyI6W3sicHJvZHVjdF9pZCI6MSwiaWQiOjksImltYWdlIjoiaHR0cDovL3Jlcy5jbG91ZGluYXJ5LmNvbS9maXhteWxpZmUvaW1hZ2UvdXBsb2FkL3YxNTg5NTc5OTE5L2x0djRqN2lwd3B3dWVoZjBsbHN3LmpwZyIsImNyZWF0ZWRfYXQiOiIyMDIwLTA1LTE1IDIxOjU4OjM4IiwidXBkYXRlZF9hdCI6IjIwMjAtMDUtMTUgMjE6NTg6MzgifV0sInF1YW50aXR5IjoxfSx7InNob3BfaWQiOjEsImlkIjoyLCJwcm9kdWN0X25hbWUiOiJNRVJCQUcgWEwgUm9sbHRvcCIsImRlc2NyaXB0aW9uIjoiWEwgQkFTSUMgQkFDS1BBQ0sgUk9MTCBUT1A6ICQyOTUuMDAgK0ggMzAgWCBXIDE2IFggRCAxMSArRVhQQU5EQUJMRSBGUk9OVCBQT0NLRVQgKzIgU0lERSBQT0NLRVRTICtGUk9OVCBDQVJHTyBTVFJBUFMgK1NJREUgQ09NUFJFU1NJT04gU1RSQVBTICtSQURJTy9QSE9ORSBWRUxDUk8gU0hPVUxERVIgU1RSQVBTICtSRUlORk9SQ0VEIFNIT1VMREVSIFNUUkFQUyArUkVJTkZPUkNFRCBET1VCTEUgTEFZRVIgQkFHIEJPVFRPTSArUVVJQ0sgUkVMRUFTRSBTSE9VTERFUiBTVFJBUFMgK0RPVUJMRSBST0xMIFRPUCBDTE9TVVJFIFNUUkFQUyBFWFRFUklPUiBDT0xPUjogQkxBQ0sgSU5URVJJT1IgQ09MT1I6IExJR0hUIEJMVUUgTUVSIElORk86IEFMTCBNRVIgUFJPRFVDVFMgQVJFIERFU0lHTkVELCBDVVQsIEFORCBIQU5ELUJVSUxUIElOIEJVU0hXSUNLIEJST09LTFlOLCBOWSwgVVNBLiBNRVIgR09PRFMgQVJFIFdBVEVSUFJPT0YsIFdFQVRIRVJQUk9PRiBBTkQgQlVJTFQgVE8gTEFTVC4gTUVSIEdPT0RTIEFSRSBCVUlMVCBXSVRIIEFMTCBVU0EgU09VUkNFRCBNQVRFUklBTFMuIFRIRVkgQVJFIEVOR0lORUVSRUQgV0lUSCBJTkRVU1RSSUFMIE1BVEVSSUFMUyBUTyBXSVRIU1RBTkQgRVZFUllEQVkgVVNFIEFORCBUSEUgTU9TVCBIRUFWWSBBQlVTRS4iLCJwcmljZSI6Mjk1LCJjcmVhdGVkX2F0IjoiMjAyMC0wNS0xNSAyMTozNzo0MSIsInVwZGF0ZWRfYXQiOiIyMDIwLTA1LTE1IDIxOjM3OjQxIiwiaW1hZ2UiOiJodHRwczovL2Fzc2V0cy5iaWdjYXJ0ZWwuY29tL3Byb2R1Y3RfaW1hZ2VzLzE3NDkxNTY0OS9YTF9yb2xsLTEuanBnP2F1dG89Zm9ybWF0JmZpdD1tYXgmdz0xNTAwIiwiaW1hZ2VzIjpbeyJwcm9kdWN0X2lkIjoyLCJpZCI6MiwiaW1hZ2UiOiJodHRwczovL2Fzc2V0cy5iaWdjYXJ0ZWwuY29tL3Byb2R1Y3RfaW1hZ2VzLzE3NDkxNTY0OS9YTF9yb2xsLTEuanBnP2F1dG89Zm9ybWF0JmZpdD1tYXgmdz0xNTAwIiwiY3JlYXRlZF9hdCI6IjIwMjAtMDUtMTUgMjE6Mzc6NDEiLCJ1cGRhdGVkX2F0IjoiMjAyMC0wNS0xNSAyMTozNzo0MSJ9XSwicXVhbnRpdHkiOjF9XSwiaWF0IjoxNTg5ODQ2NjE0fQ.gaIqg14FPCzYRFyRR6ezxTrdhREsBcGqCkaj7dUGgNs",
};

const ugh = {
  shop_id: 1,
  user_id: 1,
  email: "hello@gmail.com",
  first_name: "jose",
  last_name: "guzman",
  transaction_info: {
    cart: "22R812043Y053611U",
    create_time: "2020-05-18T23:23:18Z",
    id: "PAYID-L3BRRZY58D66392LA113630P",
    intent: "sale",
    payer: {
      payer_info: {
        country_code: "US",
        email: "irving@gmail.com",
        first_name: "Irving",
        last_name: "Duran",
        middle_name: "Irving",
        payer_id: "MA6V8PJL4V95N",
        shipping_address: {
          city: "BROOKLYN",
          country_code: "US",
          line1: "123 troutman st",
          postal_code: "11237",
          recipient_name: "Irving Duran",
          state: "NY",
        },
      },
      payment_method: "paypal",
      status: "VERIFIED",
    },
    state: "approved",
    transactions: {
      amount: {
        currency: "USD",
        details: {
          handling_fee: "0.00",
          insurance: "0.00",
          shipping: "0.00",
          shipping_discount: "0.00",
          subtotal: "5.00",
        },
      },
      total: "5.00",
      item_list: {},
      related_resources: {
        sale: {
          amount: {
            currency: "USD",
            details: {
              handling_fee: "0.00",
              insurance: "0.00",
              shipping: "0.00",
              shipping_discount: "0.00",
              subtotal: "5.00",
            },
            total: "5.00",
          },

          create_time: "2020-05-18T23:23:34Z",
          id: "8RK53506NY342782V",
          parent_payment: "PAYID-L3BRRZY58D66392LA113630P",
          payment_mode: "INSTANT_TRANSFER",
          protection_eligibility: "ELIGIBLE",
          state: "completed",
          update_time: "2020-05-18T23:23:34Z",
        },
      },
    },
  },
};
