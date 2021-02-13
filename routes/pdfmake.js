const express = require("express");
const app = express();
const router = express.Router();

const pdfMake = require("../pdfmake/pdfmake");
const vfsFonts = require("../pdfmake/vfs_fonts");

pdfMake.vfs = vfsFonts.pdfMake.vfs;

router.post("/pdf", (req, res, next) => {
  // res.send("PDF");

  const fname = req.body.fname;
  const lname = req.body.lname;
  console.log(req.body.fname);

  var ducumentDefinition = {
    content: [
      {
        text: `Hi my name is ${fname} ${lname}`,
        style: "headerBig",
      },
    ],
    styles: {
      headerBig: {
        fontSize: 30,
        bold: true,
      },
    },
  };

  const pdfDoc = pdfMake.createPdf(ducumentDefinition);
  pdfDoc.getBase64((data) => {
    res.writeHead(200, {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment;filename="filename.pdf"',
    });
    const download = Buffer.from(data.toString("utf-8"), "base64");
    res.end(download);
  });
});

module.exports = router;
