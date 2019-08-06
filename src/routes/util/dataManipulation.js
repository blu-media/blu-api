/* NPM Installation Dependencies */
const faker = require("faker");
const random = require("random");

// DB Object and Other Utility Functions
const { db } = require("../../db/connection");
const { createQRCode } = require('./eventUtil');

const addUsers = (num) => {
  return new Promise((resolve, reject) => {
    var i;

    for (i = 0; i < num; i++) {
      db.users.create({
        email: faker.internet.email(),
        firstName: faker.name.firstName(),
        gradYear: random.int(2019, 2022),
        id: i.toString(),
        lastName: faker.name.lastName(),
        password: faker.lorem.word()
      });
    }
    resolve(`${i} users have been created successfully!`);
  })

}

const addOrganizations = (num) => {
  return new Promise((resolve, reject) => {
    var i;

    for (i = 0; i < num; i++) {
      db.organizations.create({
        about: faker.lorem.paragraph(),
        acronym: faker.company.companySuffix(),
        name: faker.company.companyName(),
        id: i.toString()
      });
    }
    resolve(`${i} organizations have been created successfully!`);
  });
};

const addEvents = (num) => {
  return new Promise(async (resolve, reject) => {
    var i;

    for (i = 0; i < num; i++) {
      // Create a QR code for the event.
      const qrCode = await createQRCode(i.toString());

      db.events.create({
        attire: faker.commerce.color(),
        blurb: faker.lorem.paragraph(),
        date: faker.date.future(),
        endTime: faker.date.future(),
        id: i.toString(),
        flyer: faker.image.image(),
        location: faker.address.streetName(),
        name: faker.lorem.word(),
        qrCode: qrCode,
        startTime: faker.date.past(),
        type: faker.lorem.word()
      });
    }
    resolve(`${num} events have been created successfully!`);
  })
};

const wipeDatabase = () => {
  return new Promise((resolve, reject) => {
    db.sequelize.sync({ force: true }).then(() => {
      resolve("Database wiped and recreated successfully!");
    });
  });
};

const wipeAndAdd = async (request, response) => {
  let num = request.params.num;
  await wipeDatabase();
  await addUsers(num);
  await addOrganizations(num);
  await addEvents(num);
  response.send("Database wiped, recreated, and repopulated successfully!");
}

module.exports = {
  wipeAndAdd
};
