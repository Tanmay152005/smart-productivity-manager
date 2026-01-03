import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="app">
      <div className="card" id="taskCard">
        <div className="card-header">
          <h1>Smart Productivity Manager</h1>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>

          <p className="subtitle">Tap to type or use the mic</p>
        </div>

        <ul id="taskList" className="task-list"></ul>

        <div id="emptyState" className="empty-state">
          No tasks yet. Add your first one ✨
        </div>

        <div className="input-wrapper">
          <input
            id="taskInput"
            type="text"
            placeholder="Type your task here..."
            autoComplete="off"
          />
          <button id="addBtn" className="primary-btn">
            Add
          </button>
        </div>
      </div>

      <button id="micBtn" className="mic-btn">
        <span className="mic-inner">🎤</span>
        <span id="micLabel" className="mic-label">
          Tap to speak
        </span>
      </button>

      <div id="toast" className="toast"></div>
    </div>
  );
}

export default Dashboard;
