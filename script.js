// Parse URL parameters
function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        identifier: params.get('rid') || params.get('identifier') || 'N/A'
    };
}

// Initialize page with parameters
function initializePage() {
    const params = getUrlParams();
    
    document.getElementById('identifier').textContent = params.identifier;
    
    // Log parameters for debugging
    console.log('Survey initialized with identifier:', params.identifier);
}

// Complete survey and redirect to thank you page
function completeSurvey(status) {
    const params = getUrlParams();
    
    // Validate required parameters
    if (!params.identifier || params.identifier === 'N/A') {
        alert('Error: Missing identifier. Cannot complete survey.');
        return;
    }
    
    // Build thank you page URL with status and identifier
    const baseUrl = "http://localhost:5173";
    const thankYouUrl = `${baseUrl}/survey/thank-you?status=${status}&identifier=${params.identifier}`;
    
    console.log('Completing survey with status:', status);
    console.log('Redirecting to:', thankYouUrl);
    
    // Add a small delay to show the button press effect
    setTimeout(() => {
        window.location.href = thankYouUrl;
    }, 300);
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initializePage);

// Add keyboard shortcuts for testing
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case '1':
                e.preventDefault();
                completeSurvey('COMPLETED');
                break;
            case '2':
                e.preventDefault();
                completeSurvey('QUOTAFULL');
                break;
            case '3':
                e.preventDefault();
                completeSurvey('QUALITY');
                break;
            case '4':
                e.preventDefault();
                completeSurvey('TERMINATED');
                break;
        }
    }
});

// Add visual feedback
document.querySelectorAll('.status-btn').forEach(btn => {
    btn.addEventListener('mousedown', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    btn.addEventListener('mouseup', function() {
        this.style.transform = 'translateY(-4px)';
    });
});
