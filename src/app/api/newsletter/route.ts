import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validation de l'email
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Email invalide" },
        { status: 400 }
      );
    }

    // Configuration du transporteur Nodemailer pour cPanel SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "465"),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Email pour l'administrateur
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: "Nouvelle inscription à la newsletter - CPU-PME",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #F08223;">Nouvelle inscription à la newsletter</h2>
          <p>Un utilisateur souhaite être informé du lancement de la plateforme CPU-PME.</p>
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 0;"><strong>Adresse email :</strong> ${email}</p>
            <p style="margin: 10px 0 0 0;"><strong>Date :</strong> ${new Date().toLocaleString("fr-FR")}</p>
          </div>
        </div>
      `,
    };

    // Email de confirmation pour l'utilisateur
    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Merci de votre intérêt pour CPU-PME !",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; padding: 20px; background: linear-gradient(135deg, #F08223 0%, #D97420 100%);">
            <h1 style="color: white; margin: 0;">CPU-PME</h1>
          </div>

          <div style="padding: 30px; background-color: #ffffff;">
            <h2 style="color: #221F1F;">Merci de votre intérêt !</h2>

            <p style="color: #6F6F6F; line-height: 1.6;">
              Nous avons bien reçu votre demande d'information concernant le lancement de notre nouvelle plateforme.
            </p>

            <p style="color: #6F6F6F; line-height: 1.6;">
              Vous serez parmi les premiers informés dès que notre plateforme sera disponible.
              Nous préparons une expérience innovante qui, nous l'espérons, répondra à vos attentes.
            </p>

            <div style="background: linear-gradient(135deg, #199D4E 0%, #157A3D 100%); padding: 20px; border-radius: 10px; margin: 30px 0; text-align: center;">
              <p style="color: white; margin: 0; font-size: 16px;">
                Restez connecté pour des mises à jour exclusives !
              </p>
            </div>

            <p style="color: #AAAAAA; font-size: 14px; margin-top: 30px;">
              À très bientôt,<br>
              <strong style="color: #F08223;">L'équipe CPU-PME</strong>
            </p>
          </div>

          <div style="padding: 20px; background-color: #f5f5f5; text-align: center;">
            <p style="color: #AAAAAA; font-size: 12px; margin: 0;">
              Cet email a été envoyé à ${email}
            </p>
          </div>
        </div>
      `,
    };

    // Envoi des deux emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    return NextResponse.json(
      { message: "Inscription réussie !" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de l'envoi des emails:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue. Veuillez réessayer plus tard." },
      { status: 500 }
    );
  }
}
