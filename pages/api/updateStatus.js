const fs = require("fs");

import fsPromises from "fs/promises";
import path from "path";

export default async function handler(req, res) {
  try {
    let { status_data, action } = req.body;
    console.log("data ", { status_data });

    const filePath = path.join(process.cwd(), "data.json");
    const jsonData = await fsPromises.readFile(filePath);
    const objectData = JSON.parse(jsonData);
    console.log("objectData ", objectData);

    let cities = objectData.cities;
    let countries = objectData.countries;
    let price =
      parseInt(status_data.price) > objectData.price
        ? parseInt(status_data.price)
        : objectData.price;
    let area =
      parseInt(status_data.area) > objectData.area
        ? parseInt(status_data.area)
        : objectData.area;

    if (cities.indexOf(status_data.city) < 0) {
      cities.push(status_data.city);
    }
    if (countries.indexOf(status_data.country) < 0) {
      countries.push(status_data.country);
    }

    let newData = { cities, countries, price, area };
    console.log("newData ", newData);

    fs.writeFile(
      "./data.json",
      JSON.stringify(newData),
      function writeJSON(err) {
        if (err) return console.log(err);
        console.log(JSON.stringify(newData));
        console.log("writing to ");
      }
    );

    res.status(200).json({ message: "file updated" });
  } catch (error) {
    res.status(200).json({ message: "file not updated" });
  }
}
