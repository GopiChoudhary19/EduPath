import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { User, QuizResult } from '@/entities/all';

import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Check, ArrowRight, Loader2 } from 'lucide-react';

const quizQuestions = [
    {
        question: "Which of these activities do you enjoy the most?",
        options: [
            { text: "Solving complex puzzles or math problems", trait: "analytical" },
            { text: "Designing, drawing, or creating something new", trait: "creative" },
            { text: "Helping or teaching others", trait: "social" },
            { text: "Building or fixing things with your hands", trait: "technical" },
            { text: "Organizing events or leading a team project", trait: "business" },
        ]
    },
    {
        question: "When faced with a challenge, what is your first instinct?",
        options: [
            { text: "Analyze the data and facts to find a logical solution", trait: "analytical" },
            { text: "Think of an unconventional or innovative approach", trait: "creative" },
            { text: "Discuss it with others to get different perspectives", trait: "social" },
            { text: "Break it down into practical steps and get started", trait: "technical" },
            { text: "Create a plan, delegate tasks, and manage resources", trait: "business" },
        ]
    },
    {
        question: "What kind of work environment do you prefer?",
        options: [
            { text: "A quiet, focused space where I can concentrate on data", trait: "analytical" },
            { text: "A dynamic, expressive studio or workshop", trait: "creative" },
            { text: "A collaborative, team-oriented office", trait: "social" },
            { text: "A hands-on lab, field, or workshop", trait: "technical" },
            { text: "A fast-paced office managing projects and people", trait: "business" },
        ]
    },
    {
        question: "Which school subject did you find most interesting?",
        options: [
            { text: "Mathematics or Physics", trait: "analytical" },
            { text: "Art, Music, or Literature", trait: "creative" },
            { text: "History, Psychology, or Sociology", trait: "social" },
            { text: "Computer Science or Chemistry Lab", trait: "technical" },
            { text: "Economics or Business Studies", trait: "business" },
        ]
    },
    {
        question: "What would you rather create?",
        options: [
            { text: "A detailed financial report or scientific theory", trait: "analytical" },
            { text: "A painting, a song, or a story", trait: "creative" },
            { text: "A community program or a successful team", trait: "social" },
            { text: "A working robot or a piece of software", trait: "technical" },
            { text: "A successful business or a marketing campaign", trait: "business" },
        ]
    }
];

export default function CareerQuizPage() {
    const [step, setStep] = useState(0); // 0: Start, 1: Quiz, 2: Loading, 3: Done
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const navigate = useNavigate();

    const handleAnswer = (trait) => {
        setAnswers(prev => ({ ...prev, [currentQuestion]: trait }));
        if (currentQuestion < quizQuestions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            handleSubmit();
        }
    };

    const handleSubmit = async () => {
        setStep(2); // Loading
        const scores = { analytical: 0, creative: 0, social: 0, technical: 0, business: 0 };
        Object.values(answers).forEach(trait => {
            scores[trait]++;
        });

        const sortedTraits = Object.entries(scores).sort((a, b) => b[1] - a[1]);
        const primaryTrait = sortedTraits[0][0];
        
        const recommendations = {
            analytical: { streams: ["Science (PCM)", "Commerce with Maths"], careers: ["Data Scientist", "Engineer", "Financial Analyst"] },
            creative: { streams: ["Arts", "Humanities", "Fine Arts"], careers: ["Graphic Designer", "Writer", "Architect"] },
            social: { streams: ["Arts", "Psychology", "Sociology"], careers: ["Teacher", "Counselor", "Social Worker"] },
            technical: { streams: ["Science (PCM)", "Vocational IT", "Engineering"], careers: ["Software Developer", "Mechanic", "Electrician"] },
            business: { streams: ["Commerce", "BBA"], careers: ["Manager", "Entrepreneur", "Marketing Specialist"] }
        };

        const recommended = recommendations[primaryTrait];
        
        try {
            const user = await User.me();
            await QuizResult.create({
                user_email: user.email,
                quiz_type: 'aptitude',
                scores: scores,
                recommended_streams: recommended.streams,
                career_suggestions: recommended.careers
            });
            await User.updateMyUserData({
                aptitude_scores: scores,
                recommended_streams: recommended.streams
            });
        } catch (e) {
            console.error("User not logged in or error saving results", e);
        }

        setTimeout(() => {
            setStep(3); // Done
            setTimeout(() => {
                navigate(createPageUrl('Dashboard'));
            }, 2000);
        }, 2000);
    };

    const progress = (currentQuestion / quizQuestions.length) * 100;

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl shadow-2xl">
                <AnimatePresence mode="wait">
                    {step === 0 && (
                        <motion.div key="start" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <CardHeader className="text-center">
                                <CardTitle className="text-3xl font-bold">Discover Your Career Path</CardTitle>
                                <CardDescription className="text-lg">This 5-question quiz will help you find the right stream and career based on your interests.</CardDescription>
                            </CardHeader>
                            <CardContent className="text-center">
                                <Button size="lg" onClick={() => setStep(1)}>
                                    Start Quiz <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            </CardContent>
                        </motion.div>
                    )}

                    {step === 1 && (
                        <motion.div key="quiz" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <CardHeader>
                                <Progress value={progress} className="mb-4" />
                                <CardTitle className="text-2xl">{quizQuestions[currentQuestion].question}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {quizQuestions[currentQuestion].options.map((option, index) => (
                                    <Button
                                        key={index}
                                        variant="outline"
                                        className="w-full h-auto text-left justify-start p-4 text-md"
                                        onClick={() => handleAnswer(option.trait)}
                                    >
                                        {option.text}
                                    </Button>
                                ))}
                            </CardContent>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center p-16 space-y-4">
                            <Loader2 className="w-16 h-16 text-blue-600 animate-spin" />
                            <p className="text-lg text-slate-600">Analyzing your results...</p>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center p-16 space-y-4">
                            <Check className="w-16 h-16 text-green-600" />
                            <CardTitle className="text-2xl">Quiz Complete!</CardTitle>
                            <p className="text-lg text-slate-600">Redirecting to your personalized dashboard...</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Card>
        </div>
    );
}