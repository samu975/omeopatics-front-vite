import NavBar from '../../../../components/NavBar'

interface TestHeaderProps {
  title: string;
  description?: string;
}

const TestHeader: React.FC<TestHeaderProps> = ({ title, description }) => {
  return (
    <div className='min-h-screen'>
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl font-bold text-gray-800 mb-6">
                {title}
              </h2>
              {description && (
                <p className="text-gray-600 mb-4">
                  {description}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TestHeader 