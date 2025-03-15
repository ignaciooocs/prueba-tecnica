export function verificationEmailHtml (code: number) {
    return `
        <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Código de Verificación</title>
                <style>
                    body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #f4f7fc;
                    color: white;
                    }

                    .email-container {
                    max-width: 600px;
                    margin: 30px auto;
                    padding: 20px;
                    background-color: #ffffff;
                    border-radius: 10px;
                    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
                    }

                    .header {
                    background-color: #3b82f6;
                    color: white;
                    padding: 20px;
                    text-align: center;
                    border-radius: 10px 10px 0 0;
                    }

                    .header h1 {
                    font-size: 24px;
                    margin: 0;
                    }

                    .content {
                    margin-top: 30px;
                    font-size: 16px;
                    line-height: 1.6;
                    text-align: center;
                    }

                    .code {
                    font-size: 36px;
                    font-weight: bold;
                    color: #3b82f6;
                    background-color: #f4f7fc;
                    padding: 10px 20px;
                    border-radius: 5px;
                    margin: 20px 0;
                    }

                    .footer {
                    margin-top: 30px;
                    font-size: 12px;
                    text-align: center;
                    color: #888;
                    }

                    .footer a {
                    color: #3b82f6;
                    text-decoration: none;
                    }
                </style>
            </head>
            <body>
            <div class="email-container">
                <div class="header">
                <h1>¡Bienvenido a nuestro sistema!</h1>
                </div>
                <div class="content">
                <p>Para continuar con el proceso de registro, por favor ingresa el siguiente código de verificación:</p>
                <div class="code">${code}</div>
                <p>Si no solicitaste este código, ignora este mensaje.</p>
                </div>
                <div class="footer">
                <p>Este correo fue enviado por nuestro equipo de soporte. Para más información, visita nuestra <a href="#">página de soporte</a>.</p>
                </div>
            </div>
            </body>
            </html>
`
}