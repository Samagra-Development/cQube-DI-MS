/* eslint no-use-before-define: 0 */
const faker = require('@faker-js/faker').faker;
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const genAttendanceData = () => {
  const data = [];
  for (let i = 0; i < 100000; i++) {
    data.push({
      id: i,
      schoolId: faker.datatype.number({
        min: 1,
        max: 100,
      }),
      count: faker.datatype.number({
        min: 10,
        max: 50,
      }),
      grade: faker.datatype.number({
        min: 1,
        max: 12,
      }),
    });
  }
  // save data to csv file
  const csvWriter = createCsvWriter({
    path: 'src/mock-data/attendance.csv',
    header: [
      { id: 'id', title: 'ID' },
      { id: 'schoolId', title: 'School' },
      { id: 'count', title: 'Count' },
      { id: 'grade', title: 'Grade' },
    ],
  });
  csvWriter.writeRecords(data).then(() => {
    console.log('...Done');
  });
};

genAttendanceData();
