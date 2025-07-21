interface ProgressBarProps {
  progress: number;
  label: string;
  showPercentage?: boolean;
  color?: 'primary' | 'secondary' | 'success' | 'warning';
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  progress, 
  label, 
  showPercentage = true,
  color = 'primary'
}) => {
  const colorClasses = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    success: 'bg-success',
    warning: 'bg-warning'
  }

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        {showPercentage && (
          <span className="text-sm font-medium text-gray-700">
            {Math.round(progress)}%
          </span>
        )}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className={`${colorClasses[color]} h-2.5 rounded-full transition-all duration-300`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  )
}

export default ProgressBar 