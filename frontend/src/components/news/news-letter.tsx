"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

export default function NewsLetter() {
    const [email, setEmail] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        
        // Здесь будет логика отправки email
        setTimeout(() => {
            console.log("Email submitted:", email)
            setEmail("")
            setIsSubmitting(false)
        }, 1000)
    }

    return (
        <div className="relative w-full h-[400px] rounded-xl overflow-hidden shadow-lg mt-10 mb-20">
            {/* Background Image */}
            <Image
                src="/Panorama(sharyn).jpg"
                alt="Background"
                fill
                className="object-cover"
                priority
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50" />
            
            {/* Content */}
            <div className="relative z-10 flex items-center justify-center h-full px-6">
                <div className="max-w-2xl w-full text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Жаңалықтарға жазылыңыз
                    </h2>
                    <p className="text-white/90 text-lg mb-8 leading-relaxed">
                        Біз сізге ең жаңа жаңалықтар мен маңызды ақпараттарды жіберетінміз. 
                        Қазақ халқының тарихы мен мәдениеті туралы соңғы жаңалықтарды алғашқы болып біліңіз.
                    </p>
                    
                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <Input
                            type="email"
                            placeholder="Электрондық поштаңызды енгізіңіз"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="flex-1 bg-white/95 backdrop-blur-sm border-white/20 text-gray-900 placeholder:text-gray-600 focus:bg-white focus:border-primary"
                        />
                        <Button 
                            type="submit"
                            disabled={isSubmitting}
                            className="px-8 py-2 bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all duration-200 hover:shadow-lg hover:scale-105"
                        >
                            {isSubmitting ? "Жіберілуде..." : "Жазылу"}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}