import React, { useState } from 'react';
import { 
  Bell, 
  Plus, 
  CheckCircle2, 
  Clock, 
  Trash2, 
  Calendar, 
  AlertCircle,
  Tag
} from 'lucide-react';
import { ReminderTask, ApplicationDraft } from '../types';

interface ReminderPlannerProps {
  reminders: ReminderTask[];
  applications: ApplicationDraft[];
  onSaveReminder: (rem: ReminderTask) => void;
  onDeleteReminder: (id: string) => void;
}

export const ReminderPlanner: React.FC<ReminderPlannerProps> = ({
  reminders,
  applications,
  onSaveReminder,
  onDeleteReminder
}) => {
  const [isAddingNew, setIsAddingNew] = useState<boolean>(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDateTime, setDueDateTime] = useState('');
  const [selectedAppId, setSelectedAppId] = useState('');
  const [priority, setPriority] = useState<'HIGH' | 'MEDIUM' | 'LOW'>('HIGH');

  const handleCreateReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !dueDateTime) return;

    const linkedApp = applications.find(a => a.id === selectedAppId);

    const newRem: ReminderTask = {
      id: `rem-${Date.now()}`,
      citizenId: 'citizen-demo-01',
      applicationId: selectedAppId || undefined,
      schemeTitle: linkedApp?.schemeTitle,
      title: title.trim(),
      description: description.trim(),
      dueDateTime: new Date(dueDateTime).toISOString(),
      isCompleted: false,
      priority,
      createdAt: new Date().toISOString()
    };

    onSaveReminder(newRem);
    setTitle('');
    setDescription('');
    setDueDateTime('');
    setSelectedAppId('');
    setIsAddingNew(false);
  };

  const handleToggleComplete = (rem: ReminderTask) => {
    onSaveReminder({ ...rem, isCompleted: !rem.isCompleted });
  };

  return (
    <div className="space-y-6 text-[#ECFDF5] selection:bg-[#F59E0B] selection:text-black font-sans">
      {/* Header - Dark Olive & Amber */}
      <div className="bg-[#1A2E05] border border-[#F59E0B]/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#365314] text-[#F59E0B] text-xs font-bold border border-[#F59E0B]/30">
          <Bell className="w-3.5 h-3.5 text-[#F59E0B]" />
          <span>FOLLOW-UP & REMINDER PLANNER</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-white">
          Follow-Up Tasks & Reminders
        </h2>

        <p className="text-xs sm:text-sm text-[#D9F99D] leading-relaxed max-w-2xl">
          Never miss a government scheme renewal, certificate update, or verification window.
        </p>

        <button
          onClick={() => setIsAddingNew(!isAddingNew)}
          className="px-4 py-2.5 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-black font-black text-xs inline-flex items-center space-x-1.5 shadow-lg transition cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Follow-up Task</span>
        </button>
      </div>

      {/* Add Form */}
      {isAddingNew && (
        <form onSubmit={handleCreateReminder} className="bg-[#1A2E05] border border-[#F59E0B]/40 rounded-2xl p-5 shadow-2xl space-y-4 text-xs text-white">
          <h3 className="font-bold text-sm text-[#F59E0B] flex items-center space-x-1.5">
            <Plus className="w-4 h-4" />
            <span>Create New Reminder Task</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2 space-y-1">
              <label className="font-bold text-white block">Reminder Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Visit Tahsildar office for Income Certificate renewal"
                className="w-full px-3 py-2 rounded-xl bg-[#365314] border border-[#F59E0B]/40 text-xs text-white focus:outline-none focus:border-[#F59E0B]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-white block">Due Date & Time *</label>
              <input
                type="datetime-local"
                required
                value={dueDateTime}
                onChange={(e) => setDueDateTime(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#365314] border border-[#F59E0B]/40 text-xs text-white focus:outline-none focus:border-[#F59E0B]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-white block">Priority Level</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-[#365314] border border-[#F59E0B]/40 text-xs text-white focus:outline-none focus:border-[#F59E0B]"
              >
                <option value="HIGH">High Priority</option>
                <option value="MEDIUM">Medium Priority</option>
                <option value="LOW">Low Priority</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAddingNew(false)}
              className="px-4 py-2 rounded-xl bg-[#365314] text-white font-bold border border-[#F59E0B]/30"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#F59E0B] text-black font-black hover:bg-[#D97706]"
            >
              Save Task
            </button>
          </div>
        </form>
      )}

      {/* REMINDERS LIST */}
      <div className="space-y-3">
        {reminders.length > 0 ? (
          reminders.map((rem) => (
            <div
              key={rem.id}
              className={`p-4 rounded-2xl border transition flex items-center justify-between gap-4 text-xs shadow-xl ${
                rem.isCompleted
                  ? 'bg-[#1A2E05] border-[#365314] opacity-75'
                  : 'bg-[#1A2E05] border-[#F59E0B]/40 hover:border-[#F59E0B]'
              }`}
            >
              <div className="flex items-start space-x-3">
                <button
                  onClick={() => handleToggleComplete(rem)}
                  className={`mt-0.5 p-1 rounded-lg transition cursor-pointer ${
                    rem.isCompleted ? 'bg-[#F59E0B] text-black' : 'border border-[#F59E0B]/40 text-white'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                </button>

                <div className="space-y-0.5">
                  <h4 className={`font-bold text-sm ${rem.isCompleted ? 'line-through text-[#D9F99D]' : 'text-white'}`}>
                    {rem.title}
                  </h4>
                  {rem.description && <p className="text-xs text-[#D9F99D]">{rem.description}</p>}
                  <p className="text-[11px] text-[#F59E0B] font-bold">Due: {new Date(rem.dueDateTime).toLocaleString()}</p>
                </div>
              </div>

              <button
                onClick={() => onDeleteReminder(rem.id)}
                className="p-2 rounded-lg bg-rose-950 text-rose-300 hover:bg-rose-900 transition cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        ) : (
          <div className="bg-[#1A2E05] border border-[#F59E0B]/40 p-8 rounded-2xl text-center space-y-2 text-xs text-[#D9F99D]">
            <Bell className="w-8 h-8 text-[#F59E0B] mx-auto" />
            <p className="font-bold text-white">No Reminders Scheduled</p>
            <p>Click "New Follow-up Task" above to add your first reminder.</p>
          </div>
        )}
      </div>
    </div>
  );
};
