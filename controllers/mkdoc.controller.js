//const allCards = require('../test_data');
const { request } = require('express');
const docx = require("docx")
//const express = require("@runkit/runkit/express-endpoint/1.0.0");
//const app = express(exports);
const { Document, Packer, Paragraph, TextRun } = docx;

module.exports.makeDoc = async function(req, res) {
  console.log(req.body);
  const doc = new Document({
        sections: [{
            properties: {},
            children: [
                new Paragraph({
                    children: [
                        new TextRun("УСПЕХ"),
                        new TextRun({
                            text: "В МЕЛОЧАХ",
                            bold: true,
                        }),
                        new TextRun({
                            text: "А МОЖЕТ И В БОЛЬШИХ ДЕЛАХ",
                            bold: true,
                        }),
                    ],
                }),
            ],
        }],
    });

    const b64string = await Packer.toBase64String(doc);
    
    res.setHeader('Content-Disposition', 'attachment; filename=My Document.docx');
    //res.status(200).json(Buffer.from(b64string, 'base64'));
    res.status(200).json(b64string);
};

