import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import InputLabel from '@mui/material/InputLabel';
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import TextAreaInput from "@/Components/TextAreaInput";
import SelectInput from "@/Components/SelectInput";
import { Link } from "@inertiajs/react";

export default function Create({auth, projects, users})
{
    const {data, setData, post, errors, reset} = useForm({
        image: '',
        name: '',
        status: '',
        description: '',
        due_date: ''
    })

    const onSubmit = (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append("image", data.image);
        formData.append("name", data.name);
        formData.append("status", data.status);
        formData.append("description", data.description);
        formData.append("due_date", data.due_date);
    
        post(route("task.store"), {
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data",
            },
            forceFormData: true, // Ensures Inertia sends the request as FormData
        });
    };
    

    return(
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center ">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Create New Task
                    </h2>
                </div>
            }
        >
            <Head title="Tasks" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <form onSubmit={onSubmit}
                            className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">

                            <div>
                                <InputLabel 
                                    htmlFor="task_project_id"
                                    style={{ color: "white" }} 
                                >
                                    Project
                                </InputLabel>

                                <SelectInput
                                    id="task_project_id"
                                    name="project_id"
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData("project_id", e.target.value)} >
                                        <option value="">Select Project</option>
                                        {projects.data.map(project => (
                                            <option value={project.id} key={project.id}>{project.name}</option>
                                        ))}
                                </SelectInput>

                                <InputError message={errors.project_id} className="mt-2" />
                            </div>
                            
                            <div className="mt-4">
                                <InputLabel 
                                    htmlFor="task_image_path"
                                    style={{ color: "white" }} 
                                >
                                    Task Image
                                </InputLabel>

                                <TextInput 
                                    id="task_image_path"
                                    type="file"
                                    name="image"
                                    className="mt-1 block w-full"
                                    onChange={e => setData('image', e.target.files[0])} />

                                <InputError message={errors.image} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <InputLabel 
                                    htmlFor="task_name"
                                    style={{ color: "white" }} 
                                >
                                    Task Name
                                </InputLabel>

                                <TextInput 
                                    id="task_name"
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={(e) => setData("name", e.target.value)} />

                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <InputLabel 
                                    htmlFor="task_description"
                                    style={{ color: "white" }} 
                                >
                                    Task Description
                                </InputLabel>

                                <TextAreaInput
                                    id="task_description"
                                    type="text"
                                    name="description"
                                    value={data.description}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData("description", e.target.value)} />

                                <InputError message={errors.description} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <InputLabel 
                                    htmlFor="task_due_date"
                                    style={{ color: "white" }} 
                                >
                                    Task Deadline
                                </InputLabel>

                                <input
                                    id="task_due_date"
                                    type="date"
                                    name="due_date"
                                    value={data.due_date}
                                    className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-indigo-600 dark:focus:ring-indigo-600 mt-1 block w-full"
                                    onChange={(e) => setData("due_date", e.target.value)}
                                />

                                <InputError message={errors.due_date} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <InputLabel 
                                    htmlFor="task_status"
                                    style={{ color: "white" }} 
                                >
                                    Task Status
                                </InputLabel>

                                <SelectInput
                                    id="task_status"
                                    name="status"
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData("status", e.target.value)} >
                                        <option value="">Select Status</option>
                                        <option value="pending">Pending</option>
                                        <option value="in_progress">In Progress</option>
                                        <option value="completed">Completed</option>
                                </SelectInput>

                                <InputError message={errors.status} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <InputLabel 
                                    htmlFor="task_priority"
                                    style={{ color: "white" }} 
                                >
                                    Task Priority
                                </InputLabel>

                                <SelectInput
                                    id="task_priority"
                                    name="priority"
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData("priority", e.target.value)} >
                                        <option value="">Select Priority</option>
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                </SelectInput>

                                <InputError message={errors.priority} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <InputLabel 
                                    htmlFor="task_assigned_user"
                                    style={{ color: "white" }} 
                                >
                                    Assigned User
                                </InputLabel>

                                <SelectInput
                                    id="task_assigned_user"
                                    name="assigned_user_id"
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData("assigned_user_id", e.target.value)} >
                                        <option value="">Select User</option>
                                        {users.data.map(user => (
                                            <option value={user.id} key={user.id}>{user.name}</option>
                                        ))}
                                </SelectInput>

                                <InputError message={errors.assigned_user_id} className="mt-2" />
                            </div>
                            
                            <div className="mt-4 text-right">
                                <Link href={route('task.index')} className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2 ">
                                    Cancel
                                </Link>
                                <button className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600 ">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>    
            </div>
        </AuthenticatedLayout>
    )
}