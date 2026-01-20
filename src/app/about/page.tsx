import { Github, Linkedin, Mail, Instagram } from "lucide-react";

export const metadata = {
    title: "About | Justin Jacob Saju",
    description: "Learn more about Justin Jacob Saju, an Engineering Student at SRM IST KTR.",
};

const skills = [
    "Embedded Systems", "VLSI Design", "5G Communications", "IoT",
    "React / Next.js", "Python", "C/C++", "Verilog"
];

export default function AboutPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 px-6 bg-background">
            <div className="max-w-4xl mx-auto">

                {/* Profile Header */}
                <div className="text-center mb-16">
                    <div className="relative w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-accent-purple to-accent-blue p-1 shadow-[0_0_30px_rgba(124,58,237,0.4)]">
                        <div className="w-full h-full rounded-full bg-midnight overflow-hidden flex items-center justify-center">
                            {/* Replace with your actual image later */}
                            <span className="text-4xl">👨‍💻</span>
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-accent-pink to-accent-purple bg-clip-text text-transparent inline-block">
                            Justin Jacob Saju
                        </span>
                    </h1>
                    <p className="text-xl text-foreground-muted font-light mb-8">
                        Engineering Student @ SRM IST KTR
                    </p>

                    <div className="flex justify-center gap-4">
                        <a href="https://github.com/justinsaju21" target="_blank" className="p-3 rounded-full bg-midnight-light hover:bg-accent-purple/20 hover:text-accent-cyan transition-colors"><Github size={20} /></a>
                        <a href="https://www.linkedin.com/in/justin-jacob-saju-742b28270/" target="_blank" className="p-3 rounded-full bg-midnight-light hover:bg-accent-purple/20 hover:text-accent-cyan transition-colors"><Linkedin size={20} /></a>
                        <a href="https://instagram.com/justinnnn_21" target="_blank" className="p-3 rounded-full bg-midnight-light hover:bg-accent-purple/20 hover:text-accent-cyan transition-colors"><Instagram size={20} /></a>
                        <a href="mailto:justinsaju21@gmail.com" className="p-3 rounded-full bg-midnight-light hover:bg-accent-purple/20 hover:text-accent-cyan transition-colors"><Mail size={20} /></a>
                    </div>
                </div>

                {/* Bio Section */}
                <div className="prose prose-invert prose-lg max-w-none mb-16 px-4 md:px-0">
                    <p className="leading-relaxed text-foreground-muted mb-6">
                        Hello! I&apos;m Justin, a passionate engineering student currently pursuing my degree at
                        <span className="text-accent-cyan font-medium"> SRM Institute of Science and Technology (KTR)</span>.
                    </p>
                    <p className="leading-relaxed text-foreground-muted mb-6">
                        My journey involves exploring the intersection of <span className="text-foreground">hardware and software</span>.
                        I love digging deep into how computers work at the lowest level—from transistor logic in VLSI to
                        real-time constraints in embedded systems.
                    </p>
                    <p className="leading-relaxed text-foreground-muted">
                        When I&apos;m not studying or building circuits, I&apos;m likely writing about
                        <span className="text-foreground"> 5G advancements</span> or tinkering with AI models to optimize hardware workflows.
                    </p>
                </div>

                {/* Skills Grid */}
                <div className="mb-16">
                    <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                        <span className="w-1 h-8 bg-accent-purple rounded-full"></span>
                        Technical Arsenal
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {skills.map((skill) => (
                            <div key={skill} className="p-4 rounded-xl glass hover:border-accent-purple/50 hover:bg-accent-purple/10 transition-all text-center">
                                <span className="text-sm font-medium text-foreground-muted">{skill}</span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </main>
    );
}
