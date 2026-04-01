import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import {useEffect } from "react";
import Chat from "./components/chatbot/Chat";

function Dashboard() {
    const navigate = useNavigate();

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activePage, setActivePage] = useState("home");

    const [tasks, setTasks] = useState([]);
    const [taskInput, setTaskInput] = useState("");

    const [subject, setSubject] = useState("");
    const [plan, setPlan] = useState("");

    const [topic, setTopic] = useState("");
    const [result, setResult] = useState("");

    const [chatInput, setChatInput] = useState("");
    const [chatOutput, setChatOutput] = useState([]);

    const [profileName, setProfileName] = useState("Username");
    const [editName, setEditName] = useState("");

    const [avatarModalOpen, setAvatarModalOpen] = useState(false);
    const [logoutModalOpen, setLogoutModalOpen] = useState(false);

    const [avatar, setAvatar] = useState(
        "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
    );

    // ================= SIDEBAR =================
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    const showPage = (page) => {
        setActivePage(page);
        setSidebarOpen(false);
    };
    useEffect(() => {
        const storedName = localStorage.getItem("username");
        const storedAvatar = localStorage.getItem("avatar");

        if (storedName) setProfileName(storedName);
        if (storedAvatar) setAvatar(storedAvatar);
    }, []);

    // ================= TASK =================
    const addTask = () => {
        if (!taskInput.trim()) return;
        setTasks([...tasks, taskInput]);
        setTaskInput("");
    };

    // ================= PLANNER =================
    const planStudy = () => {
        if (!subject) return setPlan("Enter subject");
        setPlan(`Study plan for ${subject}`);
    };

    // ================= ASSISTANT =================
    const explain = () => {
        if (!topic) return;
        setResult(`Explanation for ${topic}`);
    };

    // ================= CHAT =================
    const chat = () => {
        if (!chatInput.trim()) return;

        setChatOutput([
            ...chatOutput,
            { type: "user", text: chatInput },
            { type: "bot", text: "AI reply..." }
        ]);

        setChatInput("");
    };

    // ================= PROFILE =================
    const updateName = () => {
        if (!editName.trim()) return;

        setProfileName(editName);

        // ✅ SAVE TO LOCAL STORAGE
        localStorage.setItem("username", editName);

        setEditName("");
    };

    // ================= AVATAR =================
    const selectAvatar = (type) => {
        let newAvatar = "";

        if (type === "boy") {
            newAvatar = "https://cdn-icons-png.flaticon.com/512/4140/4140037.png";
        } else {
            newAvatar = "https://cdn-icons-png.flaticon.com/512/4140/4140048.png";
        }

        setAvatar(newAvatar);

        // ✅ SAVE
        localStorage.setItem("avatar", newAvatar);

        setAvatarModalOpen(false);
    };
    
    // ================= LOGOUT =================
    const confirmLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <div className="app-container">

            {/* ================= NAVBAR ================= */}
            <div className="navbar">
                <div className="left-nav">
                    <span className="menu-btn" onClick={toggleSidebar}>☰</span>
                    <h2>EduMate AI</h2>
                </div>

                <div className="profile-box" onClick={() => setAvatarModalOpen(true)}>
                    <div id="profileCircle">
                        <img src={avatar} alt="avatar" />
                    </div>
                    <span id="userDisplay">{profileName}</span>
                </div>
            </div>

            {/* ================= SIDEBAR ================= */}
            <div className={`sidebar ${sidebarOpen ? "show" : ""}`}>
                <a onClick={() => showPage("home")}>🏠 Dashboard</a>
                <a onClick={() => showPage("tasks")}>📋 Tasks</a>
                <a onClick={() => showPage("planner")}>📅 Study Planner</a>
                <a onClick={() => showPage("assistant")}>🧠 Study Assistant</a>
                <a onClick={() => showPage("chatbot")}>💬 Chatbot</a>
                <a onClick={() => showPage("profile")}>👤 Profile</a>
                <a onClick={() => setLogoutModalOpen(true)}>🚪 Logout</a>
            </div>

            {/* ================= MAIN ================= */}
            <div className="main">
                {activePage === "home" && (
                    <div >
                        <h2 className="dashboard-title">Dashboard</h2>

                  

                        <div className="card-container">
                            <div className="card" onClick={() => showPage("tasks")}>📋 Tasks</div>
                            <div className="card" onClick={() => showPage("planner")}>📅 Planner</div>
                            <div className="card" onClick={() => showPage("assistant")}>🧠 Assistant</div>
                            <div className="card" onClick={() => showPage("chatbot")}>💬 Chatbot</div>
                        </div>
                    </div>
                )}

                {/* TASKS */}
                {activePage === "tasks" && (
                    <div>
                        <h2>Task Manager</h2>

                        <input
                            value={taskInput}
                            onChange={(e) => setTaskInput(e.target.value)}
                            placeholder="Enter task"
                        />

                        <button onClick={addTask}>Add</button>

                        <ul>
                            {tasks.map((t, i) => <li key={i}>{t}</li>)}
                        </ul>
                    </div>
                )}

                {/* PLANNER */}
                {activePage === "planner" && (
                    <div>
                        <h2>Study Planner</h2>

                        <input
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            placeholder="Subject"
                        />

                        <button onClick={planStudy}>Generate</button>
                        <p>{plan}</p>
                    </div>
                )}

                {/* ASSISTANT */}
                {activePage === "assistant" && (
                    <div>
                        <h2>Study Assistant</h2>

                        <input
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                        />

                        <button onClick={explain}>Explain</button>
                        <p>{result}</p>
                    </div>
                )}

                {/* CHATBOT */}
                {activePage === "chatbot" && (
                    <div>
                        <h2>Chatbot</h2>

                        <Chat />
                    </div>
                )}

                {/* PROFILE */}
                {activePage === "profile" && (
                    <div className="profile-card">

                        <div className="profile-avatar">
                            <img src={avatar} alt="profile" />
                        </div>

                        <h3>{profileName}</h3>
                        <p>Joined: --</p>

                        <input
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            placeholder="Edit name"
                        />

                        <button onClick={updateName}>Update Name</button>

                        <div className="profile-stats">
                            <div>
                                <h4>{tasks.length}</h4>
                                <p>Tasks</p>
                            </div>
                            <div>
                                <h4>Active</h4>
                                <p>Status</p>
                            </div>
                        </div>

                    </div>
                )}
            </div>

            {/* ================= AVATAR MODAL ================= */}
            {avatarModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Select Avatar</h3>

                        <div className="avatar-options">
                            <img src="https://cdn-icons-png.flaticon.com/512/4140/4140037.png"
                                onClick={() => selectAvatar("boy")} />

                            <img src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
                                onClick={() => selectAvatar("girl")} />
                        </div>

                        <button onClick={() => setAvatarModalOpen(false)}>Close</button>
                    </div>
                </div>
            )}

            {/* ================= LOGOUT MODAL ================= */}
            {logoutModalOpen && (
                <div className="logout-modal">
                    <div className="logout-box">
                        <h3>Are you sure you want to logout?</h3>

                        <div className="logout-buttons">
                            <button className="yes-btn" onClick={confirmLogout}>Yes</button>
                            <button className="no-btn" onClick={() => setLogoutModalOpen(false)}>No</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default Dashboard;