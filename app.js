document.getElementById("absenceForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    // Show loading state
    const responseMessage = document.getElementById("responseMessage");
    responseMessage.textContent = "Submitting...";
    responseMessage.className = "";
    
    try {
        const studentId = document.getElementById("studentId").value.trim();
        const reason = document.getElementById("reason").value.trim();
        
        if (!studentId || !reason) {
            throw new Error("Please fill in all fields");
        }

        // REPLACE WITH YOUR ACTUAL FUNCTION URL AND KEY
        const functionUrl = "https://uni-attendance-api-eastus-2.azurewebsites.net/api/ProcessAbsence2";
        const functionKey = "yPVGBRzdsjRFZ55qxIJKY60fW1VvUTaBCncKa-QFA2ddAzFugacuOQ=="; // Get from Azure Portal
        
        const response = await fetch(`${functionUrl}?code=${functionKey}`, {
            method: "POST",
            body: JSON.stringify({ studentId, reason }),
            headers: { "Content-Type": "application/json" }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        
        // Show success
        responseMessage.textContent = "Absence submitted successfully!";
        responseMessage.className = "success";
        
        // Reset form
        document.getElementById("absenceForm").reset();
        
    } catch (error) {
        console.error("Error:", error);
        responseMessage.textContent = `Error: ${error.message}`;
        responseMessage.className = "error";
    }
});
