import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

// Types
interface ButtonProps {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'icon';
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  'aria-label'?: string;
  'aria-current'?: string;
}

interface PaginationButtonProps {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  'aria-label'?: string;
  'aria-current'?: string;
}

interface AdvancedPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
}

interface PaginationDemoState {
  currentPage: number;
  totalPages: number;
}

// Base Button Component
const Button: React.FC<ButtonProps> = ({ 
  variant = 'default', 
  size = 'default', 
  className = '', 
  children, 
  onClick, 
  disabled = false,
  ...props 
}) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  
  const variantClasses = {
    default: "bg-slate-900 text-slate-50 hover:bg-slate-900/90",
    outline: "border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900",
    ghost: "hover:bg-slate-100 hover:text-slate-900",
  };
  
  const sizeClasses = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    icon: "h-10 w-10",
  };
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

// Pagination Button Component
const PaginationButton: React.FC<PaginationButtonProps> = ({ 
  isActive, 
  onClick, 
  children, 
  disabled = false,
  ...props 
}) => (
  <Button
    variant={isActive ? 'default' : 'outline'}
    size="icon"
    className={`w-10 h-10 ${
      isActive 
        ? 'bg-slate-900 text-white border-slate-900' 
        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
    }`}
    onClick={onClick}
    disabled={disabled}
    {...props}
  >
    {children}
  </Button>
);

// Pagination Ellipsis Component
const PaginationEllipsis: React.FC = () => (
  <div className="flex items-center justify-center w-10 h-10">
    <MoreHorizontal className="h-4 w-4 text-slate-400" />
  </div>
);

// Main Pagination Component
const CustomPagination: React.FC<AdvancedPaginationProps> = ({ 
  currentPage, 
  totalPages, 
  onPageChange,
  showFirstLast = true 
}) => {
  type PageNumber = number | 'ellipsis';

  const getPageNumbers = (): PageNumber[] => {
    const pages: PageNumber[] = [];
    
    if (totalPages <= 7) {
      // Show all pages if total is 7 or less
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      if (currentPage <= 4) {
        // Current page is near the beginning
        for (let i = 2; i <= 5; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        // Current page is near the end
        pages.push('ellipsis');
        for (let i = totalPages - 4; i <= totalPages - 1; i++) {
          pages.push(i);
        }
        pages.push(totalPages);
      } else {
        // Current page is in the middle
        pages.push('ellipsis');
        pages.push(currentPage - 1, currentPage, currentPage + 1);
        pages.push('ellipsis');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const handlePageChange = (page: number): void => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const handlePrevious = (): void => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = (): void => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  if (totalPages <= 1) return null;

  const pageNumbers = getPageNumbers();

  return (
    <nav className="flex items-center justify-center space-x-1" role="navigation" aria-label="Pagination">
      {/* Previous Button */}
      <Button
        variant="outline"
        size="icon"
        className="w-10 h-10 bg-white border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handlePrevious}
        disabled={currentPage === 1}
        aria-label="Go to previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {/* Page Numbers */}
      {pageNumbers.map((page, index) => {
        if (page === 'ellipsis') {
          return <PaginationEllipsis key={`ellipsis-${index}`} />;
        }

        return (
          <PaginationButton
            key={page}
            isActive={page === currentPage}
            onClick={() => handlePageChange(page)}
            aria-label={`Go to page ${page}`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </PaginationButton>
        );
      })}

      {/* Next Button */}
      <Button
        variant="outline"
        size="icon"
        className="w-10 h-10 bg-white border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleNext}
        disabled={currentPage === totalPages}
        aria-label="Go to next page"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </nav>
  );
};

// Demo Component
const PaginationDemo: React.FC = () => {
  const [state, setState] = useState<PaginationDemoState>({
    currentPage: 1,
    totalPages: 20
  });

  const handleCurrentPageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = parseInt(e.target.value) || 1;
    setState(prev => ({
      ...prev,
      currentPage: Math.max(1, Math.min(prev.totalPages, value))
    }));
  };

  const handleTotalPagesChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newTotal = parseInt(e.target.value) || 1;
    setState(prev => ({
      currentPage: prev.currentPage > newTotal ? newTotal : prev.currentPage,
      totalPages: newTotal
    }));
  };

  const handlePageChange = (page: number): void => {
    setState(prev => ({ ...prev, currentPage: page }));
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Advanced Pagination Component</h1>
          <p className="text-slate-600">Built with React TypeScript & Tailwind CSS</p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-semibold mb-4 text-slate-900">Demo Controls</h2>
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <label htmlFor="current-page" className="text-sm font-medium text-slate-700">
                Current Page:
              </label>
              <input
                id="current-page"
                type="number"
                min="1"
                max={state.totalPages}
                value={state.currentPage}
                onChange={handleCurrentPageChange}
                className="w-20 px-3 py-1 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="total-pages" className="text-sm font-medium text-slate-700">
                Total Pages:
              </label>
              <input
                id="total-pages"
                type="number"
                min="1"
                max="100"
                value={state.totalPages}
                onChange={handleTotalPagesChange}
                className="w-20 px-3 py-1 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Current Status */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div className="text-center">
            <p className="text-lg text-slate-900">
              <span className="font-semibold">Page {state.currentPage}</span> of{' '}
              <span className="font-semibold">{state.totalPages}</span>
            </p>
            <p className="text-sm text-slate-600 mt-1">
              Showing items {((state.currentPage - 1) * 10) + 1} - {Math.min(state.currentPage * 10, state.totalPages * 10)} of {state.totalPages * 10}
            </p>
          </div>
        </div>

        {/* Pagination Component */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8">
          <div className="flex justify-center">
            <CustomPagination
              currentPage={state.currentPage}
              totalPages={state.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default CustomPagination;