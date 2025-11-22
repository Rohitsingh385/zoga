interface InputFieldProps {
  label: string;
  type?: string;
  placeholder?: string;
}

export default function InputField({
  label,
  type = "text",
  placeholder,
}: InputFieldProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-slate-900 dark:text-white placeholder:text-slate-400"
      />
    </div>
  );
}
