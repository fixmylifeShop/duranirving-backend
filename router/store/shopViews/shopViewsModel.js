const db = require("../../../database/dbConfig");

module.exports = {
  getViews,
  getShopViewsCount,
  findBy,
  findById,
  add,
  update,
  remove,
};

function getViews() {
  return db("shop_views");
}

async function getShopViewsCount(shop_id) {
  let unique_year = [];
  let years = [];
  let shop_views_count = await db("shop_views").where({ shop_id });
  // console.log(shop_views_count.length);
  if (!shop_views_count.length) {
    db("shop_views").insert({ shop_id }).then(getShopViewsCount(shop_id));
  }

  const yearSlice = (e) => e.created_at.slice(0, 4);
  shop_views_count
    .sort((a, b) => yearSlice(a) - yearSlice(b))
    .map((unique) => {
      let num = yearSlice(unique);
      if (!years.includes(num)) {
        unique_year.push({
          year: num,
          fixed_count: unique.fixed_count,
        });
        years.push(num);
      }
    });

  let shop = await db("shops").where({ id: shop_id }).first();
  shop.total_views = 0;
  shop.view_years = years;
  shop.view_data = [];
  shop.year_view_counts = [];
  unique_year.forEach(async (year) => {
    let yearDate_count = await db("shop_views")
      .where({ shop_id })
      .where("created_at", "like", `%${year.year}%`)
      .count("id as count");

    if (yearDate_count) {
      shop.total_views += yearDate_count[0].count - 1 + year.fixed_count;
      shop.year_view_counts.push({
        year: year.year,
        count: yearDate_count[0].count,
        fixed_count: year.fixed_count,
      });
      shop.view_data.push(yearDate_count[0].count - 1 + year.fixed_count);
    }
  });

  shop.view_years = years;
  await db("shop_views").where({ shop_id });
  return shop;
}
// function getShopViewsCount(shop_id) {
//   return db("shop_views")
//     .where({ shop_id })
//     .then((shop_views_count) => {
//       let unique_year = [];
//       let view_years = [];

//       const yearSlice = (e) => e.created_at.slice(0, 4);
//       shop_views_count
//         .sort((a, b) => yearSlice(a) - yearSlice(b))
//         .forEach((unique) => {
//           let num = yearSlice(unique);
//           if (!view_years.includes(num)) {
//             unique_year.push({
//               year: num,
//               fixed_count: unique.fixed_count,
//             });
//             view_years.push(num);
//           }
//         });

//       let view_data = [];
//       let total_views = 0;
//       shop_views_count.forEach((year) => {
//         if (year.fixed_count !== 0) {
//           total_views += year.fixed_count;
//         } else {
//           total_views += 1;
//         }
//       });
//       view_years.map((year) => {
//         let eachCount = 0;
//         shop_views_count.forEach((data) => {
//           if (yearSlice(data) === year) {
//             if (data.fixed_count !== 0) {
//               eachCount += data.fixed_count;
//             } else {
//               eachCount += 1;
//             }
//           }
//         });
//         view_data.push(eachCount);
//       });

//       return { view_years, view_data, total_views };
//     });
// }

function findBy(filter) {
  return db("shop_views").where(filter);
}

function findById(id) {
  return db("shop_views").where({ id }).first();
}

async function add(view) {
  const [id] = await db("shop_views").insert(view, "id");

  return findById(id);
}

function update(id, changes) {
  return db("shop_views")
    .where({ id })
    .update(changes)
    .then((count) => {
      if (count > 0) {
        return findById(id);
      } else {
        return null;
      }
    });
}

function remove(id) {
  return db("shop_views").where({ id }).del();
}
