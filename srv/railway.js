const cds = require('@sap/cds');
const xlsx = require('xlsx');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

module.exports = cds.service.impl(async function () {
  const { Railway } = this.entities;

  // Register custom endpoint for file upload
  this.on('uploadExcel', upload.single('file'), async (req, res) => {
    try {
      const fileBuffer = req.file.buffer;
      const workbook = xlsx.read(fileBuffer, { type: 'buffer' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      let jsonData = xlsx.utils.sheet_to_json(worksheet, { defval: null });

      // Function to parse Excel date value
      function parseDate(excelDate) {
        if (typeof excelDate === 'number') {
          const excelEpoch = new Date(Date.UTC(1899, 11, 30)); 
          const jsDate = new Date(excelEpoch.getTime() + excelDate * 86400000);
          return jsDate.toISOString().split('T')[0];
        }
        return excelDate;
      }

      jsonData = jsonData.map(row => {
        const trimmedRow = {};
        for (const key in row) {
          if (row.hasOwnProperty(key)) {
            const trimmedKey = key.trim();
            let value = row[key];

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
          console.warn('Empty row:', row);
        }
        if (!hasCriticalFields) {
          console.warn('Row with missing critical data:', row);
        }
        return hasData && hasCriticalFields;
      });

      console.log('Filtered data to be imported:', jsonData);

      const db = await cds.connect.to('db');
      const { Railway } = db.entities('com.satinfotech.railwaytask');
      await DELETE.from(Railway);
      for (const row of jsonData) {
        console.log('Inserting row:', row);
        await INSERT.into(Railway).entries(row);
      }

      res.status(200).send('Data imported successfully');
    } catch (error) {
      console.error('Error during file upload and import:', error);
      res.status(500).send('File upload failed');
    }
  });
});
