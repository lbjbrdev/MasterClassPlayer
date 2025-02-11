import { useEffect } from 'react';

import { Header } from '../components/Header';
import { Video as VideoUI } from '../components/Video';
import { Module } from '../components/Module';

import { useAppSelector } from '../store';

import { useCurrentLesson } from '../hooks/useCurrentLesson';

export function Player() {
    const modules = useAppSelector(state => state.player.course.modules);

    const { currentLesson } = useCurrentLesson();

    useEffect(() => {
        document.title = `Assistindo: ${currentLesson.title}`;
    }, [currentLesson]);

    return (
        <div className="h-screen bg-zinc-950 text-zinc-50 flex justify-center items-center">
            <div className="flex w-[1100px] flex-col gap-6">
                <Header />

                <main className='relative flex overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 shadow pr-80'>
                    <div className='flex-1'>
                        <VideoUI />
                    </div>

                    <aside className='w-80 absolute top-0 bottom-0 right-0 border-l divide-y-2 divide-zinc-900 border-zinc-800 bg-zinc-900 overflow-y-scroll scrollbar scrollbar-thin scrollbar-track-zinc-950 scrollbar-thumb-zinc-800'>
                        {modules.map((module, index) => (
                            <Module
                                key={module.id}
                                moduleIndex={index}
                                title={module.title}
                                amountOfLessons={module.lessons.length}
                            />
                        ))}
                    </aside>
                </main>
            </div>
        </div>
    );
};