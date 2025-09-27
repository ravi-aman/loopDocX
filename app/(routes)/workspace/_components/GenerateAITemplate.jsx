import { Button } from '@/components/ui/button'
import { LayoutGrid, Loader2Icon } from 'lucide-react'
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Input } from '@/components/ui/input';
// Removed Google AI import to prevent API calls

// Fallback template generator
const generateFallbackTemplate = (userInput) => {
  const input = userInput.toLowerCase();
  const templates = {
    'government exam': {
      "time": Date.now(),
      "blocks": [
        {
          "id": "header1",
          "type": "header",
          "data": {
            "text": "Government Exam Preparation Guide",
            "level": 1
          }
        },
        {
          "id": "para1",
          "type": "paragraph",
          "data": {
            "text": "This comprehensive guide will help you prepare systematically for your government exam."
          }
        },
        {
          "id": "header2",
          "type": "header",
          "data": {
            "text": "Study Schedule",
            "level": 2
          }
        },
        {
          "id": "list1",
          "type": "list",
          "data": {
            "style": "ordered",
            "items": [
              "General Knowledge - 2 hours daily",
              "Current Affairs - 1 hour daily",
              "Reasoning & Aptitude - 2 hours daily",
              "English/Language - 1 hour daily",
              "Mock Tests - 1 hour daily"
            ]
          }
        },
        {
          "id": "header3",
          "type": "header",
          "data": {
            "text": "Important Topics",
            "level": 2
          }
        },
        {
          "id": "list2",
          "type": "list",
          "data": {
            "style": "unordered",
            "items": [
              "Indian Constitution",
              "History & Culture",
              "Geography",
              "Economics",
              "Science & Technology",
              "Current Events"
            ]
          }
        }
      ],
      "version": "2.8.1"
    },
    'project': {
      "time": Date.now(),
      "blocks": [
        {
          "id": "header1",
          "type": "header",
          "data": {
            "text": userInput || "Project Plan",
            "level": 1
          }
        },
        {
          "id": "header2",
          "type": "header",
          "data": {
            "text": "Project Overview",
            "level": 2
          }
        },
        {
          "id": "para1",
          "type": "paragraph",
          "data": {
            "text": "Brief description of the project goals and objectives."
          }
        },
        {
          "id": "header3",
          "type": "header",
          "data": {
            "text": "Tasks & Milestones",
            "level": 2
          }
        },
        {
          "id": "list1",
          "type": "list",
          "data": {
            "style": "ordered",
            "items": [
              "Planning phase",
              "Development phase",
              "Testing phase",
              "Deployment phase"
            ]
          }
        }
      ],
      "version": "2.8.1"
    },
    'meeting': {
      "time": Date.now(),
      "blocks": [
        {
          "id": "header1",
          "type": "header",
          "data": {
            "text": "Meeting Notes",
            "level": 1
          }
        },
        {
          "id": "para1",
          "type": "paragraph",
          "data": {
            "text": "Date: " + new Date().toLocaleDateString()
          }
        },
        {
          "id": "header2",
          "type": "header",
          "data": {
            "text": "Agenda",
            "level": 2
          }
        },
        {
          "id": "list1",
          "type": "list",
          "data": {
            "style": "ordered",
            "items": [
              "Opening remarks",
              "Main discussion points",
              "Action items",
              "Next steps"
            ]
          }
        }
      ],
      "version": "2.8.1"
    },
    'default': {
      "time": Date.now(),
      "blocks": [
        {
          "id": "header1",
          "type": "header",
          "data": {
            "text": userInput || "Document Template",
            "level": 1
          }
        },
        {
          "id": "para1",
          "type": "paragraph",
          "data": {
            "text": `This is a template for ${userInput || 'your document'}. You can start editing and adding content here.`
          }
        },
        {
          "id": "header2",
          "type": "header",
          "data": {
            "text": "Getting Started",
            "level": 2
          }
        },
        {
          "id": "list1",
          "type": "list",
          "data": {
            "style": "unordered",
            "items": [
              "Add your main points here",
              "Organize your thoughts",
              "Include relevant details"
            ]
          }
        }
      ],
      "version": "2.8.1"
    }
  };

  // Smart template selection based on keywords
  if (input.includes('government') || input.includes('exam')) {
    return templates['government exam'];
  } else if (input.includes('project') || input.includes('plan')) {
    return templates['project'];
  } else if (input.includes('meeting') || input.includes('notes')) {
    return templates['meeting'];
  } else {
    return templates['default'];
  }
};


function GenerateAITemplate({setGenerateAIOutput}) {

    const [open,setOpen]=useState(false);
    const [userInput,setUserInput]=useState();
    const [loading,setLoading]=useState(false);

    const GenerateFromAI=async()=>{
        setLoading(true);
        // Use only local template generation - no API calls
        setTimeout(() => {
            const fallbackTemplate = generateFallbackTemplate(userInput);
            setGenerateAIOutput(fallbackTemplate);
            setOpen(false);
            setLoading(false);
        }, 1000); // Simulate loading time for better UX
    }

  return (
    <div>
        <Button variant="outline" className="flex gap-2"
        onClick={()=>setOpen(true)}>
        <LayoutGrid className='h-4 w-4'/> Generate AI Template</Button>

        <Dialog open={open}>

            <DialogContent>
                <DialogHeader>
                <DialogTitle>Generate AI Template</DialogTitle>
                <DialogDescription>
                    <div>
                    <h2 className='mt-5'>What you want to write in document?</h2>
                    <Input placeholder="Ex. Project Idea"
                        onChange={(event)=>setUserInput(event?.target.value)}
                    />
                    <div className='mt-5 flex gap-5 justify-end'>
                        <Button variant="ghost" onClick={()=>setOpen(false)}>Cancel</Button>
                        <Button variant="outline"
                        disabled={!userInput||loading}
                        onClick={()=>{
                            const fallbackTemplate = generateFallbackTemplate(userInput);
                            setGenerateAIOutput(fallbackTemplate);
                            setOpen(false);
                        }}>
                            Quick Template
                        </Button>
                        <Button variant=""
                        disabled={!userInput||loading}
                        onClick={()=>GenerateFromAI()}>
                            {loading?<Loader2Icon className='animate-spin'/>:'Generate Template'}
                            </Button>

                    </div>
                    </div>
                </DialogDescription>
                </DialogHeader>
            </DialogContent>
            </Dialog>


    </div>
  )
}

export default GenerateAITemplate