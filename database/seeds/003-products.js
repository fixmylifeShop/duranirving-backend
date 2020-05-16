exports.seed = function (knex) {
  // Deletes ALL existing entries
  return (
    knex("products")
      // .del()
      .then(function () {
        // Inserts seed entries
        return knex("products").insert([
          {
            shop_id: 1,
            product_name: "Duran Cycles Patch",
            description:
              "Each order of patches comes with two durancycles stickers",
            price: 5,
          },
          {
            shop_id: 1,
            product_name: "MERBAG XL Rolltop",
            description:
              "XL BASIC BACKPACK ROLL TOP: $295.00 +H 30 X W 16 X D 11 +EXPANDABLE FRONT POCKET +2 SIDE POCKETS +FRONT CARGO STRAPS +SIDE COMPRESSION STRAPS +RADIO/PHONE VELCRO SHOULDER STRAPS +REINFORCED SHOULDER STRAPS +REINFORCED DOUBLE LAYER BAG BOTTOM +QUICK RELEASE SHOULDER STRAPS +DOUBLE ROLL TOP CLOSURE STRAPS EXTERIOR COLOR: BLACK INTERIOR COLOR: LIGHT BLUE MER INFO: ALL MER PRODUCTS ARE DESIGNED, CUT, AND HAND-BUILT IN BUSHWICK BROOKLYN, NY, USA. MER GOODS ARE WATERPROOF, WEATHERPROOF AND BUILT TO LAST. MER GOODS ARE BUILT WITH ALL USA SOURCED MATERIALS. THEY ARE ENGINEERED WITH INDUSTRIAL MATERIALS TO WITHSTAND EVERYDAY USE AND THE MOST HEAVY ABUSE.",
            price: 295,
          },
          {
            shop_id: 1,
            product_name: "Duran Cycles 5 Panel Cap",
            description:
              "100% cotton Soft-structured, five-panel, low-profile Metal eyelets Nylon strap clip closure",
            price: 20,
          },
          {
            shop_id: 1,
            product_name: "Duran Cycles Phone Pouch",
            description:
              "Made by Merbag JUMBO PHONE POUCH Large $24.00 3.5 W X 6 H X 1.25 D Extra large $26.00 4 W X 7 H X 1.25 D +CORDURA OR CANVAS EXTERIOR +18 OZ VINYL COATED POLEYSTER INTERIOR LINER (WEATHERPROOF) +VELCRO CLOSURE  +LARGE VELCRO BELT LOOP FITS ANY BELT +GOOD FOR CELL PHONES, SMALL RADIOS, AND CAMERAS +CARABINER LOOP +CUSTOMIZE COLORS +MADE IN USA",
            price: 25,
          },
          {
            shop_id: 2,
            product_name: "Duran Cycles Patch",
            description:
              "Each order of patches comes with two durancycles stickers",
            price: 5,
          },
          {
            shop_id: 2,
            product_name: "Duran Cycles 5 Panel Cap",
            description:
              "100% cotton Soft-structured, five-panel, low-profile Metal eyelets Nylon strap clip closure",
            price: 20,
          },
          {
            shop_id: 2,
            product_name: "Duran Cycles Phone Pouch",
            description:
              "Made by Merbag JUMBO PHONE POUCH Large $24.00 3.5 W X 6 H X 1.25 D Extra large $26.00 4 W X 7 H X 1.25 D +CORDURA OR CANVAS EXTERIOR +18 OZ VINYL COATED POLEYSTER INTERIOR LINER (WEATHERPROOF) +VELCRO CLOSURE  +LARGE VELCRO BELT LOOP FITS ANY BELT +GOOD FOR CELL PHONES, SMALL RADIOS, AND CAMERAS +CARABINER LOOP +CUSTOMIZE COLORS +MADE IN USA",
            price: 25,
          },
        ]);
      })
  );
};
