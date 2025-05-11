import { Body, Button, Container, Head, Html, Img, Preview, Section, Text } from '@react-email/components';


const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : '';


interface EmailConfirmProps {
    userName?: string;
    confirmLink?: string;
}

export default function EmailConfirmationTemplate ({
    userName,
    confirmLink,
}: EmailConfirmProps) {
    return (
        <Html>
            <Head />
            <Body style={main}>
                <Preview>Confirmación de correo - AllenDostmen S.A.C</Preview>
                <Container style={container}>
                    <Img
                        src={`${baseUrl}/static/logo.png`}
                        width="150"
                        height="40"
                        alt="AllenDostmen"
                    />
                    <Section>
                        <Text style={text}>Hola {userName},</Text>
                        <Text style={text}>
                            Bienvenido al sistema de gestión de AllenDostmen S.A.C. Para activar tu cuenta y acceder al sistema,
                            por favor confirma tu dirección de correo electrónico haciendo clic en el siguiente botón:
                        </Text>
                        <Button style={button} href={confirmLink}>
                            Confirmar correo electrónico
                        </Button>
                        <Text style={text}>
                            Si no esperabas este correo, por favor contacta inmediatamente con el departamento de sistemas.
                        </Text>
                        <Text style={text}>
                            Por seguridad, este enlace expirará en 24 horas.
                        </Text>
                        <Text style={text}>
                            Atentamente,<br />
                            Equipo de Sistemas<br />
                            AllenDostmen S.A.C
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
}

/* EmailConfirmation.PreviewProps = {
    userName: 'Usuario',
    confirmLink: 'https://cms.allendostmen.com/confirm-email',
} as EmailConfirmProps;
 */
// export default EmailConfirmation;


const main = {
    backgroundColor: '#f6f9fc',
    padding: '20px 0',
};

const container = {
    backgroundColor: '#ffffff',
    border: '1px solid #e5e7eb',
    padding: '40px',
    borderRadius: '8px',
    maxWidth: '600px',
    margin: '0 auto',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

const text = {
    fontSize: '16px',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    color: '#374151',
    lineHeight: '24px',
    marginBottom: '16px',
};

const button = {
    backgroundColor: '#0f172a',
    borderRadius: '6px',
    color: '#ffffff',
    fontFamily: "'Inter', sans-serif",
    fontSize: '16px',
    fontWeight: '500',
    textDecoration: 'none',
    textAlign: 'center' as const,
    display: 'block',
    width: '100%',
    maxWidth: '240px',
    padding: '12px 20px',
    margin: '24px auto',
};

/* const anchor = {
    color: '#0f172a',
    textDecoration: 'underline',
}; */