'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { supabase } from '@/lib/supabaseClient';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { setHours, setMinutes } from 'date-fns';

const BookingPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    services: [] as string[],
    message: '',
    preferredDate: null as Date | null,
    preferredTime: null as Date | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({
        ...prev,
        services: checked
          ? [...prev.services, name]
          : prev.services.filter((service) => service !== name),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleDateChange = (date: Date | null) => {
    setFormData((prev) => ({ ...prev, preferredDate: date }));
  };

  const handleTimeChange = (time: Date | null) => {
    setFormData((prev) => ({ ...prev, preferredTime: time }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from('leads')
      .insert([{
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        services: formData.services,
        message: formData.message,
        preferredDate: formData.preferredDate ? formData.preferredDate.toISOString() : null,
        preferredTime: formData.preferredTime ? formData.preferredTime.toTimeString() : null,
      }]);

    if (error) {
      console.error('Error inserting data:', error.message);
      alert('There was an error submitting your request. Please try again.');
    } else {
      console.log('Data inserted successfully:', data);
      alert('Your booking request has been submitted successfully!');
      setFormData({
        name: '',
        phone: '',
        email: '',
        address: '',
        services: [],
        message: '',
        preferredDate: null,
        preferredTime: null,
      });
    }
  };

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-4xl font-bold font-serif text-center mb-8">Book a Consultation</h1>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-8">
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="name">Full Name</Label>
          <Input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
        </div>
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="email">Email Address</Label>
          <Input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="address">Full Address</Label>
          <Input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required />
        </div>
        <div className="space-y-2">
          <Label>Services Needed</Label>
          <div className="flex items-center space-x-2">
            <Checkbox id="companion-care" name="Companion Care" onCheckedChange={(checked: boolean) => handleChange({
              target: {
                name: 'Companion Care',
                value: checked.toString(),
                type: 'checkbox',
                checked: checked,
              },
            } as React.ChangeEvent<HTMLInputElement>)} />
            <Label htmlFor="companion-care">Companion Care</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="respite-care" name="Respite Care" onCheckedChange={(checked: boolean) => handleChange({
              target: {
                name: 'Respite Care',
                value: checked.toString(),
                type: 'checkbox',
                checked: checked,
              },
            } as React.ChangeEvent<HTMLInputElement>)} />
            <Label htmlFor="respite-care">Respite Care</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="personal-care" name="Personal Care" onCheckedChange={(checked: boolean) => handleChange({
              target: {
                name: 'Personal Care',
                value: checked.toString(),
                type: 'checkbox',
                checked: checked,
              },
            } as React.ChangeEvent<HTMLInputElement>)} />
            <Label htmlFor="personal-care">Personal Care</Label>
          </div>
        </div>
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="preferredDate">Preferred Date</Label>
          <DatePicker
            id="preferredDate"
            selected={formData.preferredDate}
            onChange={handleDateChange}
            dateFormat="MM/dd/yyyy"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="preferredTime">Preferred Time</Label>
          <DatePicker
            id="preferredTime"
            selected={formData.preferredTime}
            onChange={handleTimeChange}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm aa"
            className="w-full p-2 border border-gray-300 rounded-md"
            minTime={setHours(setMinutes(new Date(), 0), 9)}
            maxTime={setHours(setMinutes(new Date(), 0), 17)}
          />
        </div>
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="message">Message</Label>
          <Textarea id="message" name="message" value={formData.message} onChange={handleChange} />
        </div>
        <Button type="submit" className="w-full">Submit Booking Request</Button>
      </form>
    </main>
  );
};

export default BookingPage;
