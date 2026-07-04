import { SubmitForm } from "./SubmitForm";

export default function SubmitPage() {
    return (
        <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px' }}>
            <div className="max-w-3xl mx-auto px-6">
                <div className="text-center mb-12">
                    <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: 'var(--text-primary)', marginBottom: '16px' }}>
                        Submit an Article
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                        Share your engineering ideas and tech insights with the community.
                    </p>
                </div>
                
                <SubmitForm />
            </div>
        </div>
    );
}
