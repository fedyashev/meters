const nodemailer = require('nodemailer');
const email = require('../config/email.json');

module.exports.sendEmail = (report, pdfDocumentStream) => {
    const transport = nodemailer.createTransport({
        service: email.service,
        auth: {
            user: email.noreply.username,
            pass: email.noreply.password
        }
    });

    return transport
        .sendMail({
            from: email.noreply.url,
            to: `${email.reports.url}, ${report.Consumer.email}`,
            subject: 'Отчет о потреблении электроэнергии',
            text: 'Отчет о потреблении электроэнергии',
            attachments: [
                {
                    filename: `report-${Date.now()}.pdf`,
                    content: pdfDocumentStream
                },
            ]
        });
}

module.exports.sendEmailAct01 = (consumerEmail, pdfDocumentStream) => {
    const transport = nodemailer.createTransport({
        service: email.service,
        auth: {
            user: email.noreply.username,
            pass: email.noreply.password
        }
    });

    return transport
        .sendMail({
            from: email.noreply.url,
            to: `${email.reports.url}, ${consumerEmail}`, // [email.reports.url, consumerEmail].filter(p => typeof p === 'string').join(', '),
            subject: 'Отчет о потреблении электроэнергии',
            text: 'Отчет о потреблении электроэнергии',
            attachments: [
                {
                    filename: `act-${Date.now()}.pdf`,
                    content: pdfDocumentStream
                },
            ]
        });
}