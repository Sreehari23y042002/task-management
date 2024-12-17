import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axiosInstance from '../utils/axiosInstance';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { Button } from '../components/ui/button';
import { useTranslation } from 'react-i18next';

type FormData = {
  title: string;
  description: string;
  assignedTo: string;
};

function CreateTask() {
  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<FormData>();
  const [employees, setEmployees] = useState<any[]>([]);
  const { t }: { t: (key: keyof typeof import('../locales/en/translation.json')) => string } = useTranslation();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axiosInstance.get('/api/emails');
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employee emails:', error);
      }
    };

    fetchEmployees();
  }, []);

  const handleFormSubmit = async (data: FormData) => {
    try {
      const response = await axiosInstance.post('/api/tasks', {
        title: data.title,
        description: data.description,
        assignedTo: data.assignedTo,
        assignedBy: localStorage.getItem('username')
      });
      toast.success("Task Created Successfully", {
        autoClose: 3000,
        style: {
          backgroundColor: "#fff",
          color: "#004164",
          fontSize: "12px",
        },
      });
      reset();

    } catch (error) {
      console.error('Error creating task', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl mb-4">{t('create_task')}</h2>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="mb-4">
          <label className="block text-sm font-medium">{t('title')}</label>
          <input
            type="text"
            {...register('title', {
              required: t('title_required'),
              maxLength: { value: 100, message: 'Title cannot exceed 100 characters' }
            })}
            className={`w-full px-4 py-2 border rounded dark:bg-black ${errors.title ? 'border-red-500' : ''}`}
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">{t('description')}</label>
          <textarea
            {...register('description', {
              required: t('description_required'),
              maxLength: { value: 300, message: 'Description cannot exceed 300 characters' }
            })}
            className={`w-full px-4 py-2 border rounded dark:bg-black ${errors.description ? 'border-red-500' : ''}`}
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">{t('assignt_to')}</label>
          <select
            {...register('assignedTo', { required: t('select_employee_required') })}
            className={`w-full px-4 py-2 border rounded dark:bg-black ${errors.assignedTo ? 'border-red-500' : ''}`}
          >
            <option value="">{t('select_employee')}</option>
            {employees?.map((employee: any) => (
              <option key={employee.email} value={employee.email}>
                {employee.email}
              </option>
            ))}
          </select>
          {errors.assignedTo && <p className="text-red-500 text-sm">{errors.assignedTo.message}</p>}
        </div>

        <Button type="submit" className="shadow-xl text-sm font-semibold rounded-md text-white focus:outline-none float-right">{t('create_task')}</Button>
      </form>
    </div>
  );
}

export default CreateTask;
