import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Button,
  Row,
  Column,
  Hr,
} from '@react-email/components';

interface PriceQuoteEmailProps {
  customerName: string;
  phone: string;
  email?: string;
  serviceType?: string;
  preferredDate?: string;
  fromCity?: string;
  fromAddress?: string;
  toCity?: string;
  toAddress?: string;
  message?: string;
}

export default function PriceQuoteEmail({
  customerName,
  phone,
  email = '',
  serviceType = '',
  preferredDate = '',
  fromCity = '',
  fromAddress = '',
  toCity = '',
  toAddress = '',
  message = '',
}: PriceQuoteEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Yeni Fiyat Teklifi Talebi - {customerName}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={h1}>Yeni Fiyat Teklifi Talebi</Heading>
          </Section>

          <Section style={content}>
            <Text style={paragraph}>
              Merhaba,
            </Text>
            <Text style={paragraph}>
              Web sitenizden yeni bir fiyat teklifi talebi aldınız.
            </Text>

            <Section style={infoBox}>
              <Heading style={sectionTitle}>👤 Müşteri Bilgileri</Heading>
              
              <Row>
                <Column>
                  <Text style={label}>Ad Soyad:</Text>
                  <Text style={value}>{customerName}</Text>
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
                    <Text style={label}>E-posta:</Text>
                    <Text style={value}>{email}</Text>
                  </Column>
                </Row>
              )}

              {serviceType && (
                <>
                  <Hr style={divider} />
                  <Heading style={sectionTitle}>📦 Hizmet Detayları</Heading>
                  
                  <Row>
                    <Column>
                      <Text style={label}>Hizmet Tipi:</Text>
                      <Text style={value}>{serviceType}</Text>
                    </Column>
                  </Row>
                </>
              )}

              {preferredDate && (
                <Row>
                  <Column>
                    <Text style={label}>Tercih Edilen Tarih:</Text>
                    <Text style={value}>{preferredDate}</Text>
                  </Column>
                </Row>
              )}

              {(fromCity || toCity) && (
                <>
                  <Hr style={divider} />
                  <Heading style={sectionTitle}>📍 Adres Bilgileri</Heading>
                </>
              )}

              {fromCity && (
                <Row>
                  <Column>
                    <Text style={label}>Çıkış İli:</Text>
                    <Text style={value}>{fromCity}</Text>
                  </Column>
                </Row>
              )}

              {fromAddress && (
                <Row>
                  <Column>
                    <Text style={label}>Çıkış Adresi:</Text>
                    <Text style={value}>{fromAddress}</Text>
                  </Column>
                </Row>
              )}

              {toCity && (
                <Row>
                  <Column>
                    <Text style={label}>Varış İli:</Text>
                    <Text style={value}>{toCity}</Text>
                  </Column>
                </Row>
              )}

              {toAddress && (
                <Row>
                  <Column>
                    <Text style={label}>Varış Adresi:</Text>
                    <Text style={value}>{toAddress}</Text>
                  </Column>
                </Row>
              )}

              {message && (
                <>
                  <Hr style={divider} />
                  <Heading style={sectionTitle}>💬 Ek Notlar</Heading>
                  
                  <Row>
                    <Column>
                      <Text style={value}>{message}</Text>
                    </Column>
                  </Row>
                </>
              )}
            </Section>

            <Section style={buttonContainer}>
              <Button
                style={button}
                href={`tel:${phone}`}
              >
                Müşteriyi Ara
              </Button>
            </Section>

            <Hr style={hr} />

            <Text style={footer}>
              Bu email otomatik olarak oluşturulmuştur.
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

const sectionTitle = {
  fontSize: '16px',
  fontWeight: '600',
  color: '#16A34A',
  margin: '16px 0 12px 0',
};

const divider = {
  borderColor: '#e5e7eb',
  margin: '16px 0',
};
