# Test Client Survey

This is a dummy client survey interface for testing the survey flow.

## Files
- `client-survey.html` - Main HTML page with survey interface
- `styles.css` - Styling for the survey page
- `script.js` - JavaScript for handling button clicks and redirects

## How to Use

1. Start your survey from the welcome page with a valid `v_Id` parameter
2. The system will redirect to this test client survey with parameters:
   - `rid` (respondent identifier)
   - `v_id` (vendor ID)
   - `project_id` (project ID)

3. Click any of the 4 status buttons to simulate survey completion:
   - **Complete** - Survey completed successfully (COMPLETED)
   - **Quota Full** - Target responses reached (QUOTAFULL)
   - **Quality Issue** - Failed quality checks (QUALITY)
   - **Terminated** - Survey terminated early (TERMINATED)

4. The page will redirect back to the thank you page with the selected status

## Keyboard Shortcuts (for quick testing)
- `Ctrl/Cmd + 1` - Complete
- `Ctrl/Cmd + 2` - Quota Full
- `Ctrl/Cmd + 3` - Quality Issue
- `Ctrl/Cmd + 4` - Terminated

## Testing Locally

Open `client-survey.html` in a browser with test parameters:
```
file:///path/to/test/client-survey.html?rid=test123&v_id=1&project_id=abc123
```

Or serve it with a local server and configure your project's `clientLink` to point to:
```
http://localhost:3000/test/client-survey.html
```
