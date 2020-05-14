const router = require("express").Router();
const Views = require("./shopViewsModel");
const restricted = require("../../auth/middleware/restrictedMiddleware");
const generate = require("../../../token");
const jwt = require("jsonwebtoken");
const secrets = require("../../auth/middleware/secrets");

router.get("/all", (req, res) => {
  Views.getViews()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ err, message: "Cannot retrieve users from database." });
    });
});

router.get("/:id", (req, res) => {
  Views.getShopViewsCount(req.params.id)
    .then((shop_views_count) => {
      let unique_year = [];
      let view_years = [];

      const yearSlice = (e) => e.created_at.slice(0, 4);
      shop_views_count
        .sort((a, b) => yearSlice(a) - yearSlice(b))
        .forEach((unique) => {
          let num = yearSlice(unique);
          if (!view_years.includes(num)) {
            unique_year.push({
              year: num,
              fixed_count: unique.fixed_count,
            });
            view_years.push(num);
          }
        });

      let view_data = [];

      let total_views = 0;
      shop_views_count.forEach((year) => {
        if (year.fixed_count !== 0) {
          total_views += year.fixed_count;
        } else {
          total_views += 1;
        }
      });
      view_years.map((year) => {
        let eachCount = 0;
        shop_views_count.forEach((data) => {
          if (yearSlice(data) === year) {
            if (data.fixed_count !== 0) {
              eachCount += data.fixed_count;
            } else {
              eachCount += 1;
            }
          }
        });
        view_data.push(eachCount);
      });

      return res.status(200).json({ view_years, view_data, total_views });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ err, message: "Cannot retrieve users from database." });
    });
});

router.get("/", restricted, (req, res) => {
  Users.findById(req.session.user.id)
    .then((user) => {
      return res.status(200).json(user);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ err, message: "we ran into an error retreving the user" });
    });
});

router.post("/", (req, res) => {
  const token = req.headers.visited;

  jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
    if (err) {
      let token = generate.viewToken();
      Views.add(req.body)
        .then((inserted) => {
          return res.status(201).json({
            message: "New visiter",
            token,
            view_added: inserted,
          });
        })
        .catch((err) => {
          res
            .status(500)
            .json({ err, message: "we ran into an error retreving the user" });
        });
    } else {
      return res
        .status(200)
        .json({ message: "Already visited today", decodedToken });
    }
  });
});

// router.post("/", (req, res) => {

//   if (req.cookies.Visited) {
//     // console.log(req.body);
//     return res.status(200).json({message:"already have cookie"});
//   } else {
//     // Views.add(req.body)
//     //   .then((inserted) => {
//     //     res.cookie("Visited", true, { maxAge: 900000, httpOnly: true  });
//     //     res.end();

//     //     // return res.status(200).json(inserted);
//     //   })
//     //   .catch((err) => {
//     //     res
//     //       .status(500)
//     //       .json({ err, message: "we ran into an error retreving the user" });
//     //   });
//     res.cookie("Visited", true, { maxAge: 900000, httpOnly: true  });
//     res.send()
//   }
// });

router.put("/:id", restricted, (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  Users.update(id, changes)
    .then((update) => {
      res.status(200).json(update);
    })
    .catch((error) => {
      res.status(500).json({
        errorMessage: error,
      });
    });
});

router.delete("/:id", (req, res) => {
  Views.remove(req.params.id)
    .then((del) => {
      res
        .status(200)
        .json({
          message: `View was successfully deleted`,
        })
        .end(del);
    })
    .catch((err) => {
      res.status(500).json({ err, message: "error, unable to delete user" });
    });
});

router.delete("/", restricted, (req, res) => {
  const user = req.session.user;
  Views.remove(user.id)
    .then((del) => {
      res
        .status(200)
        .json({
          message: `User:${user.email} was successfully deleted`,
        })
        .end(del);
    })
    .catch((err) => {
      res.status(500).json({ err, message: "error, unable to delete user" });
    });
});

module.exports = router;
