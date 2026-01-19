'use client';

import { 
  Search, 
  X, 
  ChevronDown,
  Check,
  AlertCircle,
  Info,
  CheckCircle,
  Loader2,
} from 'lucide-react';
import { useState, useRef, useEffect, ReactNode } from 'react';

// ============================================================
// Button Component
// ============================================================

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseClasses = 'group inline-flex items-center justify-center gap-2 font-medium rounded-button transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.97] hover:scale-[1.02] hover:-translate-y-0.5';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:from-cyan-400 hover:to-blue-400',
    secondary: 'bg-white/5 border border-white/20 text-ink-primary hover:bg-white/10 hover:border-white/30 hover:shadow-lg hover:shadow-white/5',
    ghost: 'bg-transparent text-ink-secondary hover:bg-white/5 hover:text-ink-primary',
    danger: 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg shadow-red-500/25 hover:shadow-red-500/40 hover:from-red-400 hover:to-pink-400',
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  };
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : icon ? (
        <span className="transition-transform duration-200 group-hover:scale-110">{icon}</span>
      ) : null}
      {children}
    </button>
  );
}

// ============================================================
// Input Component
// ============================================================

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
  icon?: ReactNode;
}

export function Input({
  label,
  error,
  helper,
  icon,
  className = '',
  ...props
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="label">{label}</label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted">
            {icon}
          </div>
        )}
        <input
          className={`input ${icon ? 'pl-10' : ''} ${error ? 'input-error' : ''} ${className}`}
          {...props}
        />
      </div>
      {error && <p className="error-text">{error}</p>}
      {helper && !error && <p className="helper-text">{helper}</p>}
    </div>
  );
}

// ============================================================
// Search Input Component
// ============================================================

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchInput({ 
  value, 
  onChange, 
  placeholder = 'Search...', 
  className = '' 
}: SearchInputProps) {
  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="input pl-10 pr-10"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink-primary"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

// ============================================================
// Select Component
// ============================================================

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
}

export function Select({
  label,
  options,
  value,
  onChange,
  placeholder = 'Select...',
  error,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const selectedOption = options.find(opt => opt.value === value);
  
  return (
    <div className="w-full" ref={ref}>
      {label && <label className="label">{label}</label>}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`input flex items-center justify-between ${error ? 'input-error' : ''}`}
        >
          <span className={selectedOption ? 'text-ink-primary' : 'text-ink-muted'}>
            {selectedOption?.label || placeholder}
          </span>
          <ChevronDown className={`w-4 h-4 text-ink-muted transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-surface-card rounded-card shadow-raised border border-ink-muted/20 max-h-60 overflow-auto">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full px-3 py-2 text-left hover:bg-ink-primary/5 flex items-center justify-between ${
                  option.value === value ? 'bg-accent-focus/10 text-accent-focus' : 'text-ink-primary'
                }`}
              >
                {option.label}
                {option.value === value && <Check className="w-4 h-4" />}
              </button>
            ))}
          </div>
        )}
      </div>
      {error && <p className="error-text">{error}</p>}
    </div>
  );
}

// ============================================================
// Badge Component
// ============================================================

interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'accent';
  size?: 'sm' | 'md';
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Badge({ variant = 'default', size = 'md', children, className = '', onClick }: BadgeProps) {
  const variants = {
    default: 'bg-ink-muted/20 text-ink-secondary',
    success: 'bg-feedback-success/20 text-feedback-success',
    warning: 'bg-feedback-caution/20 text-feedback-caution',
    danger: 'bg-feedback-alert/20 text-feedback-alert',
    accent: 'bg-accent-focus/20 text-accent-focus',
  };
  
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-xs',
  };
  
  const Component = onClick ? 'button' : 'span';
  
  return (
    <Component 
      className={`inline-flex items-center font-medium rounded-tag transform rotate-[-1deg] ${sizes[size]} ${variants[variant]} ${onClick ? 'cursor-pointer hover:opacity-80' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </Component>
  );
}

// ============================================================
// Card Component
// ============================================================

interface CardProps {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
  onClick?: () => void;
}

export function Card({ children, className = '', interactive = false, onClick }: CardProps) {
  const baseClasses = 'bg-surface-card rounded-card shadow-card';
  const interactiveClasses = interactive 
    ? 'cursor-pointer hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200' 
    : '';
  
  return (
    <div 
      className={`${baseClasses} ${interactiveClasses} ${className}`}
      onClick={onClick}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
    >
      {children}
    </div>
  );
}

// ============================================================
// Modal Component
// ============================================================

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export function Modal({ isOpen, onClose, title, children, size = 'md' }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-2xl',
  };
  
  return (
    <>
      <div 
        className="fixed inset-0 bg-ink-primary/50 z-40 animate-fade-in"
        onClick={onClose}
      />
      <div className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-surface-raised rounded-card shadow-raised w-[calc(100%-2rem)] ${sizeClasses[size]} max-h-[90vh] overflow-auto z-50 animate-scale-in`}>
        <div className="p-6">
          {title && (
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-display font-medium">{title}</h3>
              <button 
                onClick={onClose}
                className="p-1 text-ink-muted hover:text-ink-primary transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}
          {children}
        </div>
      </div>
    </>
  );
}

// ============================================================
// Toast Component
// ============================================================

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
}

export function Toast({ message, type = 'info', onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);
  
  const icons = {
    success: <CheckCircle className="w-5 h-5 text-feedback-success" />,
    error: <AlertCircle className="w-5 h-5 text-feedback-alert" />,
    info: <Info className="w-5 h-5 text-feedback-info" />,
  };
  
  const backgrounds = {
    success: 'bg-feedback-success-bg border-l-4 border-feedback-success',
    error: 'bg-feedback-alert-bg border-l-4 border-feedback-alert',
    info: 'bg-feedback-info-bg border-l-4 border-feedback-info',
  };
  
  return (
    <div className={`fixed bottom-4 right-4 z-50 p-4 rounded-card shadow-raised animate-fade-in-up max-w-sm ${backgrounds[type]}`}>
      <div className="flex items-start gap-3">
        {icons[type]}
        <p className="text-sm text-ink-primary flex-1">{message}</p>
        <button onClick={onClose} className="text-ink-muted hover:text-ink-primary">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// ============================================================
// Confidence Meter Component
// ============================================================

interface ConfidenceMeterProps {
  value: number; // 0 to 1
  showLabel?: boolean;
}

export function ConfidenceMeter({ value, showLabel = false }: ConfidenceMeterProps) {
  const percentage = Math.round(value * 100);
  
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-ink-muted/20 rounded-full overflow-hidden">
        <div 
          className="h-full bg-accent-focus rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-xs text-ink-muted w-8">{percentage}%</span>
      )}
    </div>
  );
}

// ============================================================
// Sparkline Component
// ============================================================

interface SparklineProps {
  data: number[];
  height?: number;
  color?: string;
}

export function Sparkline({ data, height = 32, color = 'bg-accent-focus/60' }: SparklineProps) {
  if (data.length === 0) return null;
  
  const max = Math.max(...data);
  const normalizedData = data.map(d => (d / max) * 100);
  
  return (
    <div className="flex items-end gap-0.5" style={{ height }}>
      {normalizedData.map((value, index) => (
        <div
          key={index}
          className={`flex-1 ${color} rounded-t-sm hover:bg-accent-focus transition-colors`}
          style={{ height: `${Math.max(value, 5)}%` }}
        />
      ))}
    </div>
  );
}

// ============================================================
// Empty State Component
// ============================================================

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
  annotation?: string;
}

export function EmptyState({ icon, title, description, action, annotation }: EmptyStateProps) {
  return (
    <div className="text-center py-12 px-4">
      {icon && (
        <div className="w-16 h-16 mx-auto mb-4 text-ink-muted">
          {icon}
        </div>
      )}
      <h3 className="text-xl font-display font-medium text-ink-primary mb-2">{title}</h3>
      <p className="text-ink-secondary max-w-md mx-auto mb-4">{description}</p>
      {action && <div className="mt-4">{action}</div>}
      {annotation && (
        <p className="annotation text-sm mt-4">&ldquo;{annotation}&rdquo;</p>
      )}
    </div>
  );
}

// ============================================================
// Toggle Component
// ============================================================

interface ToggleProps {
  enabled?: boolean;
  checked?: boolean;
  onChange: (value: boolean) => void;
  label?: string;
  description?: string;
}

export function Toggle({ enabled, checked, onChange, label, description }: ToggleProps) {
  const isOn = enabled ?? checked ?? false;
  
  return (
    <label className="flex items-start gap-3 cursor-pointer">
      <button
        type="button"
        role="switch"
        aria-checked={isOn}
        onClick={() => onChange(!isOn)}
        className={`relative w-11 h-6 rounded-full transition-colors ${
          isOn ? 'bg-accent-focus' : 'bg-ink-muted/40'
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
            isOn ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
      {(label || description) && (
        <div className="flex-1">
          {label && <p className="text-sm font-medium text-ink-primary">{label}</p>}
          {description && <p className="text-sm text-ink-secondary">{description}</p>}
        </div>
      )}
    </label>
  );
}

// ============================================================
// Tabs Component
// ============================================================

interface Tab {
  id: string;
  label: string;
  count?: number;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (tabId: string) => void;
}

export function Tabs({ tabs, activeTab, onChange }: TabsProps) {
  return (
    <div className="flex gap-1 border-b border-ink-muted/30">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
            activeTab === tab.id
              ? 'text-accent-focus border-accent-focus'
              : 'text-ink-secondary border-transparent hover:text-ink-primary hover:border-ink-muted/50'
          }`}
        >
          {tab.label}
          {tab.count !== undefined && (
            <span className={`ml-1.5 px-1.5 py-0.5 text-xs rounded-full ${
              activeTab === tab.id ? 'bg-accent-focus/20' : 'bg-ink-muted/20'
            }`}>
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

// ============================================================
// Loading Skeleton
// ============================================================

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div 
      className={`bg-gradient-to-r from-ink-muted/10 via-ink-muted/20 to-ink-muted/10 bg-[length:200%_100%] animate-shimmer rounded ${className}`}
    />
  );
}

// ============================================================
// Usage Rating Stars
// ============================================================

interface UsageRatingProps {
  value?: number;
  onChange?: (value: number) => void;
  readonly?: boolean;
}

export function UsageRating({ value = 0, onChange, readonly = false }: UsageRatingProps) {
  const [hovered, setHovered] = useState(0);
  
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          onClick={() => onChange?.(star)}
          onMouseEnter={() => !readonly && setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          className={`w-5 h-5 transition-colors ${readonly ? 'cursor-default' : 'cursor-pointer'}`}
        >
          <svg
            viewBox="0 0 20 20"
            fill={star <= (hovered || value) ? 'currentColor' : 'none'}
            stroke="currentColor"
            className={star <= (hovered || value) ? 'text-accent-warm' : 'text-ink-muted'}
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </button>
      ))}
    </div>
  );
}
