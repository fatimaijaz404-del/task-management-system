import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [energyLevel, setEnergyLevel] = useState('low');
  const [dueDate, setDueDate] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await API.get('/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const res = await API.post('/tasks', {
        title,
        description,
        priority,
        energyLevel,
        dueDate: dueDate || null,
      });
      setTasks([res.data, ...tasks]);
      setTitle('');
      setDescription('');
      setPriority('medium');
      setEnergyLevel('low');
      setDueDate('');
    } catch (err) {
      console.error('Error adding task:', err);
    }
  };

  const handleToggleStatus = async (task) => {
    const newStatus = task.status === 'done' ? 'todo' : 'done';
    try {
      const res = await API.put(`/tasks/${task._id}`, { status: newStatus });
      setTasks(tasks.map((t) => (t._id === task._id ? res.data : t)));
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const priorityColors = {
    high: 'bg-red-100 text-red-700 border-red-300',
    medium: 'bg-yellow-100 text-yellow-700 border-yellow-300',
    low: 'bg-green-100 text-green-700 border-green-300',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">My Tasks</h1>
            <p className="text-sm text-gray-500">
              Welcome back, {user?.name || 'there'} 👋
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        <form
          onSubmit={handleAddTask}
          className="bg-white rounded-2xl shadow-md p-6 mb-8"
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Add a New Task
          </h2>
          <input
            type="text"
            placeholder="Task title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
          <textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
            rows="2"
          />
          <div className="flex flex-wrap gap-3">
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>

            <select
              value={energyLevel}
              onChange={(e) => setEnergyLevel(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="low">🔋 Low Energy</option>
              <option value="high">⚡ High Energy</option>
            </select>

            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />

            <button
              type="submit"
              className="flex-1 min-w-[150px] bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg py-2 transition"
            >
              + Add Task
            </button>
          </div>
        </form>

        {loading ? (
          <p className="text-center text-gray-500">Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <div className="text-center bg-white rounded-2xl shadow-md p-10">
            <p className="text-gray-400 text-lg">No tasks yet ✨</p>
            <p className="text-gray-400 text-sm">Add your first task above!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task._id}
                className={`bg-white rounded-xl shadow-sm p-4 flex items-start gap-3 border-l-4 ${
                  task.status === 'done'
                    ? 'border-green-400 opacity-60'
                    : 'border-purple-400'
                }`}
              >
                <input
                  type="checkbox"
                  checked={task.status === 'done'}
                  onChange={() => handleToggleStatus(task)}
                  className="mt-1.5 w-5 h-5 accent-purple-600 cursor-pointer"
                />
                <div className="flex-1">
                  <h3
                    className={`font-semibold text-gray-800 ${
                      task.status === 'done' ? 'line-through' : ''
                    }`}
                  >
                    {task.title}
                  </h3>
                  {task.description && (
                    <p className="text-sm text-gray-500 mt-1">
                      {task.description}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-2 mt-2 items-center">
                    <span
                      className={`inline-block text-xs px-2 py-1 rounded-full border ${
                        priorityColors[task.priority]
                      }`}
                    >
                      {task.priority}
                    </span>

                    <span className="inline-block text-xs px-2 py-1 rounded-full border bg-blue-50 text-blue-600 border-blue-200">
                      {task.energyLevel === 'high' ? '⚡ High Energy' : '🔋 Low Energy'}
                    </span>

                    {task.dueDate && (
                      <span
                        className={`inline-block text-xs px-2 py-1 rounded-full border ${
                          new Date(task.dueDate) < new Date() && task.status !== 'done'
                            ? 'bg-red-50 text-red-600 border-red-200 animate-pulse'
                            : (new Date(task.dueDate) - new Date()) / (1000 * 60 * 60 * 24) <= 1
                            ? 'bg-orange-50 text-orange-600 border-orange-200'
                            : 'bg-gray-50 text-gray-600 border-gray-200'
                        }`}
                      >
                        📅 {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="text-gray-400 hover:text-red-500 transition text-sm"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Dashboard;