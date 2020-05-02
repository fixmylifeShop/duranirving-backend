const db = require("../../../database/dbConfig");

module.exports = {
  getViews,
  getShopViewsCount,
  findBy,
  findById,
  update,
  remove,
};

function getViews() {
  return db("shop_views");
}

async function getShopViewsCount(shop_id) {
  
  const unique_year = [];
  const years = []
  let shop_views_count = await db("shop_views").where({ shop_id });

  shop_views_count.map((unique) => {
    console.log(shop_views_count);
    if (unique_year.includes(unique.created_at.slice(0, 4))) {
    } else {
      unique_year.push({year :unique.created_at.slice(0, 4),fixed_count:unique.fixed_count });
      years.push(unique.created_at.slice(0, 4))
    }
  });

  let shop = await db("shops").where({ id: shop_id }).first();
  shop.view_years = years;
shop.total_views = 0;
  shop.year_view_counts = [];
  shop.view_years = []
  shop.view_data = []
  unique_year.forEach(async (year) => {
    let yearDate_count = await db("shop_views")
      .where({ shop_id })
      .where("created_at", "like", `%${year.year}%`)
      .count("id as count");

    if (yearDate_count) {
      shop.total_views += yearDate_count[0].count -1 + year.fixed_count
      shop.year_view_counts.push({
        year : year.year,
        count: yearDate_count[0].count,
        fixed_count: year.fixed_count,
      });
      shop.view_data.push(yearDate_count[0].count -1 + year.fixed_count)
    }
    
  });



  shop.view_years = years;
  await db("shop_views").where({ shop_id });
  return shop;
}

function findBy(filter) {
  return db("shop_views").where(filter);
}

function findById(id) {
  return db("shop_views").where({ id }).first();
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
