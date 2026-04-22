// =============================================================================
// ContactForm.jsx – Formulaire de contact artisan (nom, email, objet, message)
// Validation côté client + envoi via API
// =============================================================================
import React, { useState } from 'react';
import { sendContactForm } from '../../services/api';

const INITIAL_FORM = { nom: '', email: '', objet: '', message: '' };

// Validation simple (WCAG : messages d'erreur explicites)
function validate(fields) {
  const errors = {};
  if (!fields.nom.trim())               errors.nom     = 'Votre nom est requis.';
  if (!fields.email.trim())             errors.email   = 'Votre adresse e-mail est requise.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
                                         errors.email   = 'Adresse e-mail invalide.';
  if (!fields.objet.trim())             errors.objet   = "L'objet du message est requis.";
  if (!fields.message.trim())           errors.message = 'Le message ne peut pas être vide.';
  else if (fields.message.trim().length < 10)
                                         errors.message = 'Le message doit contenir au moins 10 caractères.';
  return errors;
}

function ContactForm({ artisanId, artisanNom }) {
  const [form, setForm]       = useState(INITIAL_FORM);
  const [errors, setErrors]   = useState({});
  const [status, setStatus]   = useState('idle'); // idle | loading | success | error
  const [serverMsg, setServerMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    // Effacer l'erreur du champ modifié
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) {
      setErrors(errs);
      // Focus sur le premier champ en erreur (accessibilité)
      const firstKey = Object.keys(errs)[0];
      document.getElementById(`cf-${firstKey}`)?.focus();
      return;
    }

    setStatus('loading');
    setErrors({});

    try {
      await sendContactForm(artisanId, form);
      setStatus('success');
      setForm(INITIAL_FORM);
    } catch (err) {
      setStatus('error');
      setServerMsg(err.message || "Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <section aria-labelledby="contact-form-title" className="contact-form">
      <h2 id="contact-form-title" className="section-title">
        Contacter {artisanNom}
      </h2>
      <div className="divider" />

      {/* Succès */}
      {status === 'success' && (
        <div className="form-success mb-4" role="alert">
          <i className="bi bi-check-circle-fill" aria-hidden="true" />
          Votre message a bien été envoyé ! {artisanNom} vous répondra sous 48h.
        </div>
      )}

      {/* Erreur serveur */}
      {status === 'error' && (
        <div className="alert alert-danger d-flex gap-2" role="alert">
          <i className="bi bi-exclamation-triangle-fill" aria-hidden="true" />
          {serverMsg}
        </div>
      )}

      {status !== 'success' && (
        <form onSubmit={handleSubmit} noValidate aria-label="Formulaire de contact">
          <div className="row g-3">

            {/* Nom */}
            <div className="col-12 col-md-6">
              <label htmlFor="cf-nom" className="form-label">
                Nom <span aria-hidden="true" className="text-danger">*</span>
                <span className="visually-hidden">(obligatoire)</span>
              </label>
              <input
                id="cf-nom"
                type="text"
                name="nom"
                className={`form-control${errors.nom ? ' is-invalid' : ''}`}
                value={form.nom}
                onChange={handleChange}
                autoComplete="name"
                aria-describedby={errors.nom ? 'err-nom' : undefined}
                aria-invalid={!!errors.nom}
              />
              {errors.nom && (
                <div id="err-nom" className="invalid-feedback" role="alert">
                  {errors.nom}
                </div>
              )}
            </div>

            {/* Email */}
            <div className="col-12 col-md-6">
              <label htmlFor="cf-email" className="form-label">
                E-mail <span aria-hidden="true" className="text-danger">*</span>
                <span className="visually-hidden">(obligatoire)</span>
              </label>
              <input
                id="cf-email"
                type="email"
                name="email"
                className={`form-control${errors.email ? ' is-invalid' : ''}`}
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
                aria-describedby={errors.email ? 'err-email' : undefined}
                aria-invalid={!!errors.email}
              />
              {errors.email && (
                <div id="err-email" className="invalid-feedback" role="alert">
                  {errors.email}
                </div>
              )}
            </div>

            {/* Objet */}
            <div className="col-12">
              <label htmlFor="cf-objet" className="form-label">
                Objet <span aria-hidden="true" className="text-danger">*</span>
                <span className="visually-hidden">(obligatoire)</span>
              </label>
              <input
                id="cf-objet"
                type="text"
                name="objet"
                className={`form-control${errors.objet ? ' is-invalid' : ''}`}
                value={form.objet}
                onChange={handleChange}
                aria-describedby={errors.objet ? 'err-objet' : undefined}
                aria-invalid={!!errors.objet}
              />
              {errors.objet && (
                <div id="err-objet" className="invalid-feedback" role="alert">
                  {errors.objet}
                </div>
              )}
            </div>

            {/* Message */}
            <div className="col-12">
              <label htmlFor="cf-message" className="form-label">
                Message <span aria-hidden="true" className="text-danger">*</span>
                <span className="visually-hidden">(obligatoire)</span>
              </label>
              <textarea
                id="cf-message"
                name="message"
                className={`form-control${errors.message ? ' is-invalid' : ''}`}
                rows={5}
                value={form.message}
                onChange={handleChange}
                aria-describedby={errors.message ? 'err-message' : 'hint-message'}
                aria-invalid={!!errors.message}
              />
              <div id="hint-message" className="form-text text-muted">
                {form.message.length} caractère{form.message.length !== 1 ? 's' : ''} (minimum 10)
              </div>
              {errors.message && (
                <div id="err-message" className="invalid-feedback" role="alert">
                  {errors.message}
                </div>
              )}
            </div>

            {/* Champ honeypot anti-spam (masqué) */}
            <div className="visually-hidden" aria-hidden="true">
              <input type="text" name="_website" tabIndex={-1} autoComplete="off" />
            </div>

            {/* Mention champs obligatoires */}
            <div className="col-12">
              <p className="text-muted mb-0" style={{ fontSize: '0.8rem' }}>
                <span aria-hidden="true" className="text-danger">*</span> Champs obligatoires
              </p>
            </div>

            {/* Bouton envoi */}
            <div className="col-12">
              <button
                type="submit"
                className="btn btn-primary-custom"
                disabled={status === 'loading'}
                aria-busy={status === 'loading'}
              >
                {status === 'loading' ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" aria-hidden="true" />
                    Envoi en cours…
                  </>
                ) : (
                  <>
                    <i className="bi bi-send me-2" aria-hidden="true" />
                    Envoyer le message
                  </>
                )}
              </button>
            </div>

          </div>
        </form>
      )}
    </section>
  );
}

export default ContactForm;
