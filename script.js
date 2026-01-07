// Parse URL parameters
function getUrlParams() {
    const params = new URLSearchParams(window.location.search);

    // Determine endpoint from query param: endpoint=client or endpoint=test
    const rawEndpoint = params.get('endpoint') || 'Client';
    const endpointLc = rawEndpoint.toLowerCase();
    let endpoint = 'Client';
    if (endpointLc === 'test' || endpointLc === 't') {
        endpoint = 'Test';
    } else if (endpointLc === 'client' || endpointLc === 'c') {
        endpoint = 'Client';
    }

    // Normalize c_name (Global or Ind)
    const rawCName = params.get('c_name') || params.get('cname') || '';
    const cnameLc = rawCName.toLowerCase();
    let cName = 'Global';
    if (cnameLc === 'ind' || cnameLc === 'india' || cnameLc === 'in') {
        cName = 'Ind';
    } else if (cnameLc === 'global' || cnameLc === 'glb' || cnameLc === 'g') {
        cName = 'Global';
    }

    return {
        identifier: params.get('rid') || params.get('identifier') || 'N/A',
        endpoint,
        cName
    };
}

// Initialize page with parameters
function initializePage() {
    const params = getUrlParams();
    
    document.getElementById('identifier').textContent = params.identifier;
    const endpointEl = document.getElementById('endpoint');
    if (endpointEl) endpointEl.textContent = params.endpoint;
    const cNameEl = document.getElementById('cname');
    if (cNameEl) cNameEl.textContent = params.cName;
    
    // Log parameters for debugging
    console.log('Survey initialized with identifier:', params.identifier);
    console.log('Source endpoint:', params.endpoint, '| c_name:', params.cName);
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
    // const baseUrl = "http://localhost:5173"; // Change to your client URL
     const baseUrl = "https://survey-client-production.up.railway.app";
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
