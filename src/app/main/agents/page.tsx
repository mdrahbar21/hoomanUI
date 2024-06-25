"use client"
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Sidebar from "@/components/sidebar/side";
import { AppStateContext } from '@/components/contexts/contextProvider';

export default function AgentSelector() {
  const [agents, setAgents] = useState<any[]>([]);
  const  {activeMenu} = AppStateContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/firestore/collections/agents', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        setAgents(data);
      } catch (error) {
        console.error('Error fetching agents:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className='flex flex-wrap w-full bg-black items-stretch'>
        {agents.map(agent => (
          <div key={agent._ref._path.segments[1]} className='w-1/4 p-2 flex'>  
            <Card className='flex flex-col w-full'>
              <CardHeader>
                <CardTitle>{agent._ref._path.segments[1]}</CardTitle>  
              </CardHeader>
              <CardContent className='flex-grow'>
                <CardDescription>
                  Agent ID: {agent._ref._path.segments[1]} 
                </CardDescription>
                <CardDescription>
                  LLM Provider: {agent._fieldsProto.llmProvider?.stringValue ?? agent._fieldsProto.llmconfig?.mapValue.fields.provider.stringValue ?? agent._fieldsProto.llmConfig?.mapValue.fields.model.stringValue}
                </CardDescription>
              </CardContent>
              <CardFooter>
                {/* Add any action buttons or additional info here */}
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </>
  );
}
