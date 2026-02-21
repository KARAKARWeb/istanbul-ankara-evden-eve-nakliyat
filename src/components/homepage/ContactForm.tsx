'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { House, Building2, Package, Warehouse, Truck, User, Phone, Mail, MapPin, Send } from 'lucide-react';

const formSchema = z.object({
  serviceType: z.string().min(1, 'Hizmet tipi seçiniz'),
  name: z.string().min(2, 'Ad soyad en az 2 karakter olmalıdır'),
  phone: z.string().min(10, 'Geçerli bir telefon numarası giriniz'),
  email: z.string().email('Geçerli bir email giriniz').optional().or(z.literal('')),
  preferredDate: z.string().optional(),
  fromCity: z.string().optional(),
  fromAddress: z.string().optional(),
  toCity: z.string().optional(),
  toAddress: z.string().optional(),
  message: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const serviceTypes = [
  { value: 'evden-eve', label: 'Evden Eve Nakliyat', icon: House },
  { value: 'ofis', label: 'Ofis Taşımacılığı', icon: Building2 },
  { value: 'villa', label: 'Villa Taşıma', icon: House },
  { value: 'depolama', label: 'Eşya Depolama', icon: Warehouse },
];

const cities = [
  'Adana', 'Adıyaman', 'Afyonkarahisar', 'Ağrı', 'Aksaray', 'Amasya', 'Ankara', 'Antalya',
  'Ardahan', 'Artvin', 'Aydın', 'Balıkesir', 'Bartın', 'Batman', 'Bayburt', 'Bilecik',
  'Bingöl', 'Bitlis', 'Bolu', 'Burdur', 'Bursa', 'Çanakkale', 'Çankırı', 'Çorum',
  'Denizli', 'Diyarbakır', 'Düzce', 'Edirne', 'Elazığ', 'Erzincan', 'Erzurum', 'Eskişehir',
  'Gaziantep', 'Giresun', 'Gümüşhane', 'Hakkari', 'Hatay', 'Iğdır', 'Isparta', 'İstanbul',
  'İzmir', 'Kahramanmaraş', 'Karabük', 'Karaman', 'Kars', 'Kastamonu', 'Kayseri', 'Kırıkkale',
  'Kırklareli', 'Kırşehir', 'Kilis', 'Kocaeli', 'Konya', 'Kütahya', 'Malatya', 'Manisa',
  'Mardin', 'Mersin', 'Muğla', 'Muş', 'Nevşehir', 'Niğde', 'Ordu', 'Osmaniye',
  'Rize', 'Sakarya', 'Samsun', 'Şanlıurfa', 'Siirt', 'Sinop', 'Sivas', 'Şırnak',
  'Tekirdağ', 'Tokat', 'Trabzon', 'Tunceli', 'Uşak', 'Van', 'Yalova', 'Yozgat', 'Zonguldak'
];

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      serviceType: '',
      name: '',
      phone: '',
      email: '',
      preferredDate: '',
      fromCity: '',
      fromAddress: '',
      toCity: '',
      toAddress: '',
      message: '',
    },
  });

  const handleSubmit = async (data: FormData) => {
    setLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSuccess(true);
        form.reset();
        setTimeout(() => setSuccess(false), 5000);
      }
    } catch (error) {
      console.error('Form error:', error);
    } finally {
      setLoading(false);
    }
  };

  const selectedService = form.watch('serviceType');

  return (
    <section id="fiyat-teklifi" className="bg-surface py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-background p-6 md:p-8 rounded-xl border border-border">
          <h2 className="text-2xl font-semibold text-text-primary mb-6">
            Ücretsiz Teklif Formu
          </h2>
          
          {success && (
            <div className="mb-6 p-4 bg-accent/10 border border-accent rounded-lg text-accent text-center">
              Mesajınız alındı! En kısa sürede dönüş yapacağız.
            </div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              {/* Hizmet Tipi */}
              <FormField
                control={form.control}
                name="serviceType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-text-primary">Hizmet Tipi *</FormLabel>
                    <div className="grid grid-cols-2 gap-3">
                      {serviceTypes.map((service) => {
                        const Icon = service.icon;
                        return (
                          <button
                            key={service.value}
                            type="button"
                            onClick={() => field.onChange(service.value)}
                            className={`flex items-center gap-2 px-4 py-3 rounded-lg border-2 text-left text-sm font-medium transition-all ${
                              field.value === service.value
                                ? 'border-accent bg-accent/5 text-accent'
                                : 'border-border bg-surface hover:border-accent/50 text-text-primary'
                            }`}
                          >
                            <Icon className="w-4 h-4 shrink-0" />
                            <span className="line-clamp-1">{service.label}</span>
                          </button>
                        );
                      })}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* İletişim ve Adres Bilgileri Grid */}
              <div className="grid lg:grid-cols-2 gap-6">
                {/* İletişim Bilgileri */}
                <div className="space-y-4 rounded-lg border border-border bg-surface p-5">
                  <p className="flex items-center gap-2 text-sm font-semibold text-text-primary">
                    <User className="w-4 h-4 text-accent" />
                    İletişim Bilgileri
                  </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">Ad Soyad *</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                            <Input placeholder="Adınız Soyadınız" className="pl-10" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">Telefon *</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                            <Input placeholder="05XX XXX XX XX" type="tel" className="pl-10" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">E-posta</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                            <Input placeholder="ornek@mail.com" type="email" className="pl-10" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="preferredDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">Tercih Edilen Tarih</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Adres Bilgileri */}
              <div className="space-y-4 rounded-lg border border-border bg-surface p-5">
                <p className="flex items-center gap-2 text-sm font-semibold text-text-primary">
                  <MapPin className="w-4 h-4 text-accent" />
                  Adres Bilgileri
                </p>
                <div className="grid gap-5 lg:grid-cols-2">
                  {/* Çıkış Adresi */}
                  <div className="space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-accent">Çıkış Adresi</p>
                    <div className="grid gap-3">
                      <FormField
                        control={form.control}
                        name="fromCity"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium">İl</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="İl seçin" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {cities.map((city) => (
                                  <SelectItem key={city} value={city}>{city}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="fromAddress"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium">Açık Adres</FormLabel>
                            <FormControl>
                              <Input placeholder="Mahalle, sokak, bina no..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Varış Adresi */}
                  <div className="space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-green-600">Varış Adresi</p>
                    <div className="grid gap-3">
                      <FormField
                        control={form.control}
                        name="toCity"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium">İl</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="İl seçin" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {cities.map((city) => (
                                  <SelectItem key={city} value={city}>{city}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="toAddress"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium">Açık Adres</FormLabel>
                            <FormControl>
                              <Input placeholder="Mahalle, sokak, bina no..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
              </div>

              {/* Notlar */}
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Notlarınız</FormLabel>
                    <FormControl>
                      <Textarea rows={3} placeholder="Ek bilgi veya özel talepleriniz..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button type="submit" className="w-full h-11" disabled={loading}>
                <Send className="w-4 h-4 mr-2" />
                {loading ? 'Gönderiliyor...' : 'Teklif Al'}
              </Button>

              <p className="text-center text-xs text-text-muted">
                Bilgileriniz gizli tutulur ve sadece teklif amacıyla kullanılır.
              </p>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
