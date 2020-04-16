const fs = require("fs");
const { readFile, produceResult } = require("./helpers");

class ReviewBuilder {
  buildReviewsSync() {
    const products = JSON.parse(
      fs.readFileSync("./data/products.json", "utf-8")
    );
    const reviews = JSON.parse(fs.readFileSync("./data/reviews.json", "utf-8"));
    const users = JSON.parse(fs.readFileSync("./data/users.json", "utf-8"));
    return produceResult({ products, reviews, users });
  }

  buildReviewsCallbacks(cb) {
    fs.readFile("./data/products.json", "utf8", (err, products) => {
      if (err) throw err;
      fs.readFile("./data/reviews.json", "utf8", (err, reviews) => {
        if (err) throw err;
        fs.readFile("./data/users.json", "utf8", (err, users) => {
          if (err) throw err;
          products = JSON.parse(products);
          reviews = JSON.parse(reviews);
          users = JSON.parse(users);
          // console.log(products);
          // console.log(reviews);
          // console.log(users);
          cb(produceResult({ products, reviews, users }));
        });
      });
    });
  }

  buildReviewsPromises() {
    return Promise.all([
      readFile("./data/products.json"),
      readFile("./data/reviews.json"),
      readFile("./data/users.json"),
    ])
      .then((array) => {
        const arrayHolder = [];

        array.forEach((objItem) => {
          arrayHolder.push(JSON.parse(objItem));
        });

        const objHolder = {};
        objHolder.products = arrayHolder[0]; // products
        objHolder.reviews = arrayHolder[1]; // reviews
        objHolder.users = arrayHolder[2]; // users

        return produceResult(objHolder);
      })
      .catch((err) => {
        throw err;
      });
  }

  async buildReviewsAsyncAwait() {
    // FIXME // await
    // let data = await Promise.all([
    //   readFile("./data/products.json"),
    //   readFile("./data/reviews.json"),
    //   readFile("./data/users.json"),
    // ]);
    let products = await readFile("./data/products.json");
    let reviews = await readFile("./data/reviews.json");
    let users = await readFile("./data/users.json");

    products = JSON.parse(products);
    reviews = JSON.parse(reviews);
    users = JSON.parse(users);

    return produceResult({ products, reviews, users }); // careful of data type
  }
  // buildReviewsAsyncAwait()
}

module.exports = ReviewBuilder;
