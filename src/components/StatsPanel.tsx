import { motion } from 'framer-motion';

interface Stats {
  total: number;
  completed: number;
  active: number;
  completionRate: number;
}

interface StatsPanelProps {
  stats: Stats;
}

export default function StatsPanel({ stats }: StatsPanelProps) {
  const statCards = [
    {
      title: 'Total Tasks',
      value: stats.total,
      icon: '📋',
      color: 'bg-blue-500',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      darkBgColor: 'dark:bg-blue-900/20',
    },
    {
      title: 'Completed',
      value: stats.completed,
      icon: '✅',
      color: 'bg-green-500',
      textColor: 'text-green-600',
      bgColor: 'bg-green-50',
      darkBgColor: 'dark:bg-green-900/20',
    },
    {
      title: 'Active',
      value: stats.active,
      icon: '⏳',
      color: 'bg-orange-500',
      textColor: 'text-orange-600',
      bgColor: 'bg-orange-50',
      darkBgColor: 'dark:bg-orange-900/20',
    },
    {
      title: 'Completion Rate',
      value: `${stats.completionRate}%`,
      icon: '📊',
      color: 'bg-purple-500',
      textColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
      darkBgColor: 'dark:bg-purple-900/20',
    },
  ];

  return (
    <div className="mb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {statCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative overflow-hidden rounded-xl p-6 ${card.bgColor} ${card.darkBgColor} border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300`}
          >
            {/* Background decoration */}
            <div className={`absolute top-0 right-0 w-20 h-20 ${card.color} opacity-10 rounded-full -translate-y-10 translate-x-10`} />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {card.title}
                  </p>
                  <p className={`text-2xl font-bold ${card.textColor} dark:text-white`}>
                    {card.value}
                  </p>
                </div>
                <div className="text-3xl">
                  {card.icon}
                </div>
              </div>
              
              {/* Progress indicator for completion rate */}
              {card.title === 'Completion Rate' && (
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                    <span>Progress</span>
                    <span>{stats.completionRate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <motion.div
                      className={`${card.color} h-2 rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${stats.completionRate}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
