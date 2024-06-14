"use client"

import React, {useState} from 'react';
import { useForm, UseFormReturn, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {speaker, plus} from '@/assets'
import { Input } from '@/components/ui/input';
import { Input2 } from '@/components/ui/input2';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"



// Define the form schema
const formSchema = z.object({
  agentName: z.string().min(2, { message: "Agent name must be at least 2 characters." }),
  voice: z.string(),
  introMessage: z.string().min(10, { message: "Intro message must be at least 10 characters." }),
  roleDescription: z.string().min(10, { message: "Role description must be at least 10 characters." }),
  instructions: z.string().min(10, { message: "Instructions must be at least 10 characters." }),
  conversationStyle: z.string().min(10, { message: "Conversation style must be at least 10 characters." }),
});

interface FormValues {
  introMessage: string;
  agentName: string;
  voice: string;
  roleDescription: string;
  instructions: string;
  conversationStyle: string;
}

interface TextToSpeechFormProps {
  form: UseFormReturn<FormValues>;
}

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
      context:'',
      knowledgeBase: '',
      action:'',
    }
  });

  const { toast } = useToast()
  const [volume, setVolume] = useState<number>(0.5);

  const increaseVolume = () => {
    const newVolume = Math.min(volume + 0.1, 1);
    setVolume(newVolume);
    toast({
      title: "Volume",
      description: `The volume is set to ${(newVolume * 100).toFixed(0)}%`,
    });
  };

  const decreaseVolume = () => {
    const newVolume = Math.max(volume - 0.1, 0);
    setVolume(newVolume);
    toast({
      title: "Volume",
      description: `The volume is set to ${(newVolume * 100).toFixed(0)}%`,
    });
  };
  const handleTextToSpeech = () => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(form.getValues('introMessage'));
    utterance.volume = volume;
    synth.speak(utterance);
  };

  const onSubmit = (data: any) => {
    toast({
      title: "Form Submitted",
      description: JSON.stringify(data, null, 2),
    });
  };

  

  return (
    <div className='bg-black'>
      <h1 className="text-2xl font-bold text-white py-4 px-8 pb-0">Meeting Assistant</h1>
      <p className="text-white px-8 py-0 text-xs">Customize your meeting assistant</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="bg-black text-white p-8 grid gap-6">
          <FormField name="agentName" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>Agent name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Give your agent an identity" className='w-1/4' />
              </FormControl>
              <FormMessage>{form.formState.errors.agentName?.message}</FormMessage>
            </FormItem>
          )} />
            <div className='w-1/4 space-x-1'>
              <FormField name="voice" control={form.control} render={({ field }) => (
                <FormItem >
                  <FormLabel>Select voice</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a voice" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Kajal">Kajal (default voice)</SelectItem>
                      <SelectItem value="Alternative">Alternative voice</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )} />
            </div>
          <div className='flex '>
            <div className='w-10/12'>
              <FormField name="introMessage" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Intro message</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Hey, this is Hooman, your virtual assistant from Hoomanlabs. How can I help you today?" />
                  </FormControl>
                  <FormMessage>{form.formState.errors.introMessage?.message}</FormMessage>
                </FormItem>
              )} />
            </div>
            <div className='w-7/8 flex'>
              <div>
                <Button variant="secondary" color="black" className='bg-white text-black mt-8 ml-1' onClick={handleTextToSpeech}  >
                  Auto Generate 
                </Button>
                {/* ***************************************************************ADD TTS HERE*************************************************************************** */}
              </div>
              <div>
                <Avatar>
                  <AvatarImage src={speaker.src} alt="speaker" className='mt-8 ml-1 h-10 w-10 speaker hover-effect' onClick={decreaseVolume}  />
                  {/* <AvatarFallback>Volumne Down</AvatarFallback> */}
                </Avatar>
                {/* <img src={speaker.src} alt="decrease volumne" className='mt-8 ml-1 h-10 w-10 speaker hover-effect' onClick={decreaseVolume}  /> */}
              </div>
              <div>
                <Avatar>
                  <AvatarImage src={plus.src} alt="speaker" className='mt-8 ml-1 h-10 w-10 speaker hover-effect' onClick={increaseVolume}  />
                  {/* <AvatarFallback>Volume Up</AvatarFallback> */}
                </Avatar>
                {/* <img src={plus.src} alt="increase volume" className='mt-8 ml-1 speaker hover-effect' onClick={increaseVolume}/> */}
              </div>
            </div>
          </div>
          <div className=''>
            <FormField name="roleDescription" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Role Description</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="Describe what your agent is supposed to do e.g. “You are a helpful customer service agent working for Hooman Labs." />
                </FormControl>
                <FormMessage>{form.formState.errors.roleDescription?.message}</FormMessage>
              </FormItem>
            )} />
          </div>
          <div className=''>
            <FormField name="instructions" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Instructions</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="Write step-by-step instructions to guide your agent on how to respond to user queries." />
                </FormControl>
                <FormMessage>{form.formState.errors.instructions?.message}</FormMessage>
              </FormItem>
            )} />
          </div>
          <div className=''>
            <FormField name="conversationStyle" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Conversation Style</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="Set tone, response length and other conversation style guidelines for the agent." />
                </FormControl>
                <FormMessage>{form.formState.errors.conversationStyle?.message}</FormMessage>
              </FormItem>
            )} />
          </div>
          <div className=''>
            <FormField name="context" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Context</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="Share information about your company, product or services that agent can refer while responding to user queries." />
                </FormControl>
                <FormMessage>{form.formState.errors.context?.message}</FormMessage>
              </FormItem>
            )} />
          </div>
          <div className='flex'>
            <p className="text-white py-1 text-md">Select Knowledge Base</p>
            <div className='ml-4'>
              <FormField name="knowledgeBase" control={form.control} render={({ field }) => (
                <FormItem >
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select knowledge base" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Kajal">Kajal (default voice)</SelectItem>
                        <SelectItem value="Alternative">Alternative voice</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )} />
            </div>
          </div>
          <div className='w-1/4 space-x-1'>
              <FormField name="action" control={form.control} render={({ field }) => (
                <FormItem >
                  <FormLabel>Actions</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select actions" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Kajal">book_appointment</SelectItem>
                      <SelectItem value="Alternative">get_slot</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )} />
            </div>
          <Button variant="ghost" size='lg' type="submit">Save Settings</Button>
        </form>
      </Form>
    </div>
  );
};

export default MeetingAssistant;
