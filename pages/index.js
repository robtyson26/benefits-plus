import { useState } from "react";

export default function Home() {
  const [userEmail, setUserEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const res = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userEmail, name, message }),
    });

    const data = await res.json();
    if (res.ok) {
      setStatus("Email sent successfully!");
    } else {
      setStatus(`Error: ${data.error}`);
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Get a Detailed Analysis</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ marginBottom: "10px", padding: "10px", width: "80%" }}
        />
        <br />
        <input
          type="email"
          placeholder="Your Email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          required
          style={{ marginBottom: "10px", padding: "10px", width: "80%" }}
        />
        <br />
        <textarea
          placeholder="Enter details for analysis..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          style={{ marginBottom: "10px", padding: "10px", width: "80%" }}
        />
        <br />
        <button type="submit" style={{ padding: "10px 20px", cursor: "pointer" }}>
          Get a Detailed Analysis
        </button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
}
