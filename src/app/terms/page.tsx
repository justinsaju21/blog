export default function TermsOfService() {
    return (
        <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px' }}>
            <div className="max-w-3xl mx-auto px-6">
                <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 48, color: 'var(--text-primary)', marginBottom: '2rem' }}>
                    Terms of Service
                </h1>
                
                <div className="prose prose-invert max-w-none" style={{ color: 'var(--text-secondary)' }}>
                    <p className="mb-6">Last updated: {new Date().toLocaleDateString()}</p>
                    
                    <h2 className="text-2xl mt-8 mb-4" style={{ color: 'var(--text-primary)' }}>1. Acceptance of Terms</h2>
                    <p className="mb-6">
                        By accessing or using Echo Blogs, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, then you may not access the service.
                    </p>

                    <h2 className="text-2xl mt-8 mb-4" style={{ color: 'var(--text-primary)' }}>2. User Submissions</h2>
                    <p className="mb-4">
                        By submitting content (articles, stories, images) to Echo Blogs, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, adapt, publish, translate and distribute your content in any existing or future media.
                    </p>
                    <p className="mb-6">
                        You also warrant that you own or have the necessary rights to use and authorize the use of the content you submit.
                    </p>

                    <h2 className="text-2xl mt-8 mb-4" style={{ color: 'var(--text-primary)' }}>3. Intellectual Property</h2>
                    <p className="mb-6">
                        The website and its original content (excluding user-submitted content), features and functionality are and will remain the exclusive property of Echo Blogs and its licensors.
                    </p>

                    <h2 className="text-2xl mt-8 mb-4" style={{ color: 'var(--text-primary)' }}>4. Changes to Terms</h2>
                    <p className="mb-6">
                        We reserve the right, at our sole discretion, to modify or replace these Terms at any time. What constitutes a material change will be determined at our sole discretion.
                    </p>
                </div>
            </div>
        </div>
    );
}
