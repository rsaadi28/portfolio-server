const express = require('express');
const cors = require('cors'); // Importação do pacote cors
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();

const PORT = process.env.PORT || 3000;

// Configuração do CORS
app.use(cors()); // Permite todas as origens

// Caso queira permitir apenas origens específicas, você pode fazer assim:
// app.use(cors({ origin: 'http://127.0.0.1:5500' }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuração do Nodemailer com Sendinblue
const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false,
    auth: {
        user: '79936e001@smtp-brevo.com',
        pass: 'QwJaFZcMAjSYxCDB'
    }
});

app.post('/send', (req, res) => {
    console.log(req.body);
    const { nome, email, mensagem } = req.body;

    const mailOptions = {
        from: 'rsaadi28@gmail.com',
        to: 'rsaadi28@gmail.com',
        subject: `Nova mensagem de contato de ${nome}`,
        text: `Nome: ${nome}\nEmail: ${email}\n\nMensagem:\n${mensagem}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).send('Erro ao enviar email');
        }
        res.send('Email enviado com sucesso');
    });
});

app.listen(PORT, () => {
    console.log('Servidor rodando na porta 3000');
});
