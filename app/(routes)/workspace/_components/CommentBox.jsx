
"use client";
import { useThreads } from '@liveblocks/react/suspense';
import React from 'react'
import { Composer, Thread } from "@liveblocks/react-ui";

function CommentBox() {
    try {
        const { threads } = useThreads();
        
        return (
            <div className='w-[300px] h-[350px] shadow-lg 
            rounded-lg overflow-auto z-30 '>
                {threads?.map((thread) => (
                    <Thread key={thread.id} thread={thread} />
                ))}
                <Composer className='z-10'>
                    <Composer.Submit className="btn-primary" style={{ color: "#ffffff" }}>
                        Reply
                    </Composer.Submit>
                </Composer>
            </div>
        )
    } catch (error) {
        console.log('CommentBox error:', error);
        return (
            <div className='w-[300px] h-[350px] shadow-lg 
            rounded-lg overflow-auto z-30 p-4'>
                <p className='text-gray-500'>Comments not available</p>
            </div>
        )
    }
}

export default CommentBox