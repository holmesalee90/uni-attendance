document.getElementById("absenceForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    // [Previous form handling code remains the same until the fetch call...]

    try {
        // CORRECTED URL (removed duplicate auth)
        const response = await fetch(
            "https://uni-attendance-api-eastus-2.azurewebsites.net/api/ProcessAbsence2", // Removed ?code=...
            {
                method: "POST",
                body: JSON.stringify({
                    studentId: studentId,
                    reason: reason
                }),
                headers: { 
                    "Content-Type": "application/json"
                    // REMOVED: "X-Azure-Functions-Key" (use either this OR code parameter)
                }
            }
        );

        // [Rest of your code remains the same...]
    }
});
