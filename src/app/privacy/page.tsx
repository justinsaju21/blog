export default function PrivacyPolicy() {
    return (
        <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px' }}>
            <div className="max-w-3xl mx-auto px-6">
                <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 48, color: 'var(--text-primary)', marginBottom: '2rem' }}>
                    Privacy Policy
                </h1>
                
                <div className="prose prose-invert max-w-none" style={{ color: 'var(--text-secondary)' }}>
                    <p className="mb-6">Last updated: {new Date().toLocaleDateString()}</p>
                    
                    <h2 className="text-2xl mt-8 mb-4" style={{ color: 'var(--text-primary)' }}>1. Information We Collect</h2>
                    <p className="mb-4">
                        When you visit Echo Blogs, we may collect certain information about your device, including your web browser, IP address, time zone, and some of the cookies that are installed on your device.
                    </p>
                    <p className="mb-6">
                        Additionally, if you submit an article via our submission form, we collect your name, email address, and any content you provide.
                    </p>

                    <h2 className="text-2xl mt-8 mb-4" style={{ color: 'var(--text-primary)' }}>2. How We Use Your Information</h2>
                    <p className="mb-6">
                        We use the information we collect to communicate with you, evaluate your submissions, and improve our website&apos;s functionality and content.
                    </p>

                    <h2 className="text-2xl mt-8 mb-4" style={{ color: 'var(--text-primary)' }}>3. Analytics</h2>
                    <p className="mb-6">
                        We may use third-party analytics services to help us understand how our visitors use the site. These services may use cookies and other tracking technologies to collect information about your activities on our site.
                    </p>

                    <h2 className="text-2xl mt-8 mb-4" style={{ color: 'var(--text-primary)' }}>4. Contact Us</h2>
                    <p className="mb-6">
                        For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at justinsaju21@gmail.com.
                    </p>
                </div>
            </div>
        </div>
    );
}
