import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import InputLabel from '@mui/material/InputLabel';
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import TextAreaInput from "@/Components/TextAreaInput";
import SelectInput from "@/Components/SelectInput";
import { Link } from "@inertiajs/react";

export default function Create({auth})
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
    
        post(route("project.store"), {
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
                        Create New Project
                    </h2>
                </div>
            }
        >
            <Head title="Projects" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <form onSubmit={onSubmit}
                            className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                            <div>
                                <InputLabel 
                                    htmlFor="project_image_path"
                                    style={{ color: "white" }} 
                                >
                                    Project Image
                                </InputLabel>

                                <TextInput 
                                    id="project_image_path"
                                    type="file"
                                    name="image"
                                    className="mt-1 block w-full"
                                    onChange={e => setData('image', e.target.files[0])} />

                                <InputError message={errors.image} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <InputLabel 
                                    htmlFor="project_name"
                                    style={{ color: "white" }} 
                                >
                                    Project Name
                                </InputLabel>

                                <TextInput 
                                    id="project_name"
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
                                    htmlFor="project_description"
                                    style={{ color: "white" }} 
                                >
                                    Project Description
                                </InputLabel>

                                <TextAreaInput
                                    id="project_description"
                                    type="text"
                                    name="description"
                                    value={data.description}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData("description", e.target.value)} />

                                <InputError message={errors.description} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <InputLabel 
                                    htmlFor="project_due_date"
                                    style={{ color: "white" }} 
                                >
                                    Project Deadline
                                </InputLabel>

                                <input
                                    id="project_due_date"
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
                                    htmlFor="project_status"
                                    style={{ color: "white" }} 
                                >
                                    Project Status
                                </InputLabel>

                                <SelectInput
                                    id="project_status"
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

                            <div className="mt-4 text-right">
                                <Link href={route('project.index')} className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2 ">
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