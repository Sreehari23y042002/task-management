import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import axiosInstance from '../utils/axiosInstance';
import { useTranslation } from 'react-i18next';
import { Button } from '../components/ui/button';

const AssignedTasks = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [commentText, setCommentText] = useState<string>('');
  const [taskIdToUpdate, setTaskIdToUpdate] = useState<string | null>(null);
  const { t }: { t: (key: keyof typeof import('../locales/en/translation.json')) => string } = useTranslation();

  const validStatuses = ['Not-Started', 'In Progress', 'Completed', 'Query'];

  // Fetch tasks on component mount
  useEffect(() => {
    const fetchTasks = async () => {

      try {
        setLoading(true);
        const response = await axiosInstance.get('/api/tasks/employee', {
        })
        setTasks(response.data);
      } catch (err) {
        setError('Error fetching tasks');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Handle status update
  const handleStatusChange = async (taskId: string) => {
    if (!validStatuses.includes(status)) {
      setError('Invalid status');
      return;
    }

    try {
      await axiosInstance.patch(`/api/tasks/${taskId}`,
        {
          status,
          commentText,
          userId: localStorage.getItem('username'),
        }
      );
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId
            ? { ...task, status: status, comments: [...task.comments, { commentText, commentBy: { name: 'You' } }] }
            : task
        )
      );
      setStatus('');
      setCommentText('');
      setTaskIdToUpdate(null);
    } catch (err) {
      setError('Error updating task');
      console.error(err);
    }
  };

  // Handle comment change
  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(e.target.value);
  };

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-center text-red-500 py-4">{error}</div>;

  return (

    <div className=" mx-auto ">
      {tasks.length === 0 ? (
        <p className="text-center text-xl font-semibold">{t('no_task_assigned')}</p>
      ) : (
        <div>

          {tasks.map((task) => (

            <div key={task._id} className="dark:bg-black p-6 mb-4 rounded-lg shadow-md">
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>{t('title')}: {task.title}</CardTitle>
                  <CardDescription>{t('description')}: {task.description}</CardDescription>
                  <CardDescription>{t('status')}: {task.status}</CardDescription>
                  <CardDescription>{t('assigned_by')}: {task.assignedBy}</CardDescription>

                </CardHeader>
                <CardContent>
                  {taskIdToUpdate === task._id ? (
                    <div className="mt-4">
                      <div className="mb-4">
                        <label className="block text-sm font-semibold">{t('status')}</label>
                        <select
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                          className="w-full mt-1 p-2 border rounded-md dark:bg-black"
                        >
                          {validStatuses.map((statusOption) => (
                            <option key={statusOption} value={statusOption}>
                              {statusOption}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-semibold">{t('comments')}</label>
                        <textarea
                          value={commentText}
                          onChange={handleCommentChange}
                          placeholder="Add a comment"
                          className="w-full mt-1 p-2 border rounded-md dark:bg-black"
                        />
                      </div>
                      <Button type="submit" className="shadow-xl text-sm w-32 font-semibold rounded-md text-white focus:outline-none float-right" onClick={() => handleStatusChange(task._id)}>{t('update_task')}</Button>

                    </div>
                  ) : (
                    <Button type="submit" className="shadow-xl text-sm w-1/4 font-semibold rounded-md text-white focus:outline-none float-right" onClick={() => setTaskIdToUpdate(task._id)}>{t('update_task_status')}</Button>
                  )}

                  <div className="mt-4 max-h-[200px] overflow-y-auto">
                    <h4 className="text-lg font-semibold text-gray-800">{t('comments')}:</h4>
                    {task.comments.length > 0 ? (
                      task.comments.map((comment: any, index: number) => (
                        <div key={index} className="bg-gray-100 dark:bg-black dark:border-white p-3 mt-2 rounded-md">
                          <p className="font-semibold text-gray-700">
                            {/* Ensure commentBy is a valid string */}
                            {comment?.commentBy && typeof comment.commentBy === 'object' ? comment.commentBy.name : comment?.commentBy || 'Unknown'}:
                          </p>
                          {/* Ensure commentText is a valid string */}
                          <p className="text-gray-600">{comment?.commentText || ''}</p>
                        </div>
                      ))
                    ) : (
                      <p>No comments available</p>
                    )}

                  </div>
                </CardContent>
              </Card>
            </div>

          ))}

        </div>
      )}
    </div>
  );
};

export default AssignedTasks;
