import React, { useState } from 'react';
import { X, User, GraduationCap, Save, Lock, Eye } from 'lucide-react';
import { StudentProfile, SubjectId } from '../types';
import { FACULTY_PRESETS } from '../data/facultyPresets';
import { SUBJECT_METADATA } from '../data/oauQuestions';

interface StudentProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: StudentProfile | null;
  onSaveProfile: (updated: StudentProfile) => void;
}

export const StudentProfileModal: React.FC<StudentProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSaveProfile,
}) => {
  const [fullName, setFullName] = useState(profile?.fullName || '');
  const [password, setPassword] = useState(profile?.password || '');
  const [showPassword, setShowPassword] = useState(false);
  const [targetCourse, setTargetCourse] = useState(profile?.targetCourse || 'Medicine and Surgery (MBBS)');
  const [targetFaculty, setTargetFaculty] = useState(profile?.targetFaculty || 'Faculty of Clinical Sciences');
  const [jambScore, setJambScore] = useState(profile?.jambScore ?? 280);
  const [selectedSubjects, setSelectedSubjects] = useState<SubjectId[]>(
    profile?.subjectCombination || ['biology', 'chemistry', 'physics', 'aptitude']
  );

  if (!isOpen || !profile) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile({
      ...profile,
      fullName: fullName.trim() || 'Great Ife Scholar',
      password: password.trim() || profile.password || '',
      targetCourse: targetCourse.trim() || 'Medicine and Surgery (MBBS)',
      targetFaculty,
      jambScore: Number(jambScore) || 280,
      subjectCombination: selectedSubjects,
    });
    onClose();
  };

  const handleFacultyChange = (facName: string) => {
    setTargetFaculty(facName);
    const preset = FACULTY_PRESETS.find((p) => p.facultyName === facName);
    if (preset) {
      setSelectedSubjects(preset.defaultSubjects);
      if (preset.courseExamples.length > 0) {
        setTargetCourse(preset.courseExamples[0]);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6 my-8 animate-in zoom-in-95">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-slate-100">
                Candidate Profile Settings
              </h2>
              <p className="text-xs text-slate-500">
                Update candidate credentials, password, and target degree choice
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Full Name */}
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Candidate Full Name:
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Oluwaseun Emmanuel"
              required
              className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100"
            />
          </div>

          {/* Candidate Password */}
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Candidate Login Password:
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Candidate login password"
                className="w-full pl-4 pr-10 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <Eye className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[10px] text-slate-400 mt-0.5">
              Used when signing in to your candidate account on the first page.
            </p>
          </div>

          {/* Target Faculty */}
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
              OAU Faculty:
            </label>
            <select
              value={targetFaculty}
              onChange={(e) => handleFacultyChange(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100"
            >
              {FACULTY_PRESETS.map((preset) => (
                <option key={preset.id} value={preset.facultyName}>
                  {preset.facultyName}
                </option>
              ))}
            </select>
          </div>

          {/* Target Course */}
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Target Degree Course / Department:
            </label>
            <input
              type="text"
              value={targetCourse}
              onChange={(e) => setTargetCourse(e.target.value)}
              placeholder="e.g. Medicine and Surgery (MBBS), Law, Computer Science"
              required
              className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100"
            />
          </div>

          {/* JAMB Score */}
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
              JAMB UTME Score (out of 400):
            </label>
            <input
              type="number"
              min={100}
              max={400}
              value={jambScore}
              onChange={(e) => setJambScore(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl text-xs sm:text-sm font-mono font-bold bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100"
            />
          </div>

          <div className="pt-3">
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-xs sm:text-sm font-extrabold shadow-md flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save & Update Profile</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
