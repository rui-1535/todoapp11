import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { motion } from 'framer-motion';

interface TaskCardProps {
  task: {
    id: number;
    title: string;
    description: string;
    status: 'not_started' | 'in_progress' | 'completed';
    labels: string[];
  };
  index: number;
  labels: Array<{ name: string; color: string }>;
  isDragging: boolean;
  onDelete: (taskId: number) => void;
  onStatusChange: (taskId: number, newStatus: 'not_started' | 'in_progress' | 'completed') => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ 
  task, 
  index, 
  labels, 
  isDragging, 
  onDelete,
  onStatusChange 
}) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(task.id);
  };

  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`p-4 mb-2 rounded-lg relative ${
              snapshot.isDragging ? 'animate-shake' : ''
            } ${
              isDragging ? 'opacity-50' : ''
            }`}
            style={{
              backgroundColor: snapshot.isDragging ? '#E5E7EB' : '#F3F4F6',
            }}
          >
            <button
              onClick={handleDelete}
              className="absolute top-2 right-2 p-1 rounded-full hover:bg-red-100 transition-colors"
              aria-label="タスクを削除"
            >
              <svg
                className="w-4 h-4 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h3 className="font-medium pr-8">{task.title}</h3>
            <p className="text-sm opacity-75 mt-1">{task.description}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {task.labels.map(label => (
                <span
                  key={label}
                  className="px-2 py-1 text-xs rounded-full"
                  style={{
                    backgroundColor: labels.find(l => l.name === label)?.color || '#E5E7EB'
                  }}
                >
                  {label}
                </span>
              ))}
            </div>
            {snapshot.isDragging && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute top-0 right-0 mt-2 mr-2 text-green-500"
              >
                ✓
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard; 