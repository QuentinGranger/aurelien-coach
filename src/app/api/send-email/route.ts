import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { to, toName, subject, message, contactId } = await request.json();

    // Validation des données
    if (!to || !toName || !subject || !message) {
      return NextResponse.json(
        { error: 'Données manquantes' },
        { status: 400 }
      );
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(to)) {
      return NextResponse.json(
        { error: 'Email invalide' },
        { status: 400 }
      );
    }

    // Template HTML professionnel
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Réponse d'Aurélien Mazel - Coach CrossFit</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f9fa;
          }
          .container {
            background: white;
            border-radius: 12px;
            padding: 40px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 3px solid #D4AF37;
          }
          .logo {
            font-size: 28px;
            font-weight: bold;
            color: #D4AF37;
            margin-bottom: 10px;
          }
          .subtitle {
            color: #666;
            font-size: 16px;
          }
          .greeting {
            font-size: 18px;
            color: #333;
            margin-bottom: 20px;
          }
          .message-content {
            background: #f8f9fa;
            padding: 25px;
            border-radius: 8px;
            border-left: 4px solid #D4AF37;
            margin: 20px 0;
            font-size: 16px;
            line-height: 1.7;
          }
          .signature {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
          }
          .signature-name {
            font-weight: bold;
            color: #D4AF37;
            font-size: 18px;
          }
          .signature-title {
            color: #666;
            margin: 5px 0;
          }
          .contact-info {
            margin-top: 15px;
            font-size: 14px;
            color: #666;
          }
          .contact-info a {
            color: #D4AF37;
            text-decoration: none;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            font-size: 12px;
            color: #999;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">AURÉLIEN MAZEL</div>
            <div class="subtitle">Coach CrossFit Professionnel</div>
          </div>
          
          <div class="greeting">
            Bonjour ${toName},
          </div>
          
          <div class="message-content">
            ${message.replace(/\n/g, '<br>')}
          </div>
          
          <div class="signature">
            <div class="signature-name">Aurélien Mazel</div>
            <div class="signature-title">Coach CrossFit Certifié</div>
            <div class="contact-info">
              📧 <a href="mailto:mazel.aurelien@hotmail.com">mazel.aurelien@hotmail.com</a><br>
              📱 <a href="tel:+33651965512">06.51.96.55.12</a><br>
              📍 24 rue de Londres, 75009 Paris
            </div>
          </div>
          
          <div class="footer">
            <p>Ce message a été envoyé en réponse à votre demande de contact.<br>
            Si vous ne souhaitez plus recevoir nos emails, vous pouvez nous le signaler en répondant à ce message.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Configuration des emails depuis les variables d'environnement
    const fromDomain = process.env.EMAIL_FROM_DOMAIN || 'resend.dev';
    const replyToEmail = process.env.REPLY_TO_EMAIL || 'mazel.aurelien@hotmail.com';
    
    // Envoi de l'email via Resend
    const { data, error } = await resend.emails.send({
      from: `Aurélien Mazel <noreply@${fromDomain}>`,
      to: [to],
      subject: subject,
      html: htmlContent,
      text: message, // Version texte de fallback
      replyTo: replyToEmail,
      headers: {
        'X-Entity-Ref-ID': contactId || 'unknown',
      },
    });

    if (error) {
      console.error('Erreur Resend:', error);
      return NextResponse.json(
        { error: 'Erreur lors de l\'envoi de l\'email', details: error },
        { status: 500 }
      );
    }

    // Log pour le suivi
    console.log('Email envoyé avec succès:', {
      id: data?.id,
      to: to,
      subject: subject,
      timestamp: new Date().toISOString()
    });

    return NextResponse.json({
      success: true,
      messageId: data?.id,
      message: 'Email envoyé avec succès'
    });

  } catch (error) {
    console.error('Erreur API send-email:', error);
    return NextResponse.json(
      { error: 'Erreur serveur interne' },
      { status: 500 }
    );
  }
}
