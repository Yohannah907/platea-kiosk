import React, { useRef, useState } from 'react';
import { ArrowRight, User } from 'lucide-react';
import { PlateaLogo } from '../components/PlateaLogo';

interface LoginPageProps {
  initialStudentId: string;
  onBack: () => void;
  onContinue: (studentId: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  initialStudentId,
  onBack,
  onContinue,
}) => {
  const [studentId, setStudentId] = useState(initialStudentId);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = studentId.trim();
    if (!trimmed) {
      setError('Please enter your Student ID (e.g., 2026-0001).');
      inputRef.current?.focus();
      return;
    }
    setError('');
    onContinue(trimmed);
  };

  return (
    <section
      aria-label="Student Login Page"
      className="mint-grain-surface min-h-screen flex flex-col px-6 py-8 lg:px-12 lg:py-10"
    >
      <div>
        <PlateaLogo
          onBack={onBack}
          backLabel="Back to Welcome Page"
          variant="circle"
        />
      </div>

      <div className="flex-1 flex items-center justify-center py-8">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-[540px] flex flex-col items-center text-center"
        >
          <div className="w-14 h-14 rounded-full border-[1.5px] border-[#0b5a14] flex items-center justify-center mb-4">
            <User className="w-8 h-8 text-[#0b5a14]" strokeWidth={1.6} />
          </div>

          <h1 className="text-[36px] sm:text-[42px] font-medium text-[#0b5a14] leading-tight mb-2">
            Welcome to Platea
          </h1>
          <p className="text-[20px] sm:text-[23px] text-[#0b5a14] mb-8">
            Scan your student ID to order your favorite campus meals.
          </p>

          <div className="w-full max-w-[460px] text-left mb-7">
            <label
              htmlFor="student-id-input"
              className="block text-[21px] text-[#0b5a14] mb-2"
            >
              Student ID
            </label>
            <input
              ref={inputRef}
              id="student-id-input"
              type="text"
              value={studentId}
              onChange={(e) => {
                setStudentId(e.target.value);
                if (error) setError('');
              }}
              placeholder="Enter your Student ID"
              autoComplete="off"
              className="w-full h-[52px] rounded-full bg-white border border-[#7edc86] px-6 text-[20px] text-[#0b5a14] placeholder:text-[#666666] shadow-xs focus:outline-none focus:ring-2 focus:ring-[#073d09]"
            />
            {error && (
              <p role="alert" className="mt-2 text-[17px] text-[#9a1b1b] font-medium px-2">
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-3 w-full max-w-[360px] h-[54px] rounded-full bg-[#073d09] hover:bg-[#0b5a14] text-white text-[22px] sm:text-[24px] uppercase tracking-wide transition-colors cursor-pointer"
          >
            <span>Continue to Menu</span>
            <ArrowRight className="w-6 h-6" strokeWidth={2} />
          </button>

          <button
            type="button"
            onClick={() => onContinue('Guest')}
            className="mt-4 text-[17px] text-[#0b5a14] underline underline-offset-4 hover:text-[#04502a] cursor-pointer bg-transparent border-0"
          >
            Continue as Guest
          </button>

          <p className="mt-8 text-[19px] text-[#0b5a14]">
            Your campus served beautifully.
          </p>
        </form>
      </div>
    </section>
  );
};
