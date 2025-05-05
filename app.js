document.getElementById("absenceForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    // Get form values
    const studentId = document.getElementById("studentId").value;
    const reason = document.getElementById("reason").value;

    // Validate inputs
    if (!studentId || !reason) {
        alert("Please fill in all fields");
        return;
    }

    try {
        const response = await fetch(
            "https://uni-attendance-api-eastus-2.azurewebsites.net/api/ProcessAbsence2",
            {
                method: "POST",
                body: JSON.stringify({
                    studentId: studentId,
                    reason: reason
                }),
                headers: { 
                    "Content-Type": "application/json"
                }
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        
        // Display success message
        document.getElementById("responseMessage").textContent = "Absence submitted successfully!";
        document.getElementById("responseMessage").style.color = "green";
        
        // Reset form
        document.getElementById("absenceForm").reset();
        
    } catch (error) {
        console.error("Submission failed:", error);
        
        // Display error message
        document.getElementById("responseMessage").textContent = `Error: ${error.message}`;
        document.getElementById("responseMessage").style.color = "red";
    }
});
