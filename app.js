document.getElementById("absenceForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    // Get form elements
    const studentIdInput = document.getElementById("studentId");
    const reasonInput = document.getElementById("reason");
    const submitBtn = document.querySelector('#absenceForm button[type="submit"]');
    
    // Validate inputs
    const studentId = studentIdInput.value.trim();
    const reason = reasonInput.value.trim();
    
    if (!studentId || !reason) {
        alert("Please fill all fields!");
        return;
    }

    // Set loading state
    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting...";

    try {
        const response = await fetch(
            "https://uni-attendance-api-eastus-2.azurewebsites.net/api/ProcessAbsence2?code=yPVGBRzdsjRFZ55qxIJKY60fW1VvUTaBCncKa-QFA2ddAzFugacuOQ==",
            {
                method: "POST",
                body: JSON.stringify({
                    studentId: studentId,
                    reason: reason
                }),
                headers: { 
                    "Content-Type": "application/json",
                    "X-Azure-Functions-Key": "yPVGBRzdsjRFZ55qxIJKY60fW1VvUTaBCncKa-QFA2ddAzFugacuOQ=="
                }
            }
        );

        if (!response.ok) {
            const error = await response.text();
            throw new Error(error || "Request failed");
        }

        const result = await response.text();
        alert(result || "Attendance submitted successfully!");
        
        // Clear form on success
        studentIdInput.value = "";
        reasonInput.value = "";
        
    } catch (error) {
        console.error("Submission error:", error);
        alert(`Error: ${error.message}`);
        
    } finally {
        // Reset button
        submitBtn.disabled = false;
        submitBtn.textContent = "Submit";
    }
});
