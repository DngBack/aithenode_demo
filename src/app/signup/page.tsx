'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface FormData {
  name: string;
  email: string;
  password: string;
  role: 'student' | 'teacher';
  bio: string;
  subjects: string[];
  languages: string[];
  hourlyRate: string;
  availability: Array<{
    day: string;
    startTime: string;
    endTime: string;
  }>;
}

interface ApiResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  error?: string;
}

export default function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    role: 'student',
    bio: '',
    subjects: [''],
    languages: [''],
    hourlyRate: '',
    availability: [{
      day: 'Monday',
      startTime: '09:00',
      endTime: '17:00'
    }]
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Clear form data when component mounts
  useEffect(() => {
    setFormData({
      name: '',
      email: '',
      password: '',
      role: 'student',
      bio: '',
      subjects: [''],
      languages: [''],
      hourlyRate: '',
      availability: [{
        day: 'Monday',
        startTime: '09:00',
        endTime: '17:00'
      }]
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validate required fields for teachers
    if (formData.role === 'teacher') {
      if (!formData.bio || !formData.subjects[0] || !formData.languages[0] || !formData.hourlyRate) {
        setError('Please fill in all required fields for teacher registration');
        setLoading(false);
        return;
      }
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json() as ApiResponse;

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      // Store the token in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Clear form data before redirecting
      setFormData({
        name: '',
        email: '',
        password: '',
        role: 'student',
        bio: '',
        subjects: [''],
        languages: [''],
        hourlyRate: '',
        availability: [{
          day: 'Monday',
          startTime: '09:00',
          endTime: '17:00'
        }]
      });

      // Dispatch auth state change event
      window.dispatchEvent(new Event('authStateChange'));

      // Redirect to the correct profile URL
      router.push(formData.role === 'teacher' ? `/teacher/${data.user.id}` : `/student/${data.user.id}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit} autoComplete="off">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="off"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="off"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="off"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                I am a
              </label>
              <div className="mt-1">
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as 'student' | 'teacher' })}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                </select>
              </div>
            </div>

            {formData.role === 'teacher' && (
              <>
                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                    Bio
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="bio"
                      name="bio"
                      rows={4}
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Tell us about yourself and your teaching experience"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subjects" className="block text-sm font-medium text-gray-700">
                    Subjects You Teach
                  </label>
                  <div className="mt-1">
                    {formData.subjects.map((subject, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={subject}
                          onChange={(e) => {
                            const newSubjects = [...formData.subjects];
                            newSubjects[index] = e.target.value;
                            setFormData({ ...formData, subjects: newSubjects });
                          }}
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          placeholder="e.g., Mathematics, Physics"
                          required
                        />
                        {index === formData.subjects.length - 1 && (
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, subjects: [...formData.subjects, ''] })}
                            className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                          >
                            +
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="languages" className="block text-sm font-medium text-gray-700">
                    Languages You Speak
                  </label>
                  <div className="mt-1">
                    {formData.languages.map((language, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={language}
                          onChange={(e) => {
                            const newLanguages = [...formData.languages];
                            newLanguages[index] = e.target.value;
                            setFormData({ ...formData, languages: newLanguages });
                          }}
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          placeholder="e.g., English, Vietnamese"
                          required
                        />
                        {index === formData.languages.length - 1 && (
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, languages: [...formData.languages, ''] })}
                            className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                          >
                            +
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="hourlyRate" className="block text-sm font-medium text-gray-700">
                    Hourly Rate (USD)
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      id="hourlyRate"
                      name="hourlyRate"
                      value={formData.hourlyRate}
                      onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="e.g., 25"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Availability
                  </label>
                  <div className="mt-1 space-y-2">
                    {formData.availability.map((slot, index) => (
                      <div key={index} className="flex gap-2">
                        <select
                          value={slot.day}
                          onChange={(e) => {
                            const newAvailability = [...formData.availability];
                            newAvailability[index].day = e.target.value;
                            setFormData({ ...formData, availability: newAvailability });
                          }}
                          className="appearance-none block w-1/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                            <option key={day} value={day}>{day}</option>
                          ))}
                        </select>
                        <input
                          type="time"
                          value={slot.startTime}
                          onChange={(e) => {
                            const newAvailability = [...formData.availability];
                            newAvailability[index].startTime = e.target.value;
                            setFormData({ ...formData, availability: newAvailability });
                          }}
                          className="appearance-none block w-1/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        <input
                          type="time"
                          value={slot.endTime}
                          onChange={(e) => {
                            const newAvailability = [...formData.availability];
                            newAvailability[index].endTime = e.target.value;
                            setFormData({ ...formData, availability: newAvailability });
                          }}
                          className="appearance-none block w-1/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => setFormData({
                        ...formData,
                        availability: [...formData.availability, { day: 'Monday', startTime: '09:00', endTime: '17:00' }]
                      })}
                      className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Add Time Slot
                    </button>
                  </div>
                </div>
              </>
            )}

            {error && (
              <div className="text-red-600 text-sm">{error}</div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {loading ? 'Creating account...' : 'Sign up'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Already have an account?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                href="/signin"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 