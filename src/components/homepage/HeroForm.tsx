'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const formSchema = z.object({
  name: z.string().min(2, 'Ad soyad en az 2 karakter olmalıdır'),
  phone: z.string().min(10, 'Geçerli bir telefon numarası giriniz'),
  from: z.string().optional(),
  to: z.string().optional(),
  message: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface HeroFormProps {
  routeInfo?: any;
}

export function HeroForm({ routeInfo: propsRoute }: HeroFormProps = {}) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const routeInfo = propsRoute || { toCity: '' };

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
      from: '',
      to: '',
      message: '',
    },
  });

  useEffect(() => {
    if (routeInfo?.fromCity || routeInfo?.sourceCity) {
      form.setValue('from', routeInfo.fromCity || routeInfo.sourceCity || '');
    }
    if (routeInfo?.toCity || routeInfo?.targetCity) {
      form.setValue('to', routeInfo.toCity || routeInfo.targetCity || '');
    }
  }, [routeInfo, form]);

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

  return (
    <div className="bg-background p-8 rounded-xl border border-border">
      <h3 className="text-xl font-semibold text-text-primary mb-6">
        Ücretsiz Fiyat Teklifi Alın
      </h3>

      {success && (
        <div className="mb-6 p-4 bg-accent/10 border border-accent rounded-lg text-accent text-sm">
          Mesajınız alındı! En kısa sürede dönüş yapacağız.
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ad Soyad *</FormLabel>
                <FormControl>
                  <Input placeholder="Adınız Soyadınız" {...field} />
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
                <FormLabel>Telefon *</FormLabel>
                <FormControl>
                  <Input placeholder="0555 555 55 55" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="from"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nereden</FormLabel>
                  <FormControl>
                    <Input placeholder="İstanbul" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="to"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nereye</FormLabel>
                  <FormControl>
                    <Input placeholder={routeInfo?.toCity || routeInfo?.targetCity || ''} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mesajınız (Opsiyonel)</FormLabel>
                <FormControl>
                  <Textarea rows={3} placeholder="Ek bilgiler..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Gönderiliyor...' : 'Teklif Al'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
