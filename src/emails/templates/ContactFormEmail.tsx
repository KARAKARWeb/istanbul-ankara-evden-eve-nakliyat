import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Button,
  Row,
  Column,
  Hr,
} from '@react-email/components';

interface ContactFormEmailProps {
  name: string;
  phone: string;
  email?: string;
  from?: string;
  to?: string;
  message?: string;
}

export default function ContactFormEmail({
  name,
  phone,
  email = '',
  from = '',
  to = '',
  message = '',
}: ContactFormEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Yeni İletişim Formu Mesajı - {name}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={h1}>Yeni İletişim Formu Mesajı</Heading>
          </Section>

          <Section style={content}>
            <Text style={paragraph}>
              Web sitenizden yeni bir mesaj aldınız.
            </Text>

            <Section style={infoBox}>
              <Row>
                <Column>
                  <Text style={label}>Ad Soyad:</Text>
                  <Text style={value}>{name}</Text>
                </Column>
              </Row>
              
              <Row>
                <Column>
                  <Text style={label}>Telefon:</Text>
                  <Text style={value}>{phone}</Text>
                </Column>
              </Row>

              {email && (
                <Row>
                  <Column>
                    <Text style={label}>Email:</Text>
                    <Text style={value}>{email}</Text>
                  </Column>
                </Row>
              )}

              {from && (
                <Row>
                  <Column>
                    <Text style={label}>Nereden:</Text>
                    <Text style={value}>{from}</Text>
                  </Column>
                </Row>
              )}

              {to && (
                <Row>
                  <Column>
                    <Text style={label}>Nereye:</Text>
                    <Text style={value}>{to}</Text>
                  </Column>
                </Row>
              )}

              {message && (
                <Row>
                  <Column>
                    <Text style={label}>Mesaj:</Text>
                    <Text style={value}>{message}</Text>
                  </Column>
                </Row>
              )}
            </Section>

            <Section style={buttonContainer}>
              <Button style={button} href={`tel:${phone}`}>
                Müşteriyi Ara
              </Button>
            </Section>

            <Hr style={hr} />

            <Text style={footer}>
              Gönderim Zamanı: {new Date().toLocaleString('tr-TR')}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: '#f5f5f5',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
};

const header = {
  padding: '32px 48px',
  backgroundColor: '#16A34A',
};

const h1 = {
  color: '#ffffff',
  fontSize: '24px',
  fontWeight: '600',
  lineHeight: '1.25',
  margin: '0',
};

const content = {
  padding: '0 48px',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '1.5',
  color: '#374151',
  margin: '16px 0',
};

const infoBox = {
  backgroundColor: '#f9fafb',
  border: '1px solid #e5e7eb',
  borderRadius: '8px',
  padding: '24px',
  margin: '24px 0',
};

const label = {
  fontSize: '14px',
  fontWeight: '600',
  color: '#6b7280',
  margin: '8px 0 4px 0',
};

const value = {
  fontSize: '16px',
  color: '#111827',
  margin: '0 0 16px 0',
};

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
};

const button = {
  backgroundColor: '#16A34A',
  borderRadius: '8px',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 32px',
};

const hr = {
  borderColor: '#e5e7eb',
  margin: '32px 0',
};

const footer = {
  color: '#9ca3af',
  fontSize: '12px',
  lineHeight: '1.5',
  textAlign: 'center' as const,
};
