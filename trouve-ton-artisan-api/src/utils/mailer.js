// =============================================================================
// utils/mailer.js – Service d'envoi d'e-mails via Nodemailer
// =============================================================================
'use strict';

const nodemailer = require('nodemailer');
require('dotenv').config();

// Création du transporteur SMTP
const transporter = nodemailer.createTransport({
  host:   process.env.MAIL_HOST,
  port:   parseInt(process.env.MAIL_PORT) || 587,
  secure: process.env.MAIL_SECURE === 'true', // true = port 465, false = STARTTLS
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

/**
 * Envoie le message de contact à l'artisan.
 *
 * @param {Object} artisan        - Objet artisan (nom, email…)
 * @param {Object} contactData    - { nom, email, objet, message }
 * @returns {Promise}
 */
async function sendContactEmail(artisan, contactData) {
  const { nom: expediteurNom, email: expediteurEmail, objet, message } = contactData;

  // E-mail envoyé à l'artisan
  await transporter.sendMail({
    from:     process.env.MAIL_FROM,
    to:       artisan.email,
    replyTo:  expediteurEmail,
    subject:  `[Trouve ton artisan] ${objet}`,
    text: [
      `Bonjour ${artisan.nom},`,
      '',
      `Vous avez reçu un message via la plateforme Trouve ton Artisan.`,
      '',
      `De     : ${expediteurNom} <${expediteurEmail}>`,
      `Objet  : ${objet}`,
      '',
      `Message :`,
      message,
      '',
      '---',
      'Ce message vous a été transmis via la plateforme Trouve ton Artisan.',
      'Région Auvergne-Rhône-Alpes – https://trouve-ton-artisan.fr',
    ].join('\n'),
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e9ecef;border-radius:8px;overflow:hidden">
        <div style="background:#00497c;padding:20px 24px">
          <h1 style="color:#fff;font-size:18px;margin:0">Nouveau message – Trouve ton Artisan</h1>
        </div>
        <div style="padding:24px">
          <p>Bonjour <strong>${artisan.nom}</strong>,</p>
          <p>Vous avez reçu un message via la plateforme <em>Trouve ton Artisan</em>.</p>
          <table style="width:100%;border-collapse:collapse;margin:16px 0">
            <tr>
              <td style="padding:8px;background:#f1f8fc;font-weight:bold;width:100px;border-radius:4px 0 0 4px">De</td>
              <td style="padding:8px;background:#f8f9fa">${expediteurNom} &lt;${expediteurEmail}&gt;</td>
            </tr>
            <tr>
              <td style="padding:8px;background:#f1f8fc;font-weight:bold;border-radius:4px 0 0 4px">Objet</td>
              <td style="padding:8px;background:#f8f9fa">${objet}</td>
            </tr>
          </table>
          <div style="background:#f8f9fa;border-left:4px solid #0074c7;padding:16px;border-radius:0 4px 4px 0;white-space:pre-wrap;margin:16px 0">
            ${message.replace(/\n/g, '<br>')}
          </div>
          <p style="color:#6c757d;font-size:13px">
            Pour répondre, utilisez directement l'adresse e-mail de l'expéditeur : 
            <a href="mailto:${expediteurEmail}">${expediteurEmail}</a>
          </p>
        </div>
        <div style="background:#384050;padding:12px 24px;text-align:center">
          <p style="color:rgba(255,255,255,.6);font-size:12px;margin:0">
            Région Auvergne-Rhône-Alpes – Trouve ton Artisan
          </p>
        </div>
      </div>
    `,
  });
}

module.exports = { sendContactEmail };
