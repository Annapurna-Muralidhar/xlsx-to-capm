
// //     const workbook = xlsx.readFile('D:/railwaysystem.xlsx');
// const cds = require('@sap/cds');
// const xlsx = require('xlsx');

// module.exports = cds.service.impl(async function () {
//   const { Railway } = this.entities;

//   this.before('READ', Railway, async () => {
//     await importExcelData();
//   });

//   async function importExcelData() {
//     const db = await cds.connect.to('db');
//     const { Railway } = db.entities('com.satinfotech.railwaytask');

//     const workbook = xlsx.readFile('D:/railwaysystem.xlsx');
//     const sheetName = workbook.SheetNames[0];
//     const worksheet = workbook.Sheets[sheetName];
//     let jsonData = xlsx.utils.sheet_to_json(worksheet, { defval: null });

//     console.log('Data read from Excel:', jsonData);

//     // Trim field names and filter out empty rows and validate critical fields
//     jsonData = jsonData.map(row => {
//       const trimmedRow = {};
//       for (const key in row) {
//         if (row.hasOwnProperty(key)) {
//           const trimmedKey = key.trim();
//           trimmedRow[trimmedKey] = row[key];
//         }
//       }
//       return trimmedRow;
//     });

//     jsonData = jsonData.filter(row => {
//       const hasData = Object.values(row).some(value => value !== null && value !== '');
//       const hasCriticalFields = row.pnr_no && row.doj;
//       if (!hasData) {
//         console.warn('Empty row:', row);
//       }
//       if (!hasCriticalFields) {
//         console.warn('Row with missing critical data:', row);
//       }
//       return hasData && hasCriticalFields;
//     });

//     console.log('Filtered data to be imported:', jsonData);

//     // Clear existing data
//     await DELETE.from(Railway);

//     // Insert new data
//     for (const row of jsonData) {
//       console.log('Inserting row:', row);
//       await INSERT.into(Railway).entries(row);
//     }

//     console.log('Data imported successfully');
//   }
// });


const cds = require('@sap/cds');
const xlsx = require('xlsx');

module.exports = cds.service.impl(async function () {
  const { Railway } = this.entities;

  this.before('READ', Railway, async () => {
    await importExcelData();
  });

  async function importExcelData() {
    const db = await cds.connect.to('db');
    const { Railway } = db.entities('com.satinfotech.railwaytask');

    const workbook = xlsx.readFile('D:/railwaysystemID.xlsx');
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    let jsonData = xlsx.utils.sheet_to_json(worksheet, { defval: null });

    //console.log('Data read from Excel:', jsonData);

    // Function to parse Excel date value
    function parseDate(excelDate) {
      if (typeof excelDate === 'number') {
        // Excel date is usually a number, convert it to JavaScript Date
        const excelEpoch = new Date(Date.UTC(1899, 11, 30)); // Excel epoch start date
        const jsDate = new Date(excelEpoch.getTime() + excelDate * 86400000); // 86400000ms in a day
        return jsDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
      }
      return excelDate; // Return as is if not a number
    }

    // Trim field names, parse dates, filter out empty rows and validate critical fields
    jsonData = jsonData.map(row => {
      const trimmedRow = {};
      for (const key in row) {
        if (row.hasOwnProperty(key)) {
          const trimmedKey = key.trim();
          let value = row[key];

          // Parse date fields
          if (trimmedKey === 'doj' && value) {
            value = parseDate(value);
          }

          trimmedRow[trimmedKey] = value;
        }
      }
      return trimmedRow;
    });

    jsonData = jsonData.filter(row => {
      const hasData = Object.values(row).some(value => value !== null && value !== '');
      const hasCriticalFields = row.pnr_no && row.doj;
      if (!hasData) {
       // console.warn('Empty row:', row);
      }
      if (!hasCriticalFields) {
       // console.warn('Row with missing critical data:', row);
      }
      return hasData && hasCriticalFields;
    });

    //console.log('Filtered data to be imported:', jsonData);

    // Clear existing data
    await DELETE.from(Railway);

    // Insert new data
    for (const row of jsonData) {
     // console.log('Inserting row:', row);
      await INSERT.into(Railway).entries(row);
    }

    //console.log('Data imported successfully');
  }
});

