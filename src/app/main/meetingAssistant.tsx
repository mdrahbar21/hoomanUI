"use client"

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { toast } from '@/components/ui/use-toast';

// Define the form schema
const formSchema = z.object({
  agentName: z.string().min(2, { message: "Agent name must be at least 2 characters." }),
  voice: z.string(),
  introMessage: z.string().min(10, { message: "Intro message must be at least 10 characters." }),
  roleDescription: z.string().min(10, { message: "Role description must be at least 10 characters." }),
  instructions: z.string().min(10, { message: "Instructions must be at least 10 characters." }),
  conversationStyle: z.string().min(10, { message: "Conversation style must be at least 10 characters." }),
});

const MeetingAssistant = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      agentName: '',
      voice: 'Kajal', // Default voice
      introMessage: '',
      roleDescription: '',
      instructions: '',
      conversationStyle: '',
    }
  });

  const onSubmit = (data:any) => {
    toast({
      title: "Form Submitted",
      description: JSON.stringify(data, null, 2),
    });
  };

  return (
    <div>
    <h1 className="text-2xl font-bold text-white">Meeting Assistant</h1>
    <p className="text-white">Customize your meeting assistant</p>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="bg-black text-white p-8 grid gap-6">
      <FormField name="agentName" control={form.control} render={({ field }) => (
        <FormItem>
          <FormLabel>Agent Name</FormLabel>
          <FormControl>
            <Input {...field} placeholder="Give your agent an identity" className='w-3/4' />
          </FormControl>
          <FormMessage>{form.formState.errors.agentName?.message}</FormMessage>
        </FormItem>
      )} />
      <div className='flex '>
        <div className='w-3/4'>
      <FormField name="introMessage" control={form.control} render={({ field }) => (
        <FormItem>
          <FormLabel>Intro Message</FormLabel>
          <FormControl>
            <Input {...field} placeholder="Hey, this is Hooman..." />
          </FormControl>
          <FormMessage>{form.formState.errors.introMessage?.message}</FormMessage>
        </FormItem>
      )} />
      </div>
      <div className='w-1/5 space-x-1'>
      <FormField name="voice" control={form.control} render={({ field }) => (
        <FormItem >
          <FormLabel>Select Voice</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <SelectTrigger>
              <SelectValue  placeholder="Select a voice" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Kajal">Kajal (default voice)</SelectItem>
              <SelectItem value="Alternative">Alternative Voice</SelectItem>
            </SelectContent>
          </Select>
        </FormItem>
      )} />
      </div>
      </div>
      <FormField name="introMessage" control={form.control} render={({ field }) => (
        <FormItem>
          <FormLabel>Intro Message</FormLabel>
          <FormControl>
            <Input {...field} placeholder="Hey, this is Hooman..." />
          </FormControl>
          <FormMessage>{form.formState.errors.introMessage?.message}</FormMessage>
        </FormItem>
      )} />
      <Button type="submit">Save Settings</Button>
      </form>
    </Form>
    </div>
  );
};

export default MeetingAssistant;
