document.getElementById("absenceForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const responseMessage = document.getElementById("responseMessage");
    const submitBtn = document.getElementById("submitBtn");
    
    // Clear previous messages and set loading state
    responseMessage.innerHTML = `
        <span class="message-icon">⏳</span>
        <span>Submitting your absence request...</span>
    `;
    responseMessage.className = "loading";
    responseMessage.style.display = "block";
    submitBtn.disabled = true;

    try {
        // 1. Get and validate form values
        const studentId = document.getElementById("studentId").value.trim();
        const reason = document.getElementById("reason").value.trim();

        if (!studentId) {
            throw new Error("Please enter your Student ID");
        }
        
        if (!reason) {
            throw new Error("Please provide a reason for your absence");
        }

        // 2. Call Azure Function
        const API_URL = "https://uni-attendance-api-eastus-2.azurewebsites.net/api/ProcessAbsence2";
        
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({ 
                studentId, 
                reason 
            })
        });

        // 3. Handle non-JSON responses
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            const text = await response.text();
            throw new Error(text || "Invalid server response");
        }

        const result = await response.json();

        if (!response.ok || !result.success) {
            throw new Error(result.message || "Submission failed");
        }

        // 4. Show success
        responseMessage.innerHTML = `
            <span class="message-icon">✅</span>
            <div>
                <strong>Success!</strong><br>
                ${result.message}<br>
                <small>Student ID: ${result.studentId}</small>
            </div>
        `;
        responseMessage.className = "success";
        
        // Reset form after 3 seconds
        setTimeout(() => {
            document.getElementById("absenceForm").reset();
        }, 3000);

    } catch (error) {
        // 5. Show user-friendly error
        responseMessage.innerHTML = `
            <span class="message-icon">❌</span>
            <div>
                <strong>Error!</strong><br>
                ${error.message.replace("Error: ", "").replace("Database error: ", "")}
            </div>
        `;
        responseMessage.className = "error";
        
        console.error("Full error details:", error);
        
    } finally {
        submitBtn.disabled = false;
    }
});
