'use client'

import { ReactNode } from 'react'

interface AlertProps {
  type?: 'info' | 'warning' | 'success' | 'tip'
  children: ReactNode
  className?: string
  title?: string
}

export default function Alert({ 
  type = 'info', 
  children, 
  className = "",
  title 
}: AlertProps) {
  const getStyles = () => {
    switch (type) {
      case 'warning':
        return {
          container: 'bg-yellow-50 border-yellow-200 border-l-yellow-500',
          icon: '⚠️',
          titleColor: 'text-yellow-800',
          textColor: 'text-yellow-700'
        }
      case 'success':
        return {
          container: 'bg-green-50 border-green-200 border-l-green-500',
          icon: '✅',
          titleColor: 'text-green-800',
          textColor: 'text-green-700'
        }
      case 'tip':
        return {
          container: 'bg-purple-50 border-purple-200 border-l-purple-500',
          icon: '💡',
          titleColor: 'text-purple-800',
          textColor: 'text-purple-700'
        }
      case 'info':
      default:
        return {
          container: 'bg-blue-50 border-blue-200 border-l-blue-500',
          icon: 'ℹ️',
          titleColor: 'text-blue-800',
          textColor: 'text-blue-700'
        }
    }
  }

  const styles = getStyles()

  return (
    <div className={`border border-l-4 p-4 rounded-lg my-4 ${styles.container} ${className}`}>
      <div className="flex items-start gap-3">
        <span className="text-lg mt-0.5">{styles.icon}</span>
        <div className="flex-1">
          {title && (
            <h4 className={`font-semibold mb-1 ${styles.titleColor}`}>
              {title}
            </h4>
          )}
          <div className={`${styles.textColor} [&>p]:mb-2 [&>p:last-child]:mb-0 [&>strong]:font-semibold [&>strong]:text-gray-900`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}