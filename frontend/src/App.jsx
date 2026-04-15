import { useEffect, useState } from 'react'
import './index.css'



function App() {
  const [jobs, setJobs] = useState([])
  const [company, setCompany] = useState('')
  const [position, setPosition] = useState('')
  const [status, setStatus] = useState('Applied')
  const [error, setError] = useState('')
  const [filterStatus, setFilterStatus] = useState("All")

  const loadJobs = () => {
    fetch('http://localhost:3001/api/jobs')
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch(() => setError('Could not load jobs'))
  }

  useEffect(() => {
    loadJobs()
  }, [])

  const handleSubmit = (e) => {
    if (!company.trim() || !position.trim() || !status.trim()) {
      setError("Please fill in all fields.")
      return
    }

    setError('')

    fetch('http://localhost:3001/api/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ company, position, status }),
    })
      .then((res) => res.json())
      .then(() => {
        setCompany('')
        setPosition('')
        setStatus('Applied')
        loadJobs()
      })
      .catch(() => setError('Could not add job'))
  }

  const handleDelete = (id) => {
    fetch(`http://localhost:3001/api/jobs/${id}`, {
      method: 'DELETE',
    })
      .then(() => loadJobs())
      .catch(() => setError('Could not delete job'))
  }

  const handleStatusChange = (id, newStatus) => {
    fetch(`http://localhost:3001/api/jobs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    })
      .then(() => loadJobs())
      .catch(() => setError('Could not update job'))
  }

  const filteredJobs =
  filterStatus === "All"
    ? jobs
    : jobs.filter((job) => job.status === filterStatus)

  return (
    <div className="container">
      <h1 className="title">Job Application Tracker</h1>
      <p className="subtitle">Track your job applications in one place</p>

      <form className="form" onSubmit={handleSubmit}>
        <input
          className="input"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

        <input
          className="input"
          placeholder="Position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />

        <select
          className="select"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Applied">Applied</option>
          <option value="Interested">Interested</option>
          <option value="Interview">Interview</option>
          <option value="Rejected">Rejected</option>
        </select>

        <button className="button">Add Job</button>
      </form>

      {error && <p className="error-message">{error}</p>}

      <div className="filter-bar">
        <label htmlFor="statusFilter">Filter by status: </label>
        <select
          id="statusFilter"
          className="select"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Applied">Applied</option>
          <option value="Interested">Interested</option>
          <option value="Interview">Interview</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>
      <h2>My Applications</h2>

      {filteredJobs.length === 0 ? (
        <p className="empty-message">No applications found for this filter.</p>
      ) : (
        filteredJobs.map((job) => (
          <div key={job.id} className={`card ${job.status.toLowerCase()}`}>
            <h3 className="job-title">{job.company}</h3>
            <p className="job-position">{job.position}</p>

            <div className="actions">
              <select
                className="select"
                value={job.status}
                onChange={(e) => handleStatusChange(job.id, e.target.value)}
              >
                <option value="Applied">Applied</option>
                <option value="Interested">Interested</option>
                <option value="Interview">Interview</option>
                <option value="Rejected">Rejected</option>
              </select>

              <button
                type="button"
                className="delete-btn"
                onClick={() => handleDelete(job.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default App