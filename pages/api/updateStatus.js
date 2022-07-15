import admin from "../../firebase/nodeApp";

export default async function handler(req, res) {
  try {
    let { status_data, action } = req.body;
    console.log("data ", { status_data });

    // Get data from firebase
    let doc = await admin.firestore().collection("statuses").get();

    let statuses = doc.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    console.log("statuses ", { statuses });

    let objectData = {
      cities: [],
      countries: [],
      price: 0,
      area: 0,
      data: [],
    };
    let status_flag = "new";
    if (statuses.length > 0) {
      objectData = JSON.parse(statuses[0].status);
      status_flag = "update";
    }

    console.log("objectData ", { objectData });

    let oldData = objectData.data;
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

    if (action === "update") {
      oldData.push({
        id: status_data.id,
        city: status_data.city,
      });
      if (cities.indexOf(status_data.city) < 0) {
        cities.push(status_data.city);
      }
      if (countries.indexOf(status_data.country) < 0) {
        countries.push(status_data.country);
      }
    } else {
      let filteredData = oldData.filter((item) => item.id !== status_data.id);
      oldData = filteredData;
    }

    let newData = { cities, countries, price, area, data: oldData };

    console.log("newData ", { newData });

    // Create or Update data in firebase
    if (status_flag === "new") {
      await admin
        .firestore()
        .collection("statuses")
        .add({ status: JSON.stringify(newData) });
    } else {
      await admin
        .firestore()
        .collection("statuses")
        .doc(statuses[0].id)
        .update({ status: JSON.stringify(newData) });
    }

    console.log("newData ", newData);

    res.status(200).json({ message: "file updated" });
  } catch (error) {
    res.status(200).json({ message: "file not updated" });
  }
}
